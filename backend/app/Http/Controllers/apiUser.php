<?php

namespace App\Http\Controllers;

use App\Http\Requests;

use App\admUser;

use App\Libraries\Translator;
use App\Libraries\Emissary;

use Illuminate\Http\Request;

class apiUser extends Controller
{

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function listUser()
    {
        global $availableInfo;
        global $apiMessage;

        $objApiData = json_decode($this->request->input('apiData'));
        $start = $objApiData->{'start'};
        $page = $objApiData->{'page'};
        $limit = $objApiData->{'limit'};

        $numCustomers = admUser::count();
        $users = admUser::all();

        Emissary::prepareEnvelope();
        $availableInfo = true;

        $apiMessage = Translator::translate(
            'Spanish',
            'apiAccessLogin',
            'InformationPrepared',
            'InformationPrepared');

        $objCountReg = new \stdClass();
        $objCountReg->total = $numCustomers;

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api', $apiMessage);
        Emissary::addData('users', $users);
        Emissary::addData('numUsers', $objCountReg);

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
            'Spanish',
            'apiUser',
            'showUser',
            'showUser');

        Emissary::success($availableInfo);
        Emissary::addMessage('info-api', $apiMessage);
        Emissary::addData('Users', $User);

        $objReturn = Emissary::getEnvelope();
        return json_encode($objReturn);
    }

    public function createUser()
    {
        //
    }

    public function storeUser(Request $request)
    {
        //
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
