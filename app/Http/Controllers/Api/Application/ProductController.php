<?php

namespace TechStore\Http\Controllers\Api\Application;

use Symfony\Component\HttpKernel\Exception\HttpException;
use TechStore\Http\Controllers\Controller;
use TechStore\Http\Requests\Api\Application\Products\StoreProductRequest;
use TechStore\Http\Requests\Api\Application\Products\StoreCategoryRequest;
use TechStore\Http\Resources\ProductCategoryResource;
use TechStore\Http\Resources\ProductIndexDataResource;
use TechStore\Http\Resources\ProductResource;
use TechStore\Models\Product;
use TechStore\Models\ProductCategory;
use TechStore\Repositories\ProductCategoryRepository;
use TechStore\Repositories\ProductRepository;

class ProductController extends Controller
{
    /**
     * ProductController constructor.
     */
    public function __construct(private ProductCategoryRepository $categoryRepository, private ProductRepository $productRepository) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): ProductIndexDataResource
    {
        return new ProductIndexDataResource([
            'categories' => ProductCategoryResource::collection($this->categoryRepository->all()),
            'products' => ProductResource::collection($this->productRepository->all()->load('category')),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeCategory(StoreCategoryRequest $request): ProductCategory
    {
        return $this->categoryRepository->create($request->validated());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeProduct(StoreProductRequest $request): Product
    {
        return $this->productRepository->create($request->validated());
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateProduct(Product $product, StoreProductRequest $request)
    {
        return $this->productRepository->update($product->id, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteProduct(Product $product): int
    {
        return $this->productRepository->delete($product->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyCategory(ProductCategory $category): int
    {
        if ($category->products->isNotEmpty()) throw new HttpException(400, 'There are active products using this category.');

        return $this->categoryRepository->delete($category->id);
    }
}
