<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Client;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Create 5 clients records for each admin. We then save this one-to-many relationship with saveMany() method
        Admin::factory(10)->create()->each(function (Admin $admin) {
            $admin->clients()->saveMany(Client::factory(5)->make());
        });
    }
}
