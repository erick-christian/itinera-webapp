<?php

use Crockett\CsvSeeder\CsvSeeder;

class tmsCarSeeder extends CsvSeeder
{
    public function __construct()
    {
        $this->console_logs = true;
        $this->write_logs = true;
        $this->filename = base_path('database/seeds/csvfiles/csvTmsCars.csv');
        $this->table = 'tms_cars';
    }

    public function run()
    {
        parent::run();
    }
}