<?php
/**
 * Created by PhpStorm.
 * User: erickroco
 * Date: 11/03/16
 * Time: 11:00 PM
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\tmsUserCar;
use App\Libraries\Translator;
use App\Libraries\Emissary;

class apiUserCar extends Controller
{

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function listUserCar()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));
        $start = $objApiData->{'start'};
        $page = $objApiData->{'page'};
        $limit = $objApiData->{'limit'};

        $numCustomers = tmsUserCar::count();
        $users = tmsUserCar::all();

        Emissary::prepareEnvelope();
        $availableInfo = true;

        $apiMessage = Translator::translate(
            'Spanish' ,
            'apiAccessLogin' ,
            'InformationPrepared' ,
            'InformationPrepared');

        $objCountReg = new \stdClass();
        $objCountReg->total = $numCustomers;

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('userCars' , $users);
        Emissary::addData('numUserCars' , $objCountReg);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }


}