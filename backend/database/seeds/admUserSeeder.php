<?php

use Illuminate\Database\Seeder;
use App\admUser;

class admUserSeeder extends Seeder
{
    public function run()
    {
        //
        admUser::create([
            'username'         => 'erickroco',
            'name'             => 'Erick Christian',
            'last_name'        => 'Rosales Cruz',
            'address'          => 'Itzcuitli Mz. 5 Lt. 20',
            'neighborhood'     => 'Col. Bosques Ciudad Cuauhtemoc',
            'district'         => 'Ecatepec',
            'state_id'         => '2',
            'country_id'       => '1',
            'zip_code'         => '55067',
            'gender'           => 'Male',
            'telephone_desk'   => '59374363',
            'telephone_mobile' => '59374363',
            'birth_date'       => '23/09/1980',
            'register_date'    => '31/12/2015',
            'profile_id'       => '1',
            'photo_url'        => 'http://foto.jpg',
            'active'           => 1,
            'email'            => 'erick.rosales@outlook.com',
            'password'         => bcrypt('acceso')
        ]);
    }
}
