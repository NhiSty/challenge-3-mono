<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EmployeeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EmployeeRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['employee:read']],
    denormalizationContext: ['groups' => ['write:employee']],
)]
class Employee
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['employee:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['employee:read'])]
    private ?Role $role = null;

    #[ORM\ManyToOne(inversedBy: 'employees')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['employee:read'])]
    private ?Franchise $franchise_id = null;

    #[ORM\OneToOne(inversedBy: 'employee', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['employee:read'])]
    private ?User $user_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRole(): ?Role
    {
        return $this->role;
    }

    public function setRole(Role $role): static
    {
        $this->role = $role;

        return $this;
    }

    public function getFranchiseId(): ?Franchise
    {
        return $this->franchise_id;
    }

    public function setFranchiseId(?Franchise $franchise_id): static
    {
        $this->franchise_id = $franchise_id;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(User $user_id): static
    {
        $this->user_id = $user_id;

        return $this;
    }
}
