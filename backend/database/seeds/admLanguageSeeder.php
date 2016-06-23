<?php

use Illuminate\Database\Seeder;
use App\admLanguage;

class admLanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Seeding adm_languages

        admLanguage::create([
            'name' => 'Spanish'
        ]);
        admLanguage::create([
            'name' => 'English'
        ]);
        admLanguage::create([
            'name' => 'Portuguese'
        ]);
        admLanguage::create([
            'name' => 'French'
        ]);
        admLanguage::create([
            'name' => 'Other'
        ]);

    }
}
