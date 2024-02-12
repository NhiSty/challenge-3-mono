<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\HttpOperation;
use App\Action\Post\CompanyDemandDecisionAction;
use App\Action\Post\CompanyDemandAction;
use App\Repository\CompanyDemandRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\Request;
use ApiPlatform\OpenApi\Model;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CompanyDemandRepository::class)]
#[ApiResource(
    operations: [
        new Get(normalizationContext: ['groups' => ['company_demand:read']]),
        new GetCollection(normalizationContext: ['groups' => ['company_demand:read']]),
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
#[ApiFilter(SearchFilter::class, properties: ['status' => 'exact'])]
class CompanyDemand
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['company_demand:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company_demand:read'])]
    private ?string $companyName = null;

    #[ORM\Column]
    #[Groups(['company_demand:read'])]
    private $kbis = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company_demand:read'])]
    private ?DemandStatus $status = null;

    #[ORM\OneToOne(inversedBy: 'companyDemand', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['company_demand:read'])]
    private ?User $author = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company_demand:read'])]
    private ?string $address = null;

    #[ORM\Column]
    #[Groups(['company_demand:read'])]
    private ?float $latitude = null;

    #[ORM\Column]
    #[Groups(['company_demand:read'])]
    private ?float $longitude = null;

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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(float $latitude): static
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(float $longitude): static
    {
        $this->longitude = $longitude;

        return $this;
    }
}
