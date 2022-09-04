<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Rules\ReCaptcha;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:admins'],
                'password' => ['required', 'string', 'min:4', 'confirmed', Password::min(6)->letters()],
                'recaptcha_token' => [new ReCaptcha],
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'fix errors', 'errors' => $validator->errors()], 500);
        }

        $admin = Admin::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
        ]);

        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials, $request->filled('remember'))) {
            $request->session()->regenerate();
            return response()->json(['status' => true, 'admin' => auth()->user()]);
        }

        return response()->json(['status' => true, 'admin' => $admin]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
                'email' => 'required|string',
                'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'fix errors', 'errors' => $validator->errors()], 500);
        }

        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials, $request->filled('remember'))) {
            $request->session()->regenerate();
            return response()->json(['status' => true, 'admin' => auth()->user()]);
        }

        return response()->json(['status' => false, 'message' => 'Invalid username or password'], 500);
    }

    public function logout(Request $request)
    {
        auth('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['status' => true, 'message' => 'logged out']);
    }

    public function admin()
    {
        return response()->json(['status' => true, 'admin' => auth()->user()]);
    }
}
