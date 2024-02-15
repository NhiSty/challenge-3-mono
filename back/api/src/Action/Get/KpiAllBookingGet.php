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
class KpiAllBookingGet extends AbstractController
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
        $date = new \DateTime();
        $from = new \DateTime($date->format("Y-m-01")." 00:00:00");
        $to   = new \DateTime($date->format("Y-m-t")." 23:59:59");

        $query = $bookingRepository->createQueryBuilder('b')
            ->select('count(b.id)')
            ->where('b.start_datetime BETWEEN :from AND :to')
            ->setParameter('from', $from )
            ->setParameter('to', $to)
            ->getQuery();

        $numberOfBookingsThisMonth = $query->getSingleScalarResult();

        return $this->json(['numberOfBookingThisMonth' => $numberOfBookingsThisMonth], 200);
    }

}
