<?php

namespace App\Action\Get;

use App\Repository\BookingRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class KpiAdminBookingByYearGet extends AbstractController
{

    public function __construct(
        protected EntityManagerInterface $em,
    )
    {
    }

    /**
     * @throws NonUniqueResultException
     * @throws NoResultException
     * @throws \Exception
     */

    public function __invoke(BookingRepository $bookingRepository, Request $req): JsonResponse
    {
        $from = new \DateTime('first day of January this year midnight');
        $to   = new \DateTime('last day of December this year 23:59:59');

        $query = $bookingRepository->createQueryBuilder('b')
            ->select('count(b.id)')
            ->where('b.start_datetime BETWEEN :from AND :to')
            ->setParameter('from', $from)
            ->setParameter('to', $to)
            ->getQuery()
            ->getSingleScalarResult();

        return $this->json(['bookingsThisYear' => $query], 200);
    }

}
