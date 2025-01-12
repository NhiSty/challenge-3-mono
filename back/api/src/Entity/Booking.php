<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\HttpOperation;
use App\Action\Get\KpiAdminBookingsByMonthGet;
use App\Action\Get\KpiManagerBookingMonthTotalGet;
use App\Action\Get\KpiManagerBookingByYearGet;
use App\Action\Get\KpiManagerBookingsByMonthGet;
use App\Action\Get\KpiAdminBookingByYearGet;
use App\Action\Post\BookingAction;
use App\Repository\BookingRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: BookingRepository::class)]
#[ApiResource(
    operations: [
        new HttpOperation(
            method: Request::METHOD_GET,
            uriTemplate: '/booking/kpi',
            controller: KpiManagerBookingMonthTotalGet::class,
            normalizationContext: ['groups' => ['read-kpi-bookings']],
            security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_ADMIN')",
            read: false,
        ),
        new HttpOperation(
            method: Request::METHOD_GET,
            uriTemplate: '/booking/monthly/admin/kpi',
            controller: KpiAdminBookingsByMonthGet::class,
            normalizationContext: ['groups' => ['read-kpi-bookings-monthly-admin']],
            security: "is_granted('ROLE_ADMIN')",
            read: false,
        ),
        new HttpOperation(
            method: Request::METHOD_GET,
            uriTemplate: '/booking/monthly/manager/kpi',
            controller: KpiManagerBookingsByMonthGet::class,
            normalizationContext: ['groups' => ['read-kpi-bookings-monthly-manager']],
            security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_ADMIN')",
            read: false,
        ),
        new HttpOperation(
            method: Request::METHOD_GET,
            uriTemplate: '/booking/year/admin/kpi',
            controller: KpiAdminBookingByYearGet::class,
            normalizationContext: ['groups' => ['read-kpi-bookings-yearly-admin']],
            security: "is_granted('ROLE_ADMIN')",
            read: false,
        ),
        new HttpOperation(
            method: Request::METHOD_GET,
            uriTemplate: '/booking/year/manager/kpi',
            controller: KpiManagerBookingByYearGet::class,
            normalizationContext: ['groups' => ['read-kpi-bookings-yearly-manager']],
            security: "is_granted('ROLE_MANAGER') or is_granted('ROLE_ADMIN')",
            read: false,
        ),
        new GetCollection(normalizationContext: ['groups' => ['read-user', 'read-booking']]),
        new GetCollection(normalizationContext: ['groups' => ['read-booking']]),
        new HttpOperation(
            method: Request::METHOD_POST,
            uriTemplate: '/bookings',
            controller: BookingAction::class,
            denormalizationContext: ['groups' => []],
            read: false,
        ),
    ],
    normalizationContext: ['groups' => ['read-user', 'read-user-mutation']],

)]
class Booking
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-booking', 'read-user'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['read-booking', 'read-user'])]
    private ?\DateInterval $duration = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['read-booking', 'read-user'])]
    private ?\DateTimeInterface $start_datetime = null;

    #[ORM\ManyToOne(inversedBy: 'bookingsMade')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read-booking'])]
    private ?User $booker_id = null;

    #[ORM\ManyToOne(inversedBy: 'bookingsReceived')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read-booking'])]
    private ?User $booked_id = null;

    #[ORM\OneToMany(mappedBy: 'booking', targetEntity: Review::class, orphanRemoval: true)]
    #[Groups(['read-booking', 'read-user'])]
    private Collection $reviews;

    #[ORM\ManyToOne(inversedBy: 'bookings')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read-booking', 'read-user'])]
    private ?Performance $performance = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDuration(): ?\DateInterval
    {
        return $this->duration;
    }

    public function setDuration(\DateInterval $duration): static
    {
        $this->duration = $duration;

        return $this;
    }

    public function getStartDatetime(): ?\DateTimeInterface
    {
        return $this->start_datetime;
    }

    public function setStartDatetime(\DateTimeInterface $start_datetime): static
    {
        $this->start_datetime = $start_datetime;

        return $this;
    }

    public function getBookerId(): ?User
    {
        return $this->booker_id;
    }

    public function setBookerId(?User $booker_id): static
    {
        $this->booker_id = $booker_id;

        return $this;
    }

    public function getBookedId(): ?User
    {
        return $this->booked_id;
    }

    public function setBookedId(?User $booked_id): static
    {
        $this->booked_id = $booked_id;

        return $this;
    }

    public function getPerformance(): ?Performance
    {
        return $this->performance;
    }

    public function setPerformance(?Performance $performance): static
    {
        $this->performance = $performance;

        return $this;
    }

    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function setReviews(Collection $reviews): static
    {
        $this->reviews = $reviews;

        return $this;
    }
}
