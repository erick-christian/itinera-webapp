<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\admCustomer;
use App\Libraries\Translator;
use App\Libraries\Emissary;


class apiCustomer extends Controller
{

    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function listCustomer()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));
        $start = $objApiData->{'start'};
        $page = $objApiData->{'page'};
        $limit = $objApiData->{'limit'};

        $numCustomers = admCustomer::count();
        $customers = admCustomer::all();

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
        Emissary::addData('customers' , $customers);
        Emissary::addData('numCustomers' , $objCountReg);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }

    public function showCustomer()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));
        $customerId = $objApiData->{'CustomerID'};

        $customer = admCustomer::find($customerId);

        Emissary::prepareEnvelope();
        $availableInfo = true;

        $apiMessage = Translator::translate(
            'Spanish' ,
            'apiAccessLogin' ,
            'InformationPrepared' ,
            'InformationPrepared');

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('customers' , $customer);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }


    public function createCustomer()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));

        $customer = new admCustomer;
        $customer->short_name = $objApiData->{'tfShortName'};
        $customer->company       = $objApiData->{'tfCompany'};
        $customer->tax_id        = $objApiData->{'tfTaxId'};
        $customer->password      = $objApiData->{'tfPassword'};
        $customer->is_active = $objApiData->{'chActive'};
        $customer->address       = $objApiData->{'tfAddress'};
        $customer->zip_code      = $objApiData->{'tfZipCode'};
        $customer->region        = $objApiData->{'tfRegion'};
        $customer->city          = $objApiData->{'tfCity'};
        $customer->country_code = $objApiData->{'tfCountry'};
        $customer->contact_name  = $objApiData->{'tfContactName'};
        $customer->contact_phone = $objApiData->{'tfContactPhone'};
        $customer->contact_email = $objApiData->{'tfEmail'};
        $customer->phone         = $objApiData->{'tfPhone'};
        $customer->website       = $objApiData->{'tfWebsite'};
        $customer->latitude      = $objApiData->{'tfLatitude'};
        $customer->longitude     = $objApiData->{'tfLongitude'};
        $customer->geocode_url   = $objApiData->{'tfGeocodeUrl'};

        $customer->save();

        Emissary::prepareEnvelope();
        $availableInfo = true;

        $apiMessage = Translator::translate(
            'Spanish' ,
            'general' ,
            'RecordCreated' ,
            'RecordCreated');

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api' , $apiMessage);
        Emissary::addData('customers' , $customer);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }

    public function updateCustomer()
    {

    }

    public function deleteCustomer()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));

        $customer = admCustomer::find($objApiData->{'customerId'});
        $customer->delete();

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

