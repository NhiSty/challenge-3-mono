<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\HttpOperation;
use ApiPlatform\Metadata\Patch;
use App\Action\Post\FranchiseAction;
use App\Action\Get\KpiManagerFranchiseNumberGet;
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
            controller: KpiManagerFranchiseNumberGet::class,
            //normalizationContext: ['groups' => ['read-kpi-franchise']],
            security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_ADMIN')",
            read: false,
        ),
        new HttpOperation(
            method: Request::METHOD_POST,
            uriTemplate: '/franchises',
            controller: FranchiseAction::class,
            denormalizationContext: ['groups' => ['franchise:write']],
            security: 'is_granted("ROLE_ADMIN") or is_granted("ROLE_MANAGER")',
        ),
        new Patch(
            security: 'is_granted("ROLE_ADMIN") or is_granted("ROLE_MANAGER") and object.getCompanyId().getOwner() == user',
        ),
        new Delete(
            security: 'is_granted("ROLE_ADMIN") or is_granted("ROLE_MANAGER") and object.getCompanyId().getOwner() == user',
        ),
    ]
)]

class Franchise
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['company:read', 'employee:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'franchise:write', 'employee:read'])]
    private ?string $franchise_name = null;

    #[ORM\ManyToOne(inversedBy: 'franchises')]
    #[Groups(['employee:read'])]
    private ?Company $company_id = null;

    #[ORM\OneToMany(mappedBy: 'franchise_id', targetEntity: Employee::class, orphanRemoval: true)]
    #[Groups(['company:read'])]
    private Collection $employees;

    #[ORM\Column(nullable: true)]
    #[Groups(['company:read', 'franchise:write'])]
    private ?float $latitude = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['company:read', 'franchise:write'])]
    private ?float $longitude = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['company:read', 'franchise:write'])]
    private ?string $address = null;

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

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(?float $latitude): static
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(?float $longitude): static
    {
        $this->longitude = $longitude;

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
}
