<?php

namespace App\Action\Get;

use App\Repository\AvailabilityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class AvailabilityGet extends AbstractController
{

    public function __construct(
        protected EntityManagerInterface $em,
    )
    {
    }

    public function __invoke(AvailabilityRepository $availabilityRepository, Request $req): JsonResponse
    {
        $userId = $req->get("id");
        $data = $availabilityRepository->findBy(['user_id' => $userId]);
        return $this->json($data, 200);
    }

}
