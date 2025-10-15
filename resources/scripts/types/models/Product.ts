export interface ProductCategory {
    id: number;
    name: string;
    updatedAt: Date;
    createdAt: Date;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    category: ProductCategory;
    stock: number;
    updatedAt: Date;
    createdAt: Date;
}
