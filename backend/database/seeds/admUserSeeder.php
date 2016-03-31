<?php

use Crockett\CsvSeeder\CsvSeeder;

class admUserSeeder extends CsvSeeder
{


    public function __construct()
    {

        $this->filename = base_path('database/seeds/csvfiles/csvAdmUsers.csv');

        $this->table = 'adm_users';
        $this->hashable = 'password';
        $this->hashPassword();
    }

    public function hashPassword()
    {
        App\admUser::where('active' , 'true')
            ->update(['password' => bcrypt('acceso')]);
    }

    public function run()
    {
        // runs the seeder - alternatively, you could call $this->runSeeder(); for the same result
        parent::run();
        $this->hashPassword();
    }

}
