<?php

use Symfony\Component\Dotenv\Dotenv;

require dirname(__DIR__).'/vendor/autoload.php';

if (file_exists(dirname(__DIR__).'/config/bootstrap.php')) {
    require dirname(__DIR__).'/config/bootstrap.php';
} elseif (method_exists(Dotenv::class, 'bootEnv')) {
    (new Dotenv())->bootEnv(dirname(__DIR__).'/.env');
}

if ($_SERVER['APP_DEBUG']) {
    umask(0000);
}

// drop and create the test database

passthru(sprintf(
    'APP_ENV=%s php "%s/../bin/console" --env=test doctrine:database:drop --force --if-exists',
    $_ENV['APP_ENV'],
    __DIR__
));

// executes the "php bin/console cache:clear" command
passthru(sprintf(
    'APP_ENV=%s php "%s/../bin/console" --env=test doctrine:database:create --if-not-exists',
    $_ENV['APP_ENV'],
    __DIR__
));

passthru(sprintf(
    'APP_ENV=%s php "%s/../bin/console" --env=test doctrine:schema:update --complete --force',
    $_ENV['APP_ENV'],
    __DIR__
));

passthru(sprintf(
    'APP_ENV=%s php "%s/../bin/console" --env=test doctrine:fixtures:load --no-interaction',
    $_ENV['APP_ENV'],
    __DIR__
));
