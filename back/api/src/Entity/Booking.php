<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\HttpOperation;
use App\Action\Get\KpiAllBookingGet;
use App\Action\Get\KpiBookingByMonthGet;
use App\Action\Get\KpiBookingByYearGet;
use App\Action\Post\BookingAction;
use App\Repository\BookingRepository;
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
            controller: KpiAllBookingGet::class,
            normalizationContext: ['groups' => ['read-kpi-bookings']],
            read: false,
        ),
        new HttpOperation(
            method: Request::METHOD_GET,
            uriTemplate: '/booking/monthly/kpi',
            controller: KpiBookingByMonthGet::class,
            normalizationContext: ['groups' => ['read-kpi-bookings-monthly']],
            read: false,
        ),
        new HttpOperation(
            method: Request::METHOD_GET,
            uriTemplate: '/booking/year/kpi',
            controller: KpiBookingByYearGet::class,
            normalizationContext: ['groups' => ['read-kpi-bookings-yearly']],
            read: false,
        ),
        new GetCollection(normalizationContext: ['groups' => ['read-user', 'read-booking']]),
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
}
