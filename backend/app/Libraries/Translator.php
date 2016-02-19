<?php
/**
 * Created by PhpStorm.
 * User: ErickRosales
 * Date: 09/11/2015
 * Time: 06:34 PM
 */

namespace app\Libraries;

use App\admLanguage;
use App\admTranslation;

class Translator
{
    public static function isReady(){
        return 'Translator is Ready!</br>';
    }

    public static function translate($language,
                                     $interface,
                                     $widget,
                                     $literal){

        global $idLanguage;
        global $translation;
        $admLanguages = admLanguage::where('name','=',$language)->get();
        foreach($admLanguages as $admLanguage){
            $idLanguage = $admLanguage->id;
        }

        $admTranslations = admTranslation::
            where('interface','=',$interface)
            ->where('widget' ,'=',$widget)
            ->where('literal','=',$literal)->get();

        foreach($admTranslations as $admTranslation){
            switch($idLanguage){
                case 1:
                    $translation = $admTranslation->translation01;
                    break;
                case 2:
                    $translation = $admTranslation->translation02;
                    break;
                case 3:
                    $translation = $admTranslation->translation03;
                    break;
                case 4:
                    $translation = $admTranslation->translation03;
                    break;
            }
        }

        return $translation;
    }
}