<?php

namespace TechStore\Repositories;

use TechStore\Models\ProductCategory;

class ProductCategoryRepository extends BaseRepository
{
    /**
     * ProductCategoryRepository constructor.
     *
     * @param ProductCategory $model
     */
    public function __construct(ProductCategory $model)
    {
        parent::__construct($model);
    }
}
