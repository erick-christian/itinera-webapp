<?php
/*--------
 * TODO
 * + Encrypt password in Front-End and decrypt in Backend
 */

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Validator;
use App\admTranslation;

use App\Libraries\Translator;
use App\Libraries\Emissary;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class apiAccessLogin extends Controller
{
    protected $request;

    public function __construct(Request $request){
        $this->request = $request;
    }

    public function validateLogin(){
        global $accessGranted;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));
        $email      = $objApiData->{'email'};
        $password   = $objApiData->{'password'};

        $accessGranted = false;

        Emissary::prepareEnvelope();

        if(Auth::attempt([
            'email'    => $email,
            'password' => $password
        ])){
            $accessGranted = true;
            $apiMessage = Translator::translate(
                'Spanish',
                'apiAccessLogin',
                'AccessGranted',
                'AccessGranted');
        }
        else{
            $apiMessage = Translator::translate(
                'Spanish',
                'apiAccessLogin',
                'AccessNoGranted',
                'AccessNoGranted');
            $accessGranted = false;
        }

        Emissary::success($accessGranted);
        Emissary::addMessage('info-api',$apiMessage);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }
}
