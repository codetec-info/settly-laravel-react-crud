<?php

use Illuminate\Support\Facades\Route;

// This route load the React app in the home view
// Using expression to look for any route except routes that start with “/api”.
Route::get('/{path?}', function () {
    return view('home');
})->where('path', '^(?!api).*?');
