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
use App\admCompany;
use App\admUser;
use App\admProfile;
use App\admSystem;

use App\Libraries\Translator;
use App\Libraries\Emissary;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class apiAccessLogin extends Controller
{
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function validateLogin()
    {
        global $accessGranted;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));
        $email = $objApiData->{'email'};
        $password = $objApiData->{'password'};

        $accessGranted = false;

        Emissary::prepareEnvelope();

        if (Auth::attempt([
            'email' => $email ,
            'password' => $password
        ])
        ) {
            $accessGranted = true;
            $apiMessage = Translator::translate(
                'Spanish' ,
                'apiAccessLogin' ,
                'AccessGranted' ,
                'AccessGranted');
        } else {
            $apiMessage = Translator::translate(
                'Spanish' ,
                'apiAccessLogin' ,
                'AccessNoGranted' ,
                'AccessNoGranted');
            $accessGranted = false;
        }

        // ECRC: Creating the User information
        $admCompany = admCompany::where('is_active' , 'yes')->first();
        $admSystem = admSystem::where('is_active' , 'yes')->first();
        $admUser = admUser::where('email' , $email)->first();
        $admProfile = admProfile::where('profile_code' , $admUser->profile_code)->first();

        $sessionData = new \stdClass();
        $sessionData->company_code = $admCompany->company_code;
        $sessionData->company_name = $admCompany->commercial_name;
        $sessionData->user_id = $admUser->id;
        $sessionData->user_name = $admUser->name . ' ' . $admUser->last_name;
        $sessionData->user_email = $admUser->email;
        $sessionData->user_profile = $admProfile->profile_description;
        $sessionData->profile_code = $admProfile->profile_code;
        $sessionData->system_code = $admSystem->system_code;
        $sessionData->system_name = $admSystem->system_name;
        $sessionData->system_version = $admSystem->version;

        Emissary::success($accessGranted);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('sessionData' , $sessionData);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }
}
