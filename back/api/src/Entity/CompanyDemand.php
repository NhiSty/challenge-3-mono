<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\HttpOperation;
use App\Action\Post\CompanyDemandDecisionAction;
use App\Action\Post\CompanyDemandAction;
use App\Repository\CompanyDemandRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\Request;
use ApiPlatform\OpenApi\Model;

#[ORM\Entity(repositoryClass: CompanyDemandRepository::class)]
#[ApiResource(
    operations: [
        new HttpOperation(
            method: Request::METHOD_POST,
            uriTemplate: '/company_demands',
            controller: CompanyDemandAction::class,
            openapi: new Model\Operation(
                summary: 'Create a company demand',
                requestBody: new Model\RequestBody(
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'companyName' => ['type' => 'string'],
                                    'firstname' => ['type' => 'string'],
                                    'lastname' => ['type' => 'string'],
                                    'email' => ['type' => 'string'],
                                    'kbis' => ['type' => 'string'],
                                ]
                            ],
                        ]
                    ])
                )
            ),
            read: false
        ),
        new HttpOperation(
            method: Request::METHOD_POST,
            uriTemplate: '/company_demands/{id}/decision',
            controller: CompanyDemandDecisionAction::class,
            openapi: new Model\Operation(
                summary: 'Accept or reject a company demand',
                requestBody: new Model\RequestBody(
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'status' => ['type' => 'string'],
                                ]
                            ],
                        ]
                    ])
                )
            ),
            read: false,
        )
    ]
)]
class CompanyDemand
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $companyName = null;

    #[ORM\Column(type: Types::BLOB, nullable: true)]
    private $kbis = null;

    #[ORM\Column(length: 255)]
    private ?DemandStatus $status = null;

    #[ORM\OneToOne(inversedBy: 'companyDemand', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $author = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCompanyName(): ?string
    {
        return $this->companyName;
    }

    public function setCompanyName(string $companyName): static
    {
        $this->companyName = $companyName;

        return $this;
    }

    public function getKbis()
    {
        return $this->kbis;
    }

    public function setKbis($kbis): static
    {
        $this->kbis = $kbis;

        return $this;
    }

    public function getStatus(): ?DemandStatus
    {
        return $this->status;
    }

    public function setStatus(DemandStatus $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(User $author): static
    {
        $this->author = $author;

        return $this;
    }
}
