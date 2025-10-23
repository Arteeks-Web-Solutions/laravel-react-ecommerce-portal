<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ecommerce Portal</title>

    @if (!env('VITE_DISABLED', false))
        @viteReactRefresh
        @vite('resources/scripts/index.tsx')
    @endif
</head>

<body class="antialiased">
    <div id="app"></div>
</body>

</html>
