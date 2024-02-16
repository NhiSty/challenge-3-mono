<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Processor\PerformanceProcessor;
use App\Repository\PerformanceRepository;
use App\State\PerformanceStateProvider;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PerformanceRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_ADMIN')",
            provider: PerformanceStateProvider::class,
        ),
        new Post(
            security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_ADMIN')",
            processor: PerformanceProcessor::class,
        ),
        new Delete(
            security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_ADMIN')",
        ),
    ],
    normalizationContext: ['groups' => ['performance:read']],
)]
class Performance
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['company:read', 'performance:read', 'read-booking', 'employee:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'performance:read', 'read-booking', 'employee:read'])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'performances')]
    #[Groups(['performance:read'])]
    private ?Company $company_id = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['performance:read', 'read-booking', 'employee:read', 'company:read'])]
    private ?string $price = null;

    #[ORM\OneToMany(mappedBy: 'performance', targetEntity: Booking::class, orphanRemoval: true)]
    private Collection $bookings;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

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

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getBookings(): Collection
    {
        return $this->bookings;
    }
}
