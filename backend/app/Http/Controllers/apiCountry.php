<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\admCountry;
use App\Libraries\Translator;
use App\Libraries\Emissary;

class apiCountry extends Controller
{

    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }


    public function validateCountry()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));
        $countryCode = $objApiData->{'countryCode'};

        $country = admcountry::find($countryCode);

        $whereClause = [
            'country_code' => $countryCode ,
            'is_active' => 'yes'
        ];

        $numCountries = admCountry::where($whereClause)->count();
        $country = admCountry::where($whereClause)->get();

        if ($numCountries > 0) {
            $availableInfo = true;
            $apiMessage = Translator::translate(
                'Spanish' ,
                'apiCountry' ,
                'CountryIsValid' ,
                'CountryIsValid');
        } else {
            $availableInfo = false;
            $apiMessage = Translator::translate(
                'Spanish' ,
                'apiCountry' ,
                'CountryIsNotValid' ,
                'CountryIsNotValid');
        }

        Emissary::prepareEnvelope();

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('country' , $country);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }

    public function listCountry()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));
        $start = $objApiData->{'start'};
        $page = $objApiData->{'page'};
        $limit = $objApiData->{'limit'};

        $numCountries = admCountry::where('is_active' , '=' , 'yes')->count();;
        $Countries = admCountry::where('is_active' , '=' , 'yes')->get();

        Emissary::prepareEnvelope();
        $availableInfo = true;

        $apiMessage = Translator::translate(
            'Spanish' ,
            'apiCountry' ,
            'InformationPrepared' ,
            'InformationPrepared');

        $objCountReg = new \stdClass();
        $objCountReg->total = $numCountries;

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('countries' , $Countries);
        Emissary::addData('numCountries' , $objCountReg);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }
}