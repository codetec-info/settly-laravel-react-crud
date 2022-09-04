<?php

namespace App\Console\Commands;

use App\Models\Client;
use Illuminate\Console\Command;
use Mail;

class WeeklyEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'weekly:email';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a weekly email to all the clients';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $clients = Client::with('admin')->get();

        foreach ($clients as $client)
        {
            Mail::raw("This is am automatically generated Weekly Email", function($message) use ($client)
            {
                $message->from($client->admin->email);
                $message->to($client->email)->subject('Weekly Email');
            });
        }
        $this->info('Weekly Email has been send successfully');
    }
}
