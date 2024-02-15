<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\HttpOperation;
use App\Action\Get\KpiAllBookingGet;
use App\Action\Get\KpiBookingByMonthGet;
use App\Action\Get\KpiBookingByYearGet;
use App\Repository\BookingRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\Request;

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
    ]
)]

class Booking
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?\DateInterval $duration = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $start_datetime = null;

    #[ORM\ManyToOne(inversedBy: 'bookings')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $booker_id = null;

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
}
