<?php

use Crockett\CsvSeeder\CsvSeeder;

class tmsSectorSeeder extends CsvSeeder
{

    public function __construct()
    {
        $this->filename = base_path('database/seeds/csvfiles/csvTmsSectors.csv');
        $this->table = 'tms_sectors';
    }

    public function run()
    {
        // runs the seeder - alternatively, you could call $this->runSeeder(); for the same result
        parent::run();
    }
}