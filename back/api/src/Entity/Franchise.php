<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\HttpOperation;
use App\Action\Get\KpiFranchiseNumberGet;
use App\Repository\FranchiseRepository;
use App\State\FranchiseStateProvider;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: FranchiseRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            provider: FranchiseStateProvider::class,
        ),
        new HttpOperation(
            method: Request::METHOD_GET,
            uriTemplate: '/franchises/kpi/user',
            controller: KpiFranchiseNumberGet::class,
            normalizationContext: ['groups' => ['read-kpi-franchise']],
            security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_ADMIN')",
            read: false,
        ),
    ]
)]

class Franchise
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $franchise_name = null;

    #[ORM\ManyToOne(inversedBy: 'franchises')]
    private ?Company $company_id = null;

    #[ORM\OneToMany(mappedBy: 'franchise_id', targetEntity: Employee::class, orphanRemoval: true)]
    private Collection $employees;

    public function __construct()
    {
        $this->employees = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFranchiseName(): ?string
    {
        return $this->franchise_name;
    }

    public function setFranchiseName(string $franchise_name): static
    {
        $this->franchise_name = $franchise_name;

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

    /**
     * @return Collection<int, Employee>
     */
    public function getEmployees(): Collection
    {
        return $this->employees;
    }

    public function addEmployee(Employee $employee): static
    {
        if (!$this->employees->contains($employee)) {
            $this->employees->add($employee);
            $employee->setFranchiseId($this);
        }

        return $this;
    }

    public function removeEmployee(Employee $employee): static
    {
        if ($this->employees->removeElement($employee)) {
            // set the owning side to null (unless already changed)
            if ($employee->getFranchiseId() === $this) {
                $employee->setFranchiseId(null);
            }
        }

        return $this;
    }
}
