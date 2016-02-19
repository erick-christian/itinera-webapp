<?php

use Illuminate\Database\Seeder;
use App\admCountry;
use App\Libraries\Wiser;

class admCountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Seeder Countries
        /*
        admCountry::create([
            'country_name' => 'México'
            ]
        );
        */

        $csvFile = base_path().'\database\seeds\csvfiles\temp_country.csv';
        $dataLoad = Wiser::loadCSVFile($csvFile);

        echo 'akio;';
        echo gettype($dataLoad);

        DB::table('adm_countries')->insert($dataLoad);

    }
}
