<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\admState;
use App\Libraries\Translator;
use App\Libraries\Emissary;

class apiState extends Controller
{

    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }


    public function validateState()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));
        $countryCode = $objApiData->{'countryCode'};
        $stateCode = $objApiData->{'stateCode'};

        $state = admstate::find($stateCode);

        $whereClause = [
            'country_code' => $countryCode ,
            'state_code' => $stateCode ,
            'is_active' => 'yes'
        ];

        $numStates = admState::where($whereClause)->count();
        $state = admState::where($whereClause)->get();

        if ($numStates > 0) {
            $availableInfo = true;
            $apiMessage = Translator::translate(
                'Spanish' ,
                'apiState' ,
                'StateIsValid' ,
                'StateIsValid');
        } else {
            $availableInfo = false;
            $apiMessage = Translator::translate(
                'Spanish' ,
                'apiState' ,
                'StateIsNotValid' ,
                'StateIsNotValid');
        }

        Emissary::prepareEnvelope();

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('state' , $state);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }

    public function listState()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));
        $start = $objApiData->{'start'};
        $page = $objApiData->{'page'};
        $limit = $objApiData->{'limit'};

        $objApiData = json_decode($this->request->input('apiData'));
        $countryCode = $objApiData->{'countryCode'};

        $whereClause = [
            'country_code' => $countryCode ,
        ];

        $numStates = admState::where($whereClause)->count();;
        $States = admState::where($whereClause)->get();

        Emissary::prepareEnvelope();
        $availableInfo = true;

        $apiMessage = Translator::translate(
            'Spanish' ,
            'apiState' ,
            'InformationPrepared' ,
            'InformationPrepared');

        $objCountReg = new \stdClass();
        $objCountReg->total = $numStates;

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('states' , $States);
        Emissary::addData('numStates' , $objCountReg);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }
}