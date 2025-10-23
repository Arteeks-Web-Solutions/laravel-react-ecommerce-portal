@component('mail::message')
# Hello {{ $order->shipping_name }}!

Your order **#{{ $order->id }}** has a new status:

@component('mail::panel')
**New Status:** {{ $order->status }}
@endcomponent

@if($order->items->count())
## Order Summary

@component('mail::table')
| Product       | Quantity | Price  |
| ------------- |:-------:| -----:|
@foreach ($order->items as $item)
| {{ $item->product_name }} | {{ $item->quantity }} | €{{ number_format($item->price, 2) }} |
@endforeach
| **Total** |  | €{{ number_format($order->items->sum(fn($i) => $i->price * $i->quantity), 2) }} |
@endcomponent
@endif

@component('mail::button', ['url' => url('/client/orders/'.$order->id)])
View Order
@endcomponent

Thank you for shopping with us,<br>
{{ config('app.name') }}
@endcomponent
