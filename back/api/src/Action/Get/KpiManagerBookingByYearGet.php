<?php

namespace App\Action\Get;

use App\Repository\BookingRepository;
use App\Repository\CompanyRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class KpiManagerBookingByYearGet extends AbstractController
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

    public function __invoke(CompanyRepository $companyRepository, UserRepository $userRepository, BookingRepository $bookingRepository ,Request $req): JsonResponse
    {
        $countBookingByYearInUserCompany = 0;

        $booking = $bookingRepository->findAll();
        $user = $this->getUser();
        $userCompany = $companyRepository->findOneBy(['owner' => $user->getId()]);

        foreach ($booking as $book) {
            $bookedUser = $book->getBookedId();
            $employee = $bookedUser->getEmployee();
            $franchises = $employee->getFranchiseId();
            $company = $franchises->getCompanyId();

            if ($company?->getId() === $userCompany?->getId()) {
                $date = $book->getStartDatetime();
                if ($date->format('Y') === date('Y')) {
                    $countBookingByYearInUserCompany++;
                }
            }
        }
        return $this->json(['bookingsThisYear' => $countBookingByYearInUserCompany], 200);
    }
}