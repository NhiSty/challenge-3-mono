<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\CompanyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CompanyRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['company:read']],
)]
#[ApiFilter(SearchFilter::class, properties: ['owner.id' => 'exact'])]
class Company
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['company:read', 'performance:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['performance:read', 'company:read'])]
    private ?string $company_name = null;

    #[ORM\Column]
    #[Groups(['company:read'])]
    private ?bool $status = null;

    #[ORM\Column(type: Types::TEXT, length: 255)]
    #[Groups(['company:read'])]
    private ?string $kbis = null;

    #[ORM\ManyToOne(cascade: ['persist', 'remove'], inversedBy: 'companies')]
    #[Groups(['company:read'])]
    private ?User $owner = null;

    #[ORM\OneToMany(mappedBy: 'company_id', targetEntity: Performance::class, cascade: ['persist', 'remove'])]
    #[Groups(['company:read'])]
    private Collection $performances;

    #[ORM\OneToMany(mappedBy: 'company_id', targetEntity: Franchise::class, orphanRemoval: true)]
    #[Groups(['company:read'])]
    private Collection $franchises;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read'])]
    private ?string $address = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['company:read'])]
    private ?float $latitude = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['company:read'])]
    private ?float $longitude = null;

    public function __construct()
    {
        $this->performances = new ArrayCollection();
        $this->franchises = new ArrayCollection();
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
     * @return Collection<int, Franchise>
     */
    public function getFranchises(): Collection
    {
        return $this->franchises;
    }

    public function addFranchise(Franchise $franchise): static
    {
        if (!$this->franchises->contains($franchise)) {
            $this->franchises->add($franchise);
            $franchise->setCompanyId($this);
        }

        return $this;
    }

    public function removeFranchise(Franchise $franchise): static
    {
        if ($this->franchises->removeElement($franchise)) {
            // set the owning side to null (unless already changed)
            if ($franchise->getCompanyId() === $this) {
                $franchise->setCompanyId(null);
            }
        }

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
}
