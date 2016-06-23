<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\admUser;
use App\Libraries\Translator;
use App\Libraries\Emissary;

class apiUser extends Controller
{

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function listUser()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));
        $start = $objApiData->{'start'};
        $page = $objApiData->{'page'};
        $limit = $objApiData->{'limit'};

        $numUsers = admUser::count();

        $users = admUser::all();

        Emissary::prepareEnvelope();
        $availableInfo = true;

        $apiMessage = Translator::translate(
            'Spanish' ,
            'apiUser' ,
            'InformationPrepared' ,
            'InformationPrepared');

        $objCountReg = new \stdClass();
        $objCountReg->total = $numUsers;

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('users' , $users);
        Emissary::addData('numUsers' , $objCountReg);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }

    public function showUser()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));
        $UserId = $objApiData->{'UserID'};

        $User = admUser::find($UserId);

        Emissary::prepareEnvelope();
        $availableInfo = true;

        $apiMessage = Translator::translate(
            'Spanish' ,
            'apiUser' ,
            'showUser' ,
            'showUser');

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('Users' , $User);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }

    public function storeUser()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));

        //$user = new admUser;
        $user = admUser::firstOrNew([
            'email' => $objApiData->{'tfEmail'}
        ]);

        $user->username = $objApiData->{'tfEmail'};
        $user->name = $objApiData->{'tfName'};
        $user->last_name = $objApiData->{'tfLastName'};
        $user->address = $objApiData->{'tfAddress'};
        $user->neighborhood = $objApiData->{'chActive'};
        $user->location = $objApiData->{'tfLocation'};
        $user->region = $objApiData->{'tfRegion'};
        $user->city = $objApiData->{'tfCity'};
        $user->state_code = $objApiData->{'tfStateCode'};
        $user->country_code = $objApiData->{'tfCountryCode'};
        $user->zip_code = $objApiData->{'tfZipCode'};
        $user->gender = $objApiData->{'rgGender'};
        $user->civil_status = $objApiData->{'rgCivilStatus'};
        $user->telephone_desk = $objApiData->{'tfTelephoneDesk'};
        $user->telephone_mobile = $objApiData->{'tfTelephoneMobile'};
        $user->birth_date = $objApiData->{'dtBirthDate'};
        $user->register_date = $objApiData->{'dtCreatedAt'};
        $user->profile_code = $objApiData->{'tfProfileCode'};
        $user->photo_url = $objApiData->{'tfPhoto'};
        $user->latitude = $objApiData->{'tfLatitude'};
        $user->longitude = $objApiData->{'tfLongitude'};
        $user->geocode_url = $objApiData->{'tfGeocodeUrl'};
        $user->active = $objApiData->{'chActive'};
        $user->email = $objApiData->{'tfEmail'};
        $user->password = bcrypt($objApiData->{'tfPassword'});

        $user->save();

        Emissary::prepareEnvelope();
        $availableInfo = true;

        $apiMessage = Translator::translate(
            'Spanish' ,
            'general' ,
            'RecordCreated' ,
            'RecordCreated');

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('users' , $user);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }


    public function deleteUser()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));

        $User = admUser::find($objApiData->{'UserId'});
        $User->delete();

        Emissary::prepareEnvelope();
        $availableInfo = true;

        $apiMessage = Translator::translate(
            'Spanish' ,
            'general' ,
            'RecordDeleted' ,
            'RecordDeleted');

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }
}
