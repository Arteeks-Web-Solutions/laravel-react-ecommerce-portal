<?php

namespace TechStore\Http\Controllers\Api\Client;

use Illuminate\Http\Request;
use TechStore\Http\Controllers\Controller;
use TechStore\Http\Resources\ProductCategoryResource;
use TechStore\Http\Resources\ProductIndexDataResource;
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
    public function index(Request $request): ProductIndexDataResource
    {
        return new ProductIndexDataResource([
            'categories' => ProductCategoryResource::collection($this->categoryRepository->all()),
            'products' => ProductResource::collection($this->productRepository->all()->load('category')),
            'cart_count' => $request->user() ? $this->cartRepository->count($request->user()->id) : null,
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
