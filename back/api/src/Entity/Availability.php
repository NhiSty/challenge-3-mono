<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\HttpOperation;
use App\Action\Get\AvailabilityGet;
use App\Action\Post\AvailabilityAction;
use App\Repository\AvailabilityRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AvailabilityRepository::class)]
#[ApiResource(
    operations: [
        new HttpOperation(
            method: Request::METHOD_GET,
            uriTemplate: '/users/{id}/availabilities',
            controller: AvailabilityGet::class,
            denormalizationContext: ['groups' => ['read-availability']],
            read: false,
        ),
        new HttpOperation(
            method: Request::METHOD_POST,
            uriTemplate: '/users/{id}/availabilities',
            controller: AvailabilityAction::class,
            denormalizationContext: ['groups' => []],
            read: false,
        ),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['read-availability', 'read-user']],
)]
#[ApiFilter(SearchFilter::class, properties: ["user_id" => "exact"])]
class Availability
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read-availability', 'create-availability', 'read-user'])]
    private ?string $week_day = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    #[Groups(['read-availability', 'create-availability', 'read-user'])]
    private ?\DateTimeInterface $start_time = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    #[Groups(['read-availability', 'create-availability', 'read-user'])]
    private ?\DateTimeInterface $end_time = null;

    #[ORM\ManyToOne(inversedBy: 'availabilities')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read-availability', 'create-availability'])]
    private ?User $user_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getWeekDay(): ?string
    {
        return $this->week_day;
    }

    public function setWeekDay(string $week_day): static
    {
        $this->week_day = $week_day;

        return $this;
    }

    public function getStartTime(): ?\DateTimeInterface
    {
        return $this->start_time;
    }

    public function setStartTime(\DateTimeInterface $start_time): static
    {
        $this->start_time = $start_time;

        return $this;
    }

    public function getEndTime(): ?\DateTimeInterface
    {
        return $this->end_time;
    }

    public function setEndTime(\DateTimeInterface $end_time): static
    {
        $this->end_time = $end_time;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUser(?User $user): static
    {
        $this->user_id = $user;

        return $this;
    }
}
