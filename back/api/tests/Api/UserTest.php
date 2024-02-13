<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use Symfony\Component\PasswordHasher\PasswordHasherInterface;


class UserTest extends ApiTestCase
{

   protected function testCreateUser(): void
    {
        $email = 'user@gmail.com';
        $password = 'test123!';
        $client = static::createClient();

        $client->request(
            'POST',
            '/users',
            [
                'json' => [
                    "username" => "user",
                    'password' => $password,
                    'email' => $email,
                    'firstName' => 'userFirstName',
                    'lastName' => 'userLastName',
                    "age" => 20,
                ],
                "headers" => [
                    "Content-Type" => "application/ld+json"
                ]
            ]
        );



        $this->assertResponseStatusCodeSame(201);

    }


    public function testLogin(): void
    {
        $email = 'user@gmail.com';
        $password = 'test123!';
        $client = static::createClient();
        $client->request(
            'POST',
            '/api/login',
            [
                'json' => [
                    'email' => $email,
                    'password' => $password,
                ],
                "headers" => [
                    "Content-Type" => "application/json",
                    "Accept" => "application/json"
                ]
            ]
        );



        $this->assertResponseStatusCodeSame(200);
    }
}
