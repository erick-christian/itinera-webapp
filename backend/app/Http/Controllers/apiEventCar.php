<?php
/**
 * Created by PhpStorm.
 * User: erickroco
 * Date: 11/03/16
 * Time: 11:34 PM
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\tmsEventCar;
use App\Libraries\Translator;
use App\Libraries\Emissary;


class apiEventCar extends Controller
{

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function listEventCar()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));
        $start = $objApiData->{'start'};
        $page = $objApiData->{'page'};
        $limit = $objApiData->{'limit'};

        $numTmsEventCar = tmsEventCar::count();
        $tmsEventCar = tmsEventCar::all();

        Emissary::prepareEnvelope();
        $availableInfo = true;

        $apiMessage = Translator::translate(
            'Spanish' ,
            'apiCar' ,
            'InformationPrepared' ,
            'InformationPrepared');

        $objCountReg = new \stdClass();
        $objCountReg->total = $numTmsEventCar;

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('eventCars' , $tmsEventCar);
        Emissary::addData('numEventCars' , $objCountReg);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }
}