<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ReviewRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReviewRepository::class)]
#[ApiResource]
class Review
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'createdReviews')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $reviewer = null;

    #[ORM\ManyToOne(inversedBy: 'reviews')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $reviewee = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $review_content = null;

    #[ORM\Column(length: 255)]
    private ?string $category = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReviewer(): ?User
    {
        return $this->reviewer;
    }

    public function setReviewer(?User $reviewer): static
    {
        $this->reviewer = $reviewer;

        return $this;
    }

    public function getReviewee(): ?User
    {
        return $this->reviewee;
    }

    public function setReviewee(?User $reviewee): static
    {
        $this->reviewee = $reviewee;

        return $this;
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

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): static
    {
        $this->category = $category;

        return $this;
    }
}
