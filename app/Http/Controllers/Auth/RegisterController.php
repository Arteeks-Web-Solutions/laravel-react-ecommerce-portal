<?php

namespace TechStore\Http\Controllers\Auth;

use TechStore\Http\Controllers\Controller;
use TechStore\Http\Resources\UserResource;
use TechStore\Models\User;
use TechStore\Services\RecaptchaService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
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
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'g-recaptcha-response' => ['required', 'string'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \TechStore\Models\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    /**
     * Handle a registration request for the application.
     */
    public function register(Request $request): JsonResponse|RedirectResponse|UserResource
    {
        $data = $this->validator($request->all())->validate();

        if (!$this->recaptcha->verify($request->input('g-recaptcha-response'))) {
            return response()->json([
                'message' => 'Recaptcha verification failed.'
            ], 422);
        }

        $user = $this->create($data);

        event(new Registered($user));

        $this->guard()->login($user);

        // If the request expects JSON, return the user data as JSON
        if ($request->expectsJson()) {
            return new UserResource($user);
        }

        return redirect($this->redirectPath());
    }
}
