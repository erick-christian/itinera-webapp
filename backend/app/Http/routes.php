<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
use App\Libraries\Wiser;
use App\Libraries\ChromePhp;

Route::get('/' , function () {
    return view('welcome');
});


Route::group(['middleware' => 'web'] , function () {
    //
});

Route::any('/checkroute' , function () {
    return view('checkroute');
});

Route::any('/wiser' , function () {

    echo(Wiser::isReady());

    $csvFile = base_path() . '\database\seeds\csvfiles\temp_country.csv';
    $dataLoad = Wiser::loadCSVFile($csvFile);

    return $dataLoad;
});

Route::any('/dataBridge/{nameController}' , function ($nameController) {
    $nameSpace = 'App\Http\Controllers';

    if (isset($_POST['apiController'])) {
        $apiController = $_POST['apiController'];
    } else {
        if (isset($_GET['apiController'])) {
            $apiController = $_GET['apiController'];
        }
    }

    if (isset($_POST['apiMethod'])) {
        $apiMethod = $_POST['apiMethod'];
    } else {
        if (isset($_GET['apiMethod'])) {
            $apiMethod = $_GET['apiMethod'];
        }
    }

    if (isset($_POST['apiData'])) {
        $apiData = $_POST['apiData'];
    } else {
        if (isset($_GET['apiData'])) {
            $apiData = $_GET['apiData'];
        }
    }

    if (isset($apiController) && isset($apiMethod) && isset($apiData)) {
        $resource = $nameSpace . '\\' . $apiController;
        $apiController = App::make($resource);
        $methodInApi = $apiMethod;

        $execute = $apiController->$methodInApi();
        return $execute;
    } else {
        $objReturnMessage = array();
        $objReturnMessage[1] = new stdClass();
        $objReturnMessage[1]->type = 'API-ERROR';
        $objReturnMessage[1]->message = 'There are not defined variables';

        $objReturn = new stdClass();
        $objReturn->success = false;
        $objReturn->returnMessage = $objReturnMessage;

        return json_encode($objReturn);
    }
});