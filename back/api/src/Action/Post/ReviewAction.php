<?php

namespace App\Action\Post;

use App\Entity\Booking;
use App\Entity\Review;
use App\Repository\BookingRepository;
use App\Repository\PerformanceRepository;
use App\Repository\UserRepository;
use DateInterval;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class ReviewAction extends AbstractController
{

    public function __construct(
        protected EntityManagerInterface $em,
    )
    {
    }

    public function __invoke(BookingRepository $bookingRepository, Request $req): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $booking = $bookingRepository->findOneBy(['id' => $data['bookingId']]);

        if (!$booking) {
            return $this->json(['message' => 'Booking not found'], 400);
        }

        $review = new Review();
        $review->setReviewContent($data['reviewContent']);
        $review->setBooking($booking);
        $this->em->persist($review);
        $this->em->flush();

        return $this->json($data, 201);
    }

}
