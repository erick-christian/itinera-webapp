<?php

use Crockett\CsvSeeder\CsvSeeder;

class tmsCarSeeder extends CsvSeeder
{

    public function __construct()
    {
        $this->filename = base_path('database/seeds/csvfiles/csvTmsCarMakers.csv');
        $this->table = 'tms_cars';
    }

    public function run()
    {
        // runs the seeder - alternatively, you could call $this->runSeeder(); for the same result
        parent::run();
    }
}
