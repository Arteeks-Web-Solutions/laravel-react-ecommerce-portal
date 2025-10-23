@component('mail::message')
# Hello {{ $order->shipping_name }}!

Thank you for shopping with us, we have received your order successfully. Your order ID is {{ $order->id }}.

## Order summary

@component('mail::table')
| Product       | Quantity | Price |
| ------------- |:-------:| -----:|
@foreach ($order->items as $item)
| {{ $item->product_name }} | {{ $item->quantity }} | €{{ number_format($item->price, 2) }} |
@endforeach
| **Total** |  | €{{ number_format($order->items->sum(fn($item) => $item->price * $item->quantity), 2) }} |
@endcomponent

We will notify you once your order is shipped.

@component('mail::button', ['url' => url('/client')])
View Orders
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
