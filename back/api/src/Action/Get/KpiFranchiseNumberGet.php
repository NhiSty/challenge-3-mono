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
class KpiFranchiseNumberGet extends AbstractController
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
    // for manager

    public function __invoke(FranchiseRepository $franchiseRepository, Request $req): JsonResponse
    {

        $franchises = $franchiseRepository->createQueryBuilder('f')
            ->innerJoin('f.company_id', 'c')
            ->where('c.owner = :userId')
            ->setParameter('userId', $this->getUser()->getId())
            ->getQuery()
            ->getResult();

        $result = count($franchises);

        return $this->json(['franchises' => $result], 200);
    }
}
