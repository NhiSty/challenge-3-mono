<?php

namespace App\Action\Get;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class CompanyAction extends AbstractController
{
    public function __construct(
        protected EntityManagerInterface $em,
    )
    {
    }

    public function __invoke(UserRepository $userRepository): JsonResponse
    {
        $user = $this->getUser();
        $companies = $user->getCompanies();

        return $this->json([
            'company' => $companies[0],
            'franchises' => $companies[0]->getFranchises(),
            'owner' => $companies[0]->getOwner(),
        ], 200);
    }

}
