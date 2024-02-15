<?php

namespace App\Action\Post;

use App\Entity\Booking;
use App\Repository\UserRepository;
use DateInterval;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class BookingAction extends AbstractController
{

    public function __construct(
        protected EntityManagerInterface $em,
    )
    {
    }

    public function __invoke(UserRepository $userRepository, Request $req): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $bookedBy = $userRepository->findOneBy(['id' => $data['bookedByUserId']]);
        $bookedTo = $userRepository->findOneBy(['id' => $data['bookedToUserId']]);

        if (!$bookedTo || !$bookedBy) {
            return $this->json(['message' => 'User not found'], 400);
        }

        try {
            $startTime = new DateTime($data['startDatetime']);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Invalid time provided'], 400);
        }

        try {
            $duration = new DateInterval($data['duration']);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Invalid duration provided'], 400);
        }

        $booking = new Booking();
        $booking->setBookerId($bookedBy);
        $booking->setBookedId($bookedTo);
        $booking->setStartDatetime($startTime);
        $booking->setDuration($duration);
        $this->em->persist($booking);
        $this->em->flush();

        return $this->json($data, 201);
    }

}
