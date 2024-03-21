<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
//        $adminRole = Role::create(['name' => 'admin','guard_name'=> 'web']);
        $userRole = Role::create(['name' => 'user','guard_name'=> 'web']);
        $adminRole = new Role();
        $adminRole->name = 'admin';
        $adminRole->guard_name = 'web';
        $adminRole->save();
    }
}
