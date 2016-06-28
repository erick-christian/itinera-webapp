<?php
/**
 * Created by PhpStorm.
 * User: erickroco
 * Date: 12/04/16
 * Time: 07:23 PM
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\admCompany;
use App\admSystem;
use App\Libraries\Translator;
use App\Libraries\Emissary;

class apiCompany extends Controller
{
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function showCompany()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));

        $Company = admCompany::where('is_active' , 'yes')->first();
        $System = admSystem::where('is_active' , 'yes')->first();

        $Company->system_code = $System->system_code;
        $Company->system_name = $System->system_name;
        $Company->system_version = $System->version;

        Emissary::prepareEnvelope();
        $availableInfo = true;

        $apiMessage = Translator::translate(
            'Spanish' ,
            'apiCompany' ,
            'showCompany' ,
            'showCompany');

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('companies' , $Company);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }

    public function storeCompany()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));

        $company = admCompany::firstOrNew([
            'company_code' => $objApiData->{'tfCompanyCode'}
        ]);

        $company->commercial_name = $objApiData->{'tfCommercialName'};
        $company->business_name = $objApiData->{'tfBusinessName'};
        $company->tax_id = $objApiData->{'tfTaxId'};
        $company->address = $objApiData->{'tfAddress'};
        $company->location = $objApiData->{'tfLocation'};
        $company->region = $objApiData->{'tfRegion'};
        $company->city = $objApiData->{'tfCity'};
        $company->state_code = $objApiData->{'tfStateCode'};
        $company->country_code = $objApiData->{'tfCountryCode'};
        $company->zip_code = $objApiData->{'tfZipCode'};
        $company->phone = $objApiData->{'tfPhone'};
        $company->contact_name = $objApiData->{'tfContactName'};
        $company->contact_phone = $objApiData->{'tfContactPhone'};
        $company->email = $objApiData->{'tfEmail'};
        $company->website = $objApiData->{'tfWebsite'};
        $company->logo_image = $objApiData->{'tfLogo'};

        $company->save();

        Emissary::prepareEnvelope();
        $availableInfo = true;

        $apiMessage = Translator::translate(
            'Spanish' ,
            'general' ,
            'RecordCreated' ,
            'RecordCreated');

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('companys' , $company);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }


}
