<?php

use Illuminate\Database\Seeder;
use App\admTranslation;

class admTranslationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Seeding adm_translations

        admTranslation::firstOrCreate([
            'interface'         => 'access',
            'widget'            => 'tfEmail',
            'literal'           => 'Email',
            'translation01'     => 'Correo Electrónico',
            'empty01'           => 'Ingrese Correo Electrónico',
            'tooltip01'         => 'Escriba su Correo Electrónico',
            'translation02'     => 'e-mail',
            'empty02'           => 'Write yout e-mail',
            'tooltip02'         => 'Write yout e-mail',
            'translation03'     => 'Email',
            'empty03'           => 'Escriba seu e-mail',
            'tooltip03'         => 'Escriba seu e-mail',
            'translation04'     => 'No Translation',
            'translation05'     => 'No Translation',
        ]);

        admTranslation::firstOrCreate([
            'interface'         => 'access',
            'widget'            => 'tfUser',
            'literal'           => 'User',
            'translation01'     => 'Usuario',
            'empty01'           => 'Ingrese Usuario',
            'tooltip01'         => 'Escriba el Usuario',
            'translation02'     => 'User',
            'empty02'           => 'Type User',
            'tooltip02'         => 'Type the User',
            'translation03'     => 'Usuario',
            'empty03'           => 'Escriba o Usuario',
            'tooltip03'         => 'Escriba o Usuario',
            'translation04'     => 'No Translation',
            'translation05'     => 'No Translation',
        ]);

        admTranslation::firstOrCreate([
            'interface'         => 'access',
            'widget'            => 'tfPassword',
            'literal'           => 'Password',
            'translation01'     => 'Contraseña',
            'empty01'           => 'Ingrese la Contraseña',
            'tooltip01'         => 'Ingrese la Contraseña',
            'translation02'     => 'Password',
            'empty02'           => 'Type Password',
            'tooltip02'         => 'Type Password',
            'translation03'     => 'Senha',
            'empty03'           => 'Escriba a Senha',
            'tooltip03'         => 'Escriba a Senha',
            'translation04'     => 'No Translation',
            'translation05'     => 'No Translation',
        ]);


        admTranslation::firstOrCreate([
            'interface'         => 'access',
            'widget'            => 'btnAccess',
            'literal'           => 'LogIn',
            'translation01'     => 'Acceder',
            'empty01'           => '',
            'tooltip01'         => 'Acceder a la Aplicación',
            'translation02'     => 'Log In',
            'empty02'           => '',
            'tooltip02'         => 'Access to the Application',
            'translation03'     => 'Entrar',
            'empty03'           => '',
            'tooltip03'         => 'Acessar o Aplicativo',
            'translation04'     => 'No Translation',
            'translation05'     => 'No Translation',
        ]);


        admTranslation::firstOrCreate([
            'interface'         => 'access',
            'widget'            => 'btnRecovery',
            'literal'           => 'Recovery',
            'translation01'     => '</br>Recuperar</br>Acceso',
            'empty01'           => '',
            'tooltip01'         => 'Recuperar Acceso',
            'translation02'     => '</br>Recover</br>Password',
            'empty02'           => '',
            'tooltip02'         => 'Recover Password',
            'translation03'     => '</br>Recuperar</br>Acesso',
            'empty03'           => '',
            'tooltip03'         => 'Recuperar Acesso',
            'translation04'     => 'No Translation',
            'translation05'     => 'No Translation',
        ]);

        admTranslation::firstOrCreate([
            'interface'         => 'apiAccessLogin',
            'widget'            => 'AccessNoGranted',
            'literal'           => 'AccessNoGranted',
            'translation01'     => 'Acceso no permitido</br>Por favor, verifique la información.',
            'empty01'           => '',
            'tooltip01'         => '',
            'translation02'     => 'Acceso not granted</br>Please, verifique la información.',
            'empty02'           => '',
            'tooltip02'         => 'Recover Password',
            'translation03'     => 'Acesso nao permitido</br>Por favor, verifique a informacao.',
            'empty03'           => '',
            'tooltip03'         => 'Recuperar Acesso',
            'translation04'     => 'No Translation',
            'translation05'     => 'No Translation',
        ]);
        admTranslation::firstOrCreate([
            'interface'         => 'apiAccessLogin',
            'widget'            => 'AccessGranted',
            'literal'           => 'AccessGranted',
            'translation01'     => 'Acceso permitido</br>Dirigir al Espacio de Trabajo.',
            'empty01'           => '',
            'tooltip01'         => '',
            'translation02'     => 'Acceso granted</br>Redirect to Workplace.',
            'empty02'           => '',
            'tooltip02'         => 'Recover Password',
            'translation03'     => 'Acesso permitido</br>Dirigir pra Espaco do Trabalho.',
            'empty03'           => '',
            'tooltip03'         => 'Recuperar Acesso',
            'translation04'     => 'No Translation',
            'translation05'     => 'No Translation',
        ]);

        admTranslation::firstOrCreate([
            'interface'         => 'apiAccessLogin',
            'widget'            => 'InformationPrepared',
            'literal'           => 'InformationPrepared',
            'translation01'     => 'Informacion Preparada.',
            'empty01'           => '',
            'tooltip01'         => '',
            'translation02'     => 'Information Prepares.',
            'empty02'           => '',
            'tooltip02'         => '',
            'translation03'     => 'Informacao Preparada.',
            'empty03'           => '',
            'tooltip03'         => '',
            'translation04'     => 'No Translation',
            'translation05'     => 'No Translation',
        ]);

        admTranslation::firstOrCreate([
            'interface'         => 'general',
            'widget'            => 'RecordCreated',
            'literal'           => 'RecordCreated',
            'translation01'     => 'Registro creado.',
            'empty01'           => '',
            'tooltip01'         => '',
            'translation02'     => 'Record created.',
            'empty02'           => '',
            'tooltip02'         => '',
            'translation03'     => 'Registro criado.',
            'empty03'           => '',
            'tooltip03'         => '',
            'translation04'     => 'No Translation',
            'translation05'     => 'No Translation',
        ]);


        admTranslation::firstOrCreate([
            'interface'         => 'general',
            'widget'            => 'RecordUpdated',
            'literal'           => 'RecordUpdated',
            'translation01'     => 'Registro actualizado.',
            'empty01'           => '',
            'tooltip01'         => '',
            'translation02'     => 'Record updated.',
            'empty02'           => '',
            'tooltip02'         => '',
            'translation03'     => 'Registro atualizado.',
            'empty03'           => '',
            'tooltip03'         => '',
            'translation04'     => 'No Translation',
            'translation05'     => 'No Translation',
        ]);

        admTranslation::firstOrCreate([
            'interface'         => 'general',
            'widget'            => 'RecordDeleted',
            'literal'           => 'RecordDeleted',
            'translation01'     => 'Registro eliminado.',
            'empty01'           => '',
            'tooltip01'         => '',
            'translation02'     => 'Record deleted.',
            'empty02'           => '',
            'tooltip02'         => '',
            'translation03'     => 'Registro eliminado.',
            'empty03'           => '',
            'tooltip03'         => '',
            'translation04'     => 'No Translation',
            'translation05'     => 'No Translation',
        ]);
    }
}
