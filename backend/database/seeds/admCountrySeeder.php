<?php

use Crockett\CsvSeeder\CsvSeeder;

class admCountrySeeder extends CsvSeeder
{

    public function __construct()
    {
        $this->filename = base_path('database/seeds/csvfiles/csvAdmCountries.csv');
        $this->table = 'adm_countries';
    }

    public function run()
    {
        parent::run();
    }
}