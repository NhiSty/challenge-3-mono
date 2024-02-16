<?php

namespace App\Action\Get;

use App\Repository\CompanyRepository;
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

    public function __invoke(UserRepository $userRepository, CompanyRepository $companyRepository): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json([
                'error' => 'User not found'
            ], 404);
        }

        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            return $this->json([
                'companies' => $companyRepository->findAll(),
            ], 200);
        }

        $companies = $user->getCompanies();

        return $this->json([
            'company' => $companies[0],
            'franchises' => $companies[0]->getFranchises(),
            'owner' => $companies[0]->getOwner(),
        ], 200);
    }

}
