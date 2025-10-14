<?php

namespace TechStore\Http\Controllers\Auth;

use TechStore\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use TechStore\Services\RecaptchaService;
use TechStore\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users when the intended url fails.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(private RecaptchaService $recaptcha)
    {
        $this->middleware('guest')->except('logout');
        $this->middleware('auth')->only('logout');
    }

    /**
     * Validate the user login request.
     */
    protected function validateLogin(Request $request): void
    {
        // extemded validation to include recaptcha
        $request->validate([
            $this->username() => 'required|string',
            'password' => 'required|string',
            'g-recaptcha-response' => 'required|string',
        ]);
    }

    /**
     * Attempt to log the user into the application.
     */
    protected function attemptLogin(Request $request): bool|JsonResponse
    {
        if (!$this->recaptcha->verify($request->input('g-recaptcha-response'))) {
            return response()->json([
                'message' => 'Recaptcha verification failed.'
            ], 422);
        }

        // Proceed login after recaptcha success
        return $this->guard()->attempt(
            $this->credentials($request),
            $request->filled('remember')
        );
    }

    /**
     * The user has been authenticated.
     */
    protected function sendLoginResponse(Request $request): RedirectResponse|JsonResponse|UserResource
    {
        $request->session()->regenerate();

        $this->clearLoginAttempts($request);

        $user = $this->guard()->user();

        // If the request expects JSON, return the user data as JSON
        if ($request->expectsJson()) {
            return new UserResource($user);
        }

        return redirect()->intended($this->redirectPath());
    }
}
