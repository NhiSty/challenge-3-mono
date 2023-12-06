<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

class GreetingsTest extends ApiTestCase
{

    protected function login($email = 'user@gmail.com', $password = 'test123!')
    {
        $client = static::createClient();

       $response =  $client->request(
            'POST',
            '/login',
            [
                'json' => [
                    'email' => $email,
                    'password' => $password,
                ],
                "headers" => [
                    "Content-Type" => "application/ld+json"
                ]
            ]
        );

       var_dump($response->toArray());
        return $response->toArray()['token'];
    }

    protected function createAuthenticatedClient($email = 'user@gmail.com', $password = '$2y$13$Fs05Q7OWSMIj6ZwxXitCiu9m5fmqp35aSrMNmlV0xND1rY6DnPWUO')
    {
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

    }
    public function testCreateGreeting(): void
    {
      //  $this->createAuthenticatedClient();
        $client =  $this->login();

        $client->request('POST', '/greetings', [
            'json' => [
                'name' => 'Kévin',
            ],
            'headers' => [
                'Content-Type' => 'application/ld+json',
            ],
        ]);

        $this->assertResponseStatusCodeSame(201);
        $this->assertJsonContains([
            '@context' => '/contexts/Greeting',
            '@type' => 'Greeting',
            'name' => 'Kévin',
        ]);
    }
}
