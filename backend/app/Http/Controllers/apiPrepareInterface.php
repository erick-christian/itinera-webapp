<?php
/**
 * Created by PhpStorm.
 * User: ErickRosales
 * Date: 21/11/2015
 * Time: 06:02 PM
 */

namespace app\Http\Controllers;

use App\Http\Requests;

use App\admTranslation;
use App\admLanguage;

use App\Libraries\Translator;
use App\Libraries\Emissary;

use Illuminate\Http\Request;

class apiPrepareInterface
{
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function getInformation()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));
        $interface = $objApiData->{'interface'};

        $translations = admTranslation::
        where('interface' , $interface)
            ->get();

        $languages = admLanguage::all();

        Emissary::prepareEnvelope();
        $availableInfo = true;

        $apiMessage = Translator::translate(
            'Spanish' ,
            'apiAccessLogin' ,
            'InformationPrepared' ,
            'InformationPrepared');

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('translations' , $translations);
        Emissary::addData('languages' , $languages);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }
}