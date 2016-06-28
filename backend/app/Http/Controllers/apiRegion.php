<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\admRegion;
use App\Libraries\Translator;
use App\Libraries\Emissary;

class apiRegion extends Controller
{

    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function validateRegion()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));
        $countryCode = $objApiData->{'countryCode'};
        $stateCode = $objApiData->{'stateCode'};
        $cityCode = $objApiData->{'cityCode'};
        $regionCode = $objApiData->{'regionCode'};

        $whereClause = [
            'country_code' => $countryCode ,
            'state_code' => $stateCode ,
            'city_code' => $cityCode ,
            'region_code' => $regionCode ,
            'is_active' => 'yes'
        ];

        $numRegions = admRegion::where($whereClause)->count();
        $region = admRegion::where($whereClause)->get();

        if ($numRegions > 0) {
            $availableInfo = true;
            $apiMessage = Translator::translate(
                'Spanish' ,
                'apiRegion' ,
                'RegionIsValid' ,
                'RegionIsValid');
        } else {
            $availableInfo = false;
            $apiMessage = Translator::translate(
                'Spanish' ,
                'apiRegion' ,
                'RegionIsNotValid' ,
                'RegionIsNotValid');
        }

        Emissary::prepareEnvelope();

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('region' , $region);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }

    public function listRegion()
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
        $cityCode = $objApiData->{'cityCode'};

        $whereClause = [
            'country_code' => $countryCode ,
            'state_code' => $stateCode ,
            'city_code' => $cityCode
        ];

        $numRegions = admRegion::where($whereClause)->count();
        $Regions = admRegion::where($whereClause)->get();

        Emissary::prepareEnvelope();
        $availableInfo = true;

        $apiMessage = Translator::translate(
            'Spanish' ,
            'apiRegion' ,
            'InformationPrepared' ,
            'InformationPrepared');

        $objCountReg = new \stdClass();
        $objCountReg->total = $numRegions;

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('regions' , $Regions);
        Emissary::addData('numRegions' , $objCountReg);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }
}