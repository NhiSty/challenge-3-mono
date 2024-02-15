<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use App\Entity\User;

class CompanyDemandTest extends ApiTestCase
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
    public function testCreateCompanyDemand(): void
    {
        $client = static::createClient();
        $companyName = 'Nishty';
        $kbis = 'kbis';
        $address = 'address';
        $latitude = 48.8566;
        $longitude = 2.3522;

        $client->request(
            'POST',
            '/company_demands',
            [
                'json' => [
                    "companyName" => $companyName,
                    'kbis' => $kbis,
                    'firstname' => 'John',
                    'lastname' => 'Doe',
                    'email' => 'john.doe@gmai.com',
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'address' => $address
                ],
                "headers" => [
                    "Content-Type" => "application/ld+json",
                    "Authorization" => "Bearer " . $this->token,
                ]
            ]
        );


        $this->assertResponseStatusCodeSame(201);
    }

    public function testFAilCompanyDemand(): void
    {
        $client = static::createClient();
        $companyName = 'Nishty';
        $kbis = 'kbis';
        $address = 'address';
        $latitude = 48.8566;
        $longitude = 2.3522;

        $client->request(
            'POST',
            '/company_demands',
            [
                'json' => [
                    "companyName" => $companyName,
                    'kbis' => $kbis,
                    'firstname' => 'John',
                    'lastname' => 'Doe',
                    'email' => 'john.doe@gmai.com',
                    'latitude' => 'latitude',
                    'longitude' => 'longitude',
                    'address' => $address
                ],
                "headers" => [
                    "Content-Type" => "application/ld+json",
                    "Authorization" => "Bearer " . $this->token,
                ]
            ]
        );


        $this->assertResponseStatusCodeSame(400);
    }

}
