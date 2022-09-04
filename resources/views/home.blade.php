<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel React') }}</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <style>
        body {
            font-family: 'Nunito', sans-serif;
        }

        .invalid-feedback {
            display: block !important;
        }
    </style>

    <!-- Styles -->
    <link href="{{mix('css/app.css')}}" type="text/css" rel="stylesheet"/>

    <script>
        window.RECAPTCHAV2_SITEKEY = @json(config('app.recaptchav2_sitekey'));
    </script>
</head>
<body class="antialiased">
<div id="app"></div>

<!-- Scripts -->
<script src="{{mix('js/app.js')}}" type="text/javascript"></script>
</body>
</html>