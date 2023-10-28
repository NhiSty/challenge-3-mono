<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\FranchiseRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FranchiseRepository::class)]
#[ApiResource]
class Franchise
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $building_name = null;

    #[ORM\ManyToOne(inversedBy: 'franchises')]
    private ?Company $company_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBuildingName(): ?string
    {
        return $this->building_name;
    }

    public function setBuildingName(string $building_name): static
    {
        $this->building_name = $building_name;

        return $this;
    }

    public function getCompanyId(): ?Company
    {
        return $this->company_id;
    }

    public function setCompanyId(?Company $company_id): static
    {
        $this->company_id = $company_id;

        return $this;
    }
}
