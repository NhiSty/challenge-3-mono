<?php

namespace App\Action\Post;

use App\Controller\Mailer;
use App\Entity\Employee;
use App\Entity\Franchise;
use App\Entity\Role;
use App\Entity\User;
use App\Repository\CompanyRepository;
use App\Repository\FranchiseRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsController]
class FranchiseAction extends AbstractController
{

    public function __construct(
        protected EntityManagerInterface $em,
    )
    {
    }

    /**
     * @throws TransportExceptionInterface
     */
    public function __invoke(CompanyRepository $cr, Request $req): JsonResponse
    {

        $data = json_decode($req->getContent(), true);
        $franchiseName = $data['franchiseName'];
        $companyId = $data['companyId'];
        $latitude = $data['latitude'] ?? null;
        $longitude = $data['longitude'] ?? null;
        $address = $data['address'] ?? null;

        $company = $cr->findOneBy(['id' => $companyId]);

        if (!$company) {
            return $this->json(['message' => 'Company not found'], 404);
        }

        $franchise = new Franchise();
        $franchise->setFranchiseName($franchiseName);
        $franchise->setCompanyId($company);
        $franchise->setLatitude($latitude);
        $franchise->setLongitude($longitude);
        $franchise->setAddress($address);

        $this->em->persist($franchise);
        $this->em->flush();


        return $this->json($franchise, 201);
    }

}
