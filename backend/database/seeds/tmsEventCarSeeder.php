<?php

use Crockett\CsvSeeder\CsvSeeder;

class tmsEventCarSeeder extends CsvSeeder
{

    public function __construct()
    {
        $this->filename = base_path('database/seeds/csvfiles/csvTmsEventCars.csv');
        $this->table = 'tms_event_cars';
    }

    public function run()
    {
        // runs the seeder - alternatively, you could call $this->runSeeder(); for the same result
        parent::run();
    }
}
