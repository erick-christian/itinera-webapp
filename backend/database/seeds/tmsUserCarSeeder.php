<?php

use Crockett\CsvSeeder\CsvSeeder;

class tmsUserCarSeeder extends CsvSeeder
{

    public function __construct()
    {
        $this->filename = base_path('database/seeds/csvfiles/csvTmsUserCars.csv');
        $this->table = 'tms_user_cars';
    }

    public function run()
    {
        // runs the seeder - alternatively, you could call $this->runSeeder(); for the same result
        parent::run();
    }
}
