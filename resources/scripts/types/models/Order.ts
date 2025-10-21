export interface Order {
    id: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    items: OrderItem[];
    // ISO 8601 formatted date string
    createdAt: string;
}

export interface OrderItem {
    productId: number;
    name: string;
    image: string;
    quantity: number;
    price: number;
}
