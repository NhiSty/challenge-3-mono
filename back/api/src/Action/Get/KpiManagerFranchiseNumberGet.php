<?php

namespace App\Action\Get;

use App\Entity\Company;
use App\Repository\CompanyRepository;
use App\Repository\FranchiseRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class KpiManagerFranchiseNumberGet extends AbstractController
{

    public function __construct(
        protected EntityManagerInterface $em,
    )
    {
    }

    /**
     * @throws NonUniqueResultException
     * @throws NoResultException
     */

    public function __invoke(FranchiseRepository $franchiseRepository, CompanyRepository $companyRepository, Request $req): JsonResponse
    {
        $user = $this->getUser();
        $userCompany = $companyRepository->findOneBy(['owner' => $user->getId()]);

        if ($userCompany) {
            $franchises = $franchiseRepository->findBy(['company_id' => $userCompany]);
            $franchiseCount = count($franchises);
        } else {
            $franchiseCount = 0;
        }

        return $this->json(['numberOfFranchises' => $franchiseCount], 200);

    }
}
