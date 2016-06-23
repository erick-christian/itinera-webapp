<!DOCTYPE html>
<html>
<head>
    <title>Itinera TMS - Routes Alive!</title>

    <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">

    <style>
        html, body {
            height: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            width: 100%;
            display: table;
            font-weight: 100;
            font-family: 'Lato';
        }

        .container {
            text-align: center;
            display: table-cell;
            vertical-align: middle;
        }

        .content {
            text-align: center;
            display: inline-block;
        }

        .title {
            font-size: 114px;
            display: inline;
        }

        .titleSmall {
            font-size: 56px;
        }

        .titleMicro {
            font-size: 46px;
            font-weight: bold;
            display: inline;
        }

    </style>
    <script type="text/javascript">
        //window.location.href = "http://localhost/itinera/webapps/access/index.html"
    </script>
</head>
<body>
<div class="container">
    <div class="content">
        <p align="center">
            <img src="../../framework/terian/image/logo_itinera.png">
        </p>
        <p>
        <div class="title">Itinera TMS</div>
        <div class="titleMicro">0.1</div>
        </p>
        <p>
        <div class="titleSmall">Powered with Sencha ExtJs, Laravel and PHP</div>
        </p>

        <p>
        <div class="titleMicro">
            <?php
            $laravel = app();
            $version = $laravel::VERSION;
            $laravelVersion = 'Laravel Version: ' . $version;
            echo($laravelVersion);
            ?>
        </div>
        </p>
        <p>
        <div class="titleMicro">
            <?php
            $phpVersion = 'PHP Version: ' . phpversion();
            echo($phpVersion);
            ?>
        </div>
        </p>
    </div>
</div>
</body>
</html>
