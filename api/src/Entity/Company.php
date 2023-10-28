<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CompanyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CompanyRepository::class)]
#[ApiResource]
class Company
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $company_name = null;

    #[ORM\Column]
    private ?bool $status = null;

    #[ORM\Column(length: 255)]
    private ?string $kbis = null;

    #[ORM\ManyToOne(inversedBy: 'companies')]
    private ?User $owner = null;

    #[ORM\OneToMany(mappedBy: 'company_id', targetEntity: Performance::class)]
    private Collection $performances;

    #[ORM\OneToMany(mappedBy: 'compagny_id', targetEntity: TemporaryEmployee::class, orphanRemoval: true)]
    private Collection $temporaryEmployees;

    public function __construct()
    {
        $this->performances = new ArrayCollection();
        $this->temporaryEmployees = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCompanyName(): ?string
    {
        return $this->company_name;
    }

    public function setCompanyName(string $company_name): static
    {
        $this->company_name = $company_name;

        return $this;
    }

    public function isStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getKbis(): ?string
    {
        return $this->kbis;
    }

    public function setKbis(string $kbis): static
    {
        $this->kbis = $kbis;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): static
    {
        $this->owner = $owner;

        return $this;
    }

    /**
     * @return Collection<int, Performance>
     */
    public function getPerformances(): Collection
    {
        return $this->performances;
    }

    public function addPerformance(Performance $performance): static
    {
        if (!$this->performances->contains($performance)) {
            $this->performances->add($performance);
            $performance->setCompanyId($this);
        }

        return $this;
    }

    public function removePerformance(Performance $performance): static
    {
        if ($this->performances->removeElement($performance)) {
            // set the owning side to null (unless already changed)
            if ($performance->getCompanyId() === $this) {
                $performance->setCompanyId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, TemporaryEmployee>
     */
    public function getTemporaryEmployees(): Collection
    {
        return $this->temporaryEmployees;
    }

    public function addTemporaryEmployee(TemporaryEmployee $temporaryEmployee): static
    {
        if (!$this->temporaryEmployees->contains($temporaryEmployee)) {
            $this->temporaryEmployees->add($temporaryEmployee);
            $temporaryEmployee->setCompanyId($this);
        }

        return $this;
    }

    public function removeTemporaryEmployee(TemporaryEmployee $temporaryEmployee): static
    {
        if ($this->temporaryEmployees->removeElement($temporaryEmployee)) {
            // set the owning side to null (unless already changed)
            if ($temporaryEmployee->getCompanyId() === $this) {
                $temporaryEmployee->setCompanyId(null);
            }
        }

        return $this;
    }
}
