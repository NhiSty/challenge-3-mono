<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;


class UserTest extends ApiTestCase
{

    private string $token;
    private string $email = 'user@gmail.com';
    private string $password = 'test123!';

    public function login(): string
    {

        $client = static::createClient();
        $client->request(
            'POST',
            '/api/login',
            [
                'json' => [
                    'email' => $this->email,
                    'password' => $this->password,
                ],
                "headers" => [
                    "Content-Type" => "application/json",
                    "Accept" => "application/json"
                ]
            ]
        );

        return json_decode($client->getResponse()->getContent(), true)['token'];
    }

    public function setUp(): void
    {
        $this->token = $this->login();
    }

    /**
     * @throws TransportExceptionInterface
     */
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
                    'password' => $this->password,
                    'email' => $this->email,
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

    /**
     * @throws TransportExceptionInterface
     */
    public function testLogin200(): void
    {

        $client = static::createClient();
        $client->request(
            'POST',
            '/api/login',
            [
                'json' => [
                    'email' => $this->email,
                    'password' => $this->password,
                ],
                "headers" => [
                    "Content-Type" => "application/json",
                    "Accept" => "application/json"
                ]
            ]
        );
        $this->assertResponseStatusCodeSame(200);
    }

    public function testLogin401(): void
    {
        $client = static::createClient();
        $client->request(
            'POST',
            '/api/login',
            [
                'json' => [
                    'email' => 'false',
                    'password' => 'false',
                ],
                "headers" => [
                    "Content-Type" => "application/json",
                    "Accept" => "application/json"
                ]
            ]
        );
        $this->assertResponseStatusCodeSame(401);
    }

    public function testLogin400(): void
    {
        $client = static::createClient();
        $client->request(
            'POST',
            '/api/login',
            [
                'json' => [
                    'email' => 'false',
                ],
                "headers" => [
                    "Content-Type" => "application/json",
                    "Accept" => "application/json"
                ]
            ]
        );
        $this->assertResponseStatusCodeSame(400);
    }

    public function testGetUser(): void
    {
        $client = static::createClient();
        $client->request(
            'GET',
            '/users',
            [
                "headers" => [
                    "Authorization" => "Bearer " . $this->token,
                    "Content-Type" => "application/json",
                    "Accept" => "application/json"
                ]
            ]
        );

        $this->assertResponseStatusCodeSame(200);
    }

    public function testGetUserById(): void
    {
        $client = static::createClient();
        $client->request(
            'GET',
            '/users/3',
            [
                "headers" => [
                    "Authorization" => "Bearer " . $this->token,
                    "Content-Type" => "application/json",
                    "Accept" => "application/json"
                ]
            ]
        );

        $this->assertResponseStatusCodeSame(200);
    }

    public function testUpdateUser200(): void
    {
        $client = static::createClient();
        $client->request(
            'PATCH',
            '/users/3',
            [
                'json' => [
                    "username" => "user",
                    'plainPassword' => $this->password,
                    'email' => $this->email,
                    'firstName' => 'userFirstName',
                    'lastName' => 'userLastName',
                    "age" => 20,
                ],
                "headers" => [
                    'Authorization' => 'Bearer ' . $this->token,
                    "Content-Type" => "application/json",
                    'Accept' => 'application/json'
                ]
            ]
        );

        $this->assertResponseStatusCodeSame(200);
    }

    public function testUpdateUser401(): void
    {
        $client = static::createClient();
        $client->request(
            'PATCH',
            '/users/3',
            [
                'json' => [
                    "username" => "user",
                    'plainPassword' => $this->password,
                    'email' => $this->email,
                    'firstName' => 'userFirstName',
                    'lastName' => 'userLastName',
                    "age" => 20,
                ],
                "headers" => [
                    'Authorization' => 'Bearer ' . 'false',
                    "Content-Type" => "application/json",
                    'Accept' => 'application/json'
                ]
            ]
        );

        $this->assertResponseStatusCodeSame(401);
    }

}
