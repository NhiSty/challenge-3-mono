<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\HttpOperation;
use App\Action\Post\ReviewAction;
use App\Repository\ReviewRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ReviewRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['review:read']]),
        new HttpOperation(
            method: Request::METHOD_POST,
            uriTemplate: '/reviews',
            controller: ReviewAction::class,
            denormalizationContext: ['groups' => []],
            read: false,
        ),
    ],
    normalizationContext: ['groups' => ['review:read']],
)]
class Review
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['review:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'reviews')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['review:read'])]
    private ?Booking $booking = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['read-booking', 'read-user', 'review:read'])]
    private ?string $review_content = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReviewContent(): ?string
    {
        return $this->review_content;
    }

    public function setReviewContent(string $review_content): static
    {
        $this->review_content = $review_content;

        return $this;
    }

    public function getBooking(): ?Booking
    {
        return $this->booking;
    }

    public function setBooking(?Booking $booking): static
    {
        $this->booking = $booking;

        return $this;
    }
}
