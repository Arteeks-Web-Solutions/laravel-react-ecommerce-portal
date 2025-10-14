<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\RecaptchaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    public function __construct(private RecaptchaService $recaptcha) {}

    /**
     * Handle a password reset link request.
     */
    public function sendResetLinkEmail(Request $request): JsonResponse
    {
        // Validate email and recaptcha
        $request->validate([
            'email' => 'required|email',
            'g-recaptcha-response' => 'required|string',
        ]);

        // Verify reCAPTCHA
        if (!$this->recaptcha->verify($request->input('g-recaptcha-response'))) {
            return response()->json([
                'message' => 'Recaptcha verification failed.'
            ], 422);
        }

        // Attempt to send the password reset link
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => __($status)]);
        }

        return response()->json(['message' => __($status)], 422);
    }
}
