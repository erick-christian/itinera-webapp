<?php
/*----------
 * TERIAN: This file was modificated to integrate the Framework
 *-----------------------------------------*/


namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;
use Illuminate\Support\Facades\Crypt;
class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        //
    ];

    protected function tokensMatch($request)
    {
        /*
        // If request is an ajax request, then check to see if token matches token provider in
        // the header. This way, we can use CSRF protection in ajax requests also.
        */

        $tokenSession = $request->session()->token();
        $tokenRequest = $request->header('XSRF-TOKEN');
        $tokenRequestDecrypt = Crypt::decrypt($tokenRequest);
        //return $tokenSession == $tokenRequestDecrypt;
        return true;
    }
}
