<?php

namespace TechStore\Http\Controllers\Api\Client;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use Symfony\Component\HttpKernel\Exception\HttpException;
use TechStore\Http\Controllers\Controller;
use TechStore\Http\Requests\Api\Client\CheckoutRequest;
use TechStore\Http\Requests\Api\Client\UpdateCardRequest;
use TechStore\Http\Resources\CartDataResource;
use TechStore\Http\Resources\CartResource;
use TechStore\Http\Resources\ProductCategoryResource;
use TechStore\Http\Resources\ProductDataResource;
use TechStore\Http\Resources\ProductResource;
use TechStore\Models\Product;
use TechStore\Repositories\CartRepository;
use TechStore\Repositories\OrderRepository;
use TechStore\Repositories\ProductCategoryRepository;
use TechStore\Repositories\ProductRepository;

class ShopController extends Controller
{
    /**
     * ShopController constructor.
     */
    public function __construct(
        private ProductCategoryRepository $categoryRepository,
        private ProductRepository $productRepository,
        private CartRepository $cartRepository,
        private OrderRepository $orderRepository,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): ProductDataResource
    {
        return new ProductDataResource([
            'categories' => ProductCategoryResource::collection($this->categoryRepository->all()),
            'products' => ProductResource::collection($this->productRepository->all()->load('category')),
            'cart_count' => $request->user() ? $this->cartRepository->count($request->user()->id) : null,
        ]);
    }

    /**
     * Return the users full cart.
     */
    public function getCart(Request $request): CartDataResource
    {
        return new CartDataResource([
            'cart' => $request->user() ? new CartResource($this->cartRepository->getCartItems($request->user()->id)) : null,
            'products' => ProductResource::collection($this->productRepository->all()->load('category')),
        ]);
    }

    /**
     * Add the specified product to the cart.
     */
    public function addToCart(Request $request, Product $product): void
    {
        $this->cartRepository->addToCart($request->user()->id, $product);

        return;
    }

    /**
     * Update or remove a product in the cart.
     */
    public function updateCart(UpdateCardRequest $request): void
    {
        $cart = $this->cartRepository->getCartItems($request->user()->id);
        if (!$cart) {
            return;
        }

        $items = $cart->items;
        foreach ($items as &$item) {
            if ($item['product_id'] === $request->input('product_id')) {
                $item['quantity'] = $request->input('quantity');
                break;
            }
        }

        $items = array_filter($items, fn($item) => $item['quantity'] >= 1);

        $cart->items = array_values($items);
        $cart->save();

        return;
    }

    /**
     * Merge local cart with the user's cart.
     */
    public function mergeCart(Request $request): void
    {
        $local_cart = $request->input('cart', []);

        foreach ($local_cart as $item) {
            $product = $this->productRepository->find($item['product_id']);
            if ($product) {
                for ($i = 0; $i < $item['quantity']; $i++) {
                    $this->cartRepository->addToCart($request->user()->id, $product);
                }
            }
        }

        return;
    }

    /**
     * Handle the checkout process.
     */
    public function checkout(CheckoutRequest $request): string
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $user = $request->user();
        if (!$user) throw new HttpException(419, 'Page expired, please log in again.');

        $cart = $this->cartRepository->getCartItems($request->user()->id);
        if (!$cart || empty($cart->items)) throw new HttpException(400, 'Your cart has expired, please refresh the page and try again.');

        $items = [];
        foreach ($cart->items as $item) {
            $product = $this->productRepository->find($item['product_id']);
            if ($product) {
                $items[] = [
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => ['name' => $product->name, 'images' => [$product->image ?? 'https://icons.veryicon.com/png/o/application/applet-1/product-17.png'], 'metadata' => ['product_id' => $product->id]],
                        'unit_amount' => (int) ($product->price * 100),
                    ],
                    'quantity' => $item['quantity'],
                ];
            }
        }

        $session = Session::create([
            'client_reference_id' => $user->id,
            'customer_email' => $request->input('email'),
            // options for payment methods can be expanded as needed
            'payment_method_types' => [
                'card',
                'ideal',
                'bancontact',
                'paypal',
                'sofort'
            ],
            'line_items' => $items,
            'metadata' => [
                'shipping_name' => $request->input('name'),
                'shipping_line1' => $request->input('street'),
                'shipping_city' => $request->input('city'),
                'shipping_postal' => $request->input('postal_code'),
                'shipping_country' => $request->input('country'),
            ],
            'mode' => 'payment',
            'success_url' => rtrim(config('app.url'), '/') . '/api/client/shop/checkout/success?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => rtrim(config('app.url'), '/') . '/shop/checkout/failed',
        ]);

        return $session->url;
    }

    /**
     * Handle successful checkout redirection.
     */
    public function checkoutSuccess(Request $request): RedirectResponse
    {
        $session_id = $request->query('session_id');
        if (!$session_id) {
            return redirect('/shop/checkout/failed');
        }

        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            $session = Session::retrieve($session_id);
            if ($session->payment_status !== 'paid') {
                return redirect('/shop/checkout/failed');
            }
        } catch (\Throwable) {
            return redirect('/shop/checkout/failed');
        }

        $stripe_items = Session::allLineItems($session_id, [
            'expand' => ['data.price.product'],
        ]);

        $items = [];
        foreach ($stripe_items->data as $item) {
            $product = $item->price->product;
            $items[] = [
                'product_id' => (int) $product->metadata->product_id,
                'name' => $product->name,
                'image' => $product->images[0] ?? null,
                'quantity' => $item->quantity,
                'price' => $item->amount_total / 100,
            ];
        }

        // save order and line items to database to prevent extra API calls later
        $order = $this->orderRepository->createFromStripeSession($session, $items);
        $this->cartRepository->clearCart($request->user()->id);

        return redirect('/shop/checkout/completed?order_id=' . $order->id);
    }
}
