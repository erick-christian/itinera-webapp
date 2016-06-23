<?php
/**
 * Created by PhpStorm.
 * User: ErickRosales
 * Date: 03/11/2015
 * Time: 10:48 AM
 */

namespace App\Libraries;

class Wiser
{
    public static function isReady()
    {
        return 'Wiser::Info: Ready!</br>';
    }

    public static function loadCSVFile($paramFileName)
    {

        $returnValue = '';
        $errorActive = 0;
        $delimiter = '|';
        $header = NULL;
        $data = array();

        if (!file_exists($paramFileName) || !is_readable($paramFileName)) {
            $errorActive = 1;
            $returnValue = '</p>Wiser::Error: File ' . $paramFileName . ' does not exist.</p>';
        }


        if ($errorActive == 0) {

            if (($handle = fopen($paramFileName , 'r')) !== FALSE) {
                while (($row = fgetcsv($handle , 1000 , $delimiter)) !== FALSE) {
                    if (!$header)
                        $header = $row;
                    else
                        $data[] = array_combine($header , $row);
                }
                fclose($handle);
            }
        }


        if ($errorActive == 1) {
            return $returnValue;
        } else {
            return $data;
        }
    }
}

;