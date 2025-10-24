<?php

namespace TechStore\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use TechStore\Repositories\UserRepository;

class CreateUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:create
                            {--name= : Name of the user}
                            {--email= : Email address of the user}
                            {--password= : Password for the user}
                            {--is_admin : Set the user as admin}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new user in the system, optionally as admin';

    /**
     * CreateUserCommand constructor.
     */
    public function __construct(private UserRepository $userRepository)
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Ask for name/email/password if not provided
        $name = $this->option('name') ?? $this->ask('Enter the user\'s name');
        $email = $this->option('email') ?? $this->ask('Enter the user\'s email address');
        $password = $this->option('password') ?? $this->secret('Enter a password (leave blank for random)');
        $password = $password ?: Str::random(12);

        $isAdmin = $this->option('is_admin');
        if (!$isAdmin) {
            $isAdmin = $this->confirm('Should this user be an admin?', false);
        }

        // Validation
        $validator = Validator::make([
            'name' => $name,
            'email' => $email,
            'password' => $password
        ], [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8'
        ]);

        if ($validator->fails()) {
            $this->error('Error creating the user:');
            foreach ($validator->errors()->all() as $error) {
                $this->line("- " . $error);
            }
            return 1;
        }

        // Create the user
        $user = $this->userRepository->create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'is_admin' => $isAdmin,
        ]);

        $this->info("User successfully created!");
        $this->line("Name: $user->name");
        $this->line("Email: $user->email");
        $this->line("Password: $password");
        $this->line("Admin: " . ($isAdmin ? 'Yes' : 'No'));

        return 0;
    }
}
