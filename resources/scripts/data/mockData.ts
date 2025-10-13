import type { Product, Order, User } from '@/types/models';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Electronics',
    stock: 15
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor',
    price: 199.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Electronics',
    stock: 23
  },
  {
    id: '3',
    name: 'Laptop Backpack',
    description: 'Durable backpack with padded laptop compartment',
    price: 79.99,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Accessories',
    stock: 42
  },
  {
    id: '4',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: 49.99,
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Electronics',
    stock: 67
  },
  {
    id: '5',
    name: 'USB-C Hub',
    description: 'Multi-port USB-C hub with HDMI and card reader',
    price: 59.99,
    image: 'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=400',
    category: 'Electronics',
    stock: 31
  },
  {
    id: '6',
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness',
    price: 39.99,
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Home',
    stock: 18
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2025-10-10',
    total: 349.98,
    status: 'delivered',
    items: [
      { productId: '1', productName: 'Premium Headphones', quantity: 1, price: 299.99 },
      { productId: '4', productName: 'Wireless Mouse', quantity: 1, price: 49.99 }
    ]
  },
  {
    id: 'ORD-002',
    date: '2025-10-12',
    total: 199.99,
    status: 'processing',
    items: [
      { productId: '2', productName: 'Smart Watch', quantity: 1, price: 199.99 }
    ]
  },
  {
    id: 'ORD-003',
    date: '2025-10-13',
    total: 139.98,
    status: 'pending',
    items: [
      { productId: '3', productName: 'Laptop Backpack', quantity: 1, price: 79.99 },
      { productId: '5', productName: 'USB-C Hub', quantity: 1, price: 59.99 }
    ]
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Jan de Vries',
  email: 'jan@example.com',
  role: 'customer'
};

export const mockAdminUser: User = {
  id: 'admin1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin'
};
