<?php

namespace App\Action\Get;

use App\Repository\CompanyDemandRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class KpiAdminCompanyDemandNumberGet extends AbstractController
{

    public function __construct(
        protected EntityManagerInterface $em,
    )
    {
    }


    public function __invoke(CompanyDemandRepository $companyDemandRepository, Request $req): JsonResponse
    {
        $counts = $companyDemandRepository->createQueryBuilder('cd')
            ->select('cd.status AS status, COUNT(cd.id) AS count')
            ->groupBy('cd.status')
            ->getQuery()
            ->getResult();

        $statusCounts = ['pending' => 0, 'accepted' => 0, 'rejected' => 0];
        foreach ($counts as $count) {
            $statusString = $count['status']->value;
            $statusCounts[$statusString] = $count['count'];
        }

        return $this->json(['statusDemand' => $statusCounts], 200);
    }


}
