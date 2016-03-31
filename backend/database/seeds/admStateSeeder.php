<?php

use Crockett\CsvSeeder\CsvSeeder;

class admStateSeeder extends CsvSeeder
{

    public function __construct()
    {
        $this->filename = base_path('database/seeds/csvfiles/csvAdmStates.csv');
        $this->table = 'adm_states';
    }

    public function run()
    {
        parent::run();
    }
}
