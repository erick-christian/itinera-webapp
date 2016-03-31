<?php

use Crockett\CsvSeeder\CsvSeeder;

class tmsZoneSeeder extends CsvSeeder
{

    public function __construct()
    {
        $this->filename = base_path('database/seeds/csvfiles/csvTmsZones.csv');
        $this->table = 'tms_zones';
    }

    public function run()
    {
        // runs the seeder - alternatively, you could call $this->runSeeder(); for the same result
        parent::run();
    }
}
