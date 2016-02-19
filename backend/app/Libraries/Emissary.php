<?php
/**
 * Created by PhpStorm.
 * User: ErickRosales
 * Date: 10/11/2015
 * Time: 09:52 AM
 */

namespace app\Libraries;

class Emissary
{
    private static $dataReturn;


    public static function isReady(){
        return 'Emisary is Ready!</br>';
    }

    public static function prepareEnvelope(){
        self::$dataReturn = new \stdClass();
        self::$dataReturn->message = array();
        //self::$dataReturn->data = array();
    }

    public static function success($success){
        self::$dataReturn->success = $success;
    }

    public static function addMessage($type,$message){
        $objMessage = new \stdClass();
        $objMessage->type = $type;
        $objMessage->message = $message;

        array_push(self::$dataReturn->message,$objMessage);
    }

    public static function addData($objName,$objData){
        //array_push(self::$dataReturn->{$objName},$objData);
        self::$dataReturn->{$objName} = $objData;
    }

    public static function getEnvelope(){
        return self::$dataReturn;
    }
}