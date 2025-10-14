<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class RecaptchaService
{
    /**
     * Verify the reCAPTCHA token with Google's API.
     *
     * @param string $token
     * @return bool
     */
    public function verify(string $token): bool
    {
        $secret = config('services.recaptcha.secret');

        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => $secret,
            'response' => $token,
        ]);

        return $response->json('success') === true;
    }
}
