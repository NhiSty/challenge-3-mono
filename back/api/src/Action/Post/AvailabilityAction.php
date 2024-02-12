<?php

namespace App\Action\Post;

use App\Entity\Availability;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class AvailabilityAction extends AbstractController
{

    public function __construct(
        protected EntityManagerInterface $em,
    )
    {
    }

    public function __invoke(UserRepository $userRepository, Request $req): JsonResponse
    {
        $userId = $req->get("id");
        $user = $userRepository->findOneBy(['id' => $userId]);

        if (!$user) {
            return $this->json(['message' => 'User not found'], 400);
        }

        $data = json_decode($req->getContent(), true);

        try {
            $startTime = new \DateTime($data['startTime']);
            $endTime = new \DateTime($data['endTime']);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Invalid time provided'], 400);
        }

        $availability = new Availability();
        $availability->setUser($user);
        $availability->setEndTime($endTime);
        $availability->setStartTime($startTime);
        $availability->setWeekDay($data['weekDay']);
        $this->em->persist($availability);
        $this->em->flush();

        return $this->json($data, 201);
    }

}
