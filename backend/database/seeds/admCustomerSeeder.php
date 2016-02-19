<?php

use Illuminate\Database\Seeder;
use App\admCustomer;

class admCustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        admCustomer::firstOrCreate([
            'short_name'    => 'TRESGUERRAS',
            'password'      => bcrypt('acceso'),
            'company'       => 'TRES GUERRAS TRANSPORTES SA DE CV',
            'tax_id'        => 'TGR908025R12',
            'address'       => 'Calle de las Guerras No. 25',
            'country'       => 'México',
            'estate'        => 'Estado de México',
            'location'      => 'Naucalpan',
            'region'        => 'Naucalpan',
            'city'          => 'Naucalpan',
            'zip_code'      => '55889',
            'phone'         => '45-89-89-325',
            'contact_name'  => 'Juan Camaney',
            'contact_phone' => '12345-6545',
            'email'         => 'juan.camaney@tresguerras.com',
            'website'       => 'http://tresguerras.com',
            'active'        => 'yes',
            'latitude'      => '13456',
            'longitude'     => '32146',
            'geocode_url'   => 'http://geocodeurl.html'
        ]);

        admCustomer::firstOrCreate([
            'short_name'    => 'UTILITYLAISER',
            'password'      => bcrypt('acceso'),
            'company'       => 'UTILITY TRAILSERS LAISER SA DE CV',
            'tax_id'        => 'UTL808956W23',
            'address'       => 'Cuautitlán No. 5',
            'country'       => 'México',
            'estate'        => 'Estado de México',
            'location'      => 'Cuautitlán',
            'region'        => 'Cuautitlán',
            'city'          => 'Cuautitlán',
            'zip_code'      => '55889',
            'phone'         => '45-89-89-325',
            'contact_name'  => 'Juan Pérez',
            'contact_phone' => '12345-6545',
            'email'         => 'juan.perez@utilitylaiser.com',
            'website'       => 'http://utilitylaiser.com',
            'active'        => 'yes',
            'latitude'      => '13456',
            'longitude'     => '32146',
            'geocode_url'   => 'http://geocodeurl.html'
        ]);

        admCustomer::firstOrCreate([
            'short_name'    => 'CASTORES',
            'password'      => bcrypt('acceso'),
            'company'       => 'CASTURES SA DE CV',
            'tax_id'        => 'CAS889955R12',
            'address'       => 'Presas Hidraulicas No. 25',
            'country'       => 'México',
            'estate'        => 'Estado de México',
            'location'      => 'Tlalneplantla',
            'region'        => 'Tlalneplantla',
            'city'          => 'Tlalneplantla',
            'zip_code'      => '55878',
            'phone'         => '45-89-89-325',
            'contact_name'  => 'Pedro López',
            'contact_phone' => '12345-6545',
            'email'         => 'pedro.lopez@castores.com',
            'website'       => 'http://castores.com',
            'active'        => 'yes',
            'latitude'      => '13456',
            'longitude'     => '32146',
            'geocode_url'   => 'http://geocodeurl.html'
        ]);

    }
}
