<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TemporaryEmployeeRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TemporaryEmployeeRepository::class)]
#[ApiResource]
class TemporaryEmployee
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'temporaryEmployee', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?TemporaryUser $user_id = null;

    #[ORM\Column(length: 255)]
    private ?string $role = null;

    #[ORM\ManyToOne(inversedBy: 'temporaryEmployees')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Company $company_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserId(): ?TemporaryUser
    {
        return $this->user_id;
    }

    public function setUserId(TemporaryUser $user_id): static
    {
        $this->user_id = $user_id;

        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(string $role): static
    {
        $this->role = $role;

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
