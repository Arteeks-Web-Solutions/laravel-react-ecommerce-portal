import updateOrder from '@/api/admin/orders/updateOrder';
import { AddHttpError } from '@/api/http';
import Button from '@/components/elements/Button';
import { Select } from '@/components/elements/Input';
import Modal from '@/components/elements/Modal';
import type { Order, OrderItem } from '@/types/models';
import { useEffect, useState } from 'react';

interface ViewOrderModalProps {
    order: Order | null;
    onClose: () => void;
    mutate: () => void;
}

export default function OrderModal({ order, onClose, mutate }: ViewOrderModalProps) {
    const [status, setStatus] = useState(order?.status ?? '');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);

        updateOrder(order!.id, status)
            .then(() => {
                mutate();
                onClose();
            })
            .catch((error) => {
                console.error(error);
                AddHttpError(error);
            })
            .finally(() => {
                setIsSaving(false);
            });
    };

    useEffect(() => {
        if (order) {
            setStatus(order.status);
        }
    }, [order]);

    if (!order) return null;

    return (
        <Modal
            visible={!!order}
            dismissable={!isSaving}
            onDismiss={onClose}
            title={`Order #ORD-${order.id}`}
        >
            <div className='space-y-4'>
                <div className='flex justify-between text-sm text-gray-600'>
                    <span>Order Date:</span>
                    <span>
                        {new Date(order.createdAt).toLocaleDateString('en-EN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                </div>

                <div className='flex justify-between items-center text-sm text-gray-600'>
                    <span>Current Status:</span>
                    <Select
                        value={status}
                        disabled={isSaving}
                        options={[
                            { value: 'processing', label: 'Processing' },
                            { value: 'shipped', label: 'Shipped' },
                            { value: 'delivered', label: 'Delivered' },
                            { value: 'pending', label: 'Pending' },
                        ]}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </div>

                <div className='border-t border-gray-200 pt-3'>
                    <h4 className='font-semibold text-gray-900 mb-2'>Items</h4>
                    <ul className='divide-y divide-gray-200'>
                        {order.items.map((item: OrderItem, index: number) => (
                            <li key={index} className='py-2 flex justify-between text-sm'>
                                <div>
                                    <p className='font-medium text-gray-900'>{item.name}</p>
                                    <p className='text-gray-500'>
                                        Qty: {item.quantity} × €{item.price.toFixed(2)}
                                    </p>
                                </div>
                                <p className='font-semibold text-gray-900'>
                                    €{(item.price * item.quantity).toFixed(2)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='flex justify-between font-bold text-gray-900 pt-4 border-t border-gray-200'>
                    <span>Total:</span>
                    <span>
                        €
                        {order.items
                            .reduce(
                                (sum: number, item: OrderItem) => sum + item.price * item.quantity,
                                0,
                            )
                            .toFixed(2)}
                    </span>
                </div>

                <div className='flex justify-end gap-3 mt-6'>
                    <Button variant='secondary' disabled={isSaving} onClick={onClose}>
                        Close
                    </Button>
                    <Button onClick={handleSave} isLoading={isSaving}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
