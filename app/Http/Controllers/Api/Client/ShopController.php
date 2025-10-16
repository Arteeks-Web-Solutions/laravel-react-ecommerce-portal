<?php

namespace TechStore\Http\Controllers\Api\Client;

use Illuminate\Http\Request;
use TechStore\Http\Controllers\Controller;
use TechStore\Http\Requests\Api\Client\UpdateCardRequest;
use TechStore\Http\Resources\CartDataResource;
use TechStore\Http\Resources\CartResource;
use TechStore\Http\Resources\ProductCategoryResource;
use TechStore\Http\Resources\ProductDataResource;
use TechStore\Http\Resources\ProductResource;
use TechStore\Models\Product;
use TechStore\Repositories\CartRepository;
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
        private CartRepository $cartRepository
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
}
