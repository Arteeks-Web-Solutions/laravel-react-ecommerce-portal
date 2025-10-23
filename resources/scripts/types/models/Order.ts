export interface Order {
    id: number;
    email: string;
    items: OrderItem[];
    shippingName: string;
    shippingLine1: string;
    shippingCity: string;
    shippingPostal: string;
    shippingCountry: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    // ISO 8601 formatted date string
    createdAt: string;
}

export interface OrderItem {
    productId: number;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
}
