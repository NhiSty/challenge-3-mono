<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column(length: 255)]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    private ?string $lastName = null;

    #[ORM\Column]
    private ?int $age = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $biography = null;

    #[ORM\OneToMany(mappedBy: 'user_id', targetEntity: Availability::class, orphanRemoval: true)]
    private Collection $availabilities;

    #[ORM\OneToMany(mappedBy: 'booker_id', targetEntity: Booking::class, orphanRemoval: true)]
    private Collection $bookings;

    #[ORM\OneToMany(mappedBy: 'user_id', targetEntity: Override::class, orphanRemoval: true)]
    private Collection $overrides;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Company::class)]
    private Collection $companies;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Picture::class)]
    private Collection $pictures;

    #[ORM\OneToMany(mappedBy: 'reviewer', targetEntity: Review::class, orphanRemoval: true)]
    private Collection $createdReviews;

    #[ORM\OneToMany(mappedBy: 'reviewee', targetEntity: Review::class, orphanRemoval: true)]
    private Collection $reviews;

    #[ORM\OneToMany(mappedBy: 'reporter', targetEntity: Report::class, orphanRemoval: true)]
    private Collection $createdReports;

    #[ORM\OneToMany(mappedBy: 'reportee', targetEntity: Report::class, orphanRemoval: true)]
    private Collection $reports;

    #[ORM\OneToOne(mappedBy: 'user_id', cascade: ['persist', 'remove'])]
    private ?Employee $employee = null;

    public function __construct()
    {
        $this->availabilities = new ArrayCollection();
        $this->bookings = new ArrayCollection();
        $this->overrides = new ArrayCollection();
        $this->companies = new ArrayCollection();
        $this->pictures = new ArrayCollection();
        $this->createdReviews = new ArrayCollection();
        $this->reviews = new ArrayCollection();
        $this->createdReports = new ArrayCollection();
        $this->reports = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(int $age): static
    {
        $this->age = $age;

        return $this;
    }

    public function getBiography(): ?string
    {
        return $this->biography;
    }

    public function setBiography(?string $biography): static
    {
        $this->biography = $biography;

        return $this;
    }

    /**
     * @return Collection<int, Availability>
     */
    public function getAvailabilities(): Collection
    {
        return $this->availabilities;
    }

    public function addAvailability(Availability $availability): static
    {
        if (!$this->availabilities->contains($availability)) {
            $this->availabilities->add($availability);
            $availability->setUserId($this);
        }

        return $this;
    }

    public function removeAvailability(Availability $availability): static
    {
        if ($this->availabilities->removeElement($availability)) {
            // set the owning side to null (unless already changed)
            if ($availability->getUserId() === $this) {
                $availability->setUserId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Booking>
     */
    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): static
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings->add($booking);
            $booking->setBookerId($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): static
    {
        if ($this->bookings->removeElement($booking)) {
            // set the owning side to null (unless already changed)
            if ($booking->getBookerId() === $this) {
                $booking->setBookerId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Override>
     */
    public function getOverrides(): Collection
    {
        return $this->overrides;
    }

    public function addOverride(Override $override): static
    {
        if (!$this->overrides->contains($override)) {
            $this->overrides->add($override);
            $override->setUserId($this);
        }

        return $this;
    }

    public function removeOverride(Override $override): static
    {
        if ($this->overrides->removeElement($override)) {
            // set the owning side to null (unless already changed)
            if ($override->getUserId() === $this) {
                $override->setUserId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Company>
     */
    public function getCompanies(): Collection
    {
        return $this->companies;
    }

    public function addCompany(Company $company): static
    {
        if (!$this->companies->contains($company)) {
            $this->companies->add($company);
            $company->setOwner($this);
        }

        return $this;
    }

    public function removeCompany(Company $company): static
    {
        if ($this->companies->removeElement($company)) {
            // set the owning side to null (unless already changed)
            if ($company->getOwner() === $this) {
                $company->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Picture>
     */
    public function getPictures(): Collection
    {
        return $this->pictures;
    }

    public function addPicture(Picture $picture): static
    {
        if (!$this->pictures->contains($picture)) {
            $this->pictures->add($picture);
            $picture->setOwner($this);
        }

        return $this;
    }

    public function removePicture(Picture $picture): static
    {
        if ($this->pictures->removeElement($picture)) {
            // set the owning side to null (unless already changed)
            if ($picture->getOwner() === $this) {
                $picture->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Review>
     */
    public function getCreatedReviews(): Collection
    {
        return $this->createdReviews;
    }

    public function addCreatedReview(Review $createdReview): static
    {
        if (!$this->createdReviews->contains($createdReview)) {
            $this->createdReviews->add($createdReview);
            $createdReview->setReviewer($this);
        }

        return $this;
    }

    public function removeCreatedReview(Review $createdReview): static
    {
        if ($this->createdReviews->removeElement($createdReview)) {
            // set the owning side to null (unless already changed)
            if ($createdReview->getReviewer() === $this) {
                $createdReview->setReviewer(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Review>
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(Review $review): static
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews->add($review);
            $review->setReviewee($this);
        }

        return $this;
    }

    public function removeReview(Review $review): static
    {
        if ($this->reviews->removeElement($review)) {
            // set the owning side to null (unless already changed)
            if ($review->getReviewee() === $this) {
                $review->setReviewee(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Report>
     */
    public function getCreatedReports(): Collection
    {
        return $this->createdReports;
    }

    public function addCreatedReport(Report $createdReport): static
    {
        if (!$this->createdReports->contains($createdReport)) {
            $this->createdReports->add($createdReport);
            $createdReport->setReporter($this);
        }

        return $this;
    }

    public function removeCreatedReport(Report $createdReport): static
    {
        if ($this->createdReports->removeElement($createdReport)) {
            // set the owning side to null (unless already changed)
            if ($createdReport->getReporter() === $this) {
                $createdReport->setReporter(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Report>
     */
    public function getReports(): Collection
    {
        return $this->reports;
    }

    public function addReport(Report $report): static
    {
        if (!$this->reports->contains($report)) {
            $this->reports->add($report);
            $report->setReportee($this);
        }

        return $this;
    }

    public function removeReport(Report $report): static
    {
        if ($this->reports->removeElement($report)) {
            // set the owning side to null (unless already changed)
            if ($report->getReportee() === $this) {
                $report->setReportee(null);
            }
        }

        return $this;
    }

    public function getEmployee(): ?Employee
    {
        return $this->employee;
    }

    public function setEmployee(Employee $employee): static
    {
        // set the owning side of the relation if necessary
        if ($employee->getUserId() !== $this) {
            $employee->setUserId($this);
        }

        $this->employee = $employee;

        return $this;
    }
}
