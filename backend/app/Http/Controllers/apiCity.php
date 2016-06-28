<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\admCity;
use App\Libraries\Translator;
use App\Libraries\Emissary;

class apiCity extends Controller
{

    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }


    public function validateCity()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));
        $countryCode = $objApiData->{'countryCode'};
        $stateCode = $objApiData->{'stateCode'};
        $cityCode = $objApiData->{'cityCode'};

        $whereClause = [
            'country_code' => $countryCode ,
            'state_code' => $stateCode ,
            'city_code' => $cityCode
        ];

        $whereClause = [
            'city_code' => $cityCode ,
            'is_active' => 'yes'
        ];

        $numCities = admCity::where($whereClause)->count();
        $city = admCity::where($whereClause)->get();

        if ($numCities > 0) {
            $availableInfo = true;
            $apiMessage = Translator::translate(
                'Spanish' ,
                'apiCity' ,
                'CityIsValid' ,
                'CityIsValid');
        } else {
            $availableInfo = false;
            $apiMessage = Translator::translate(
                'Spanish' ,
                'apiCity' ,
                'CityIsNotValid' ,
                'CityIsNotValid');
        }

        Emissary::prepareEnvelope();

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('city' , $city);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }

    public function listCity()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));
        $start = $objApiData->{'start'};
        $page = $objApiData->{'page'};
        $limit = $objApiData->{'limit'};

        $objApiData = json_decode($this->request->input('apiData'));
        $countryCode = $objApiData->{'countryCode'};
        $stateCode = $objApiData->{'stateCode'};

        $whereClause = [
            'country_code' => $countryCode ,
            'state_code' => $stateCode ,
        ];

        $numCities = admCity::where($whereClause)->count();;
        $Cities = admCity::where($whereClause)->get();

        Emissary::prepareEnvelope();
        $availableInfo = true;

        $apiMessage = Translator::translate(
            'Spanish' ,
            'apiCity' ,
            'InformationPrepared' ,
            'InformationPrepared');

        $objCountReg = new \stdClass();
        $objCountReg->total = $numCities;

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('cities' , $Cities);
        Emissary::addData('numCities' , $objCountReg);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }
}