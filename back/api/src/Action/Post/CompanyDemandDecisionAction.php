<?php

namespace App\Action\Post;

use App\Controller\Mailer;
use App\Entity\Company;
use App\Entity\DemandStatus;
use App\Entity\Role;
use App\Repository\CompanyDemandRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class CompanyDemandDecisionAction extends AbstractController
{
    public function __construct(
        protected EntityManagerInterface $em
    )
    {
    }

    public function __invoke(Request $req, CompanyDemandRepository $companyDemandRepository, Mailer $mailer): JsonResponse
    {
        $data = json_decode($req->getContent(), true);
        $id = $req->get('id');
        $status = $data['status'];

        $companyDemand = $companyDemandRepository->findOneBy(['id' => $id]);

        if (!$companyDemand) {
            return $this->json(['message' => 'Company demand not found'], 404);
        }

        if ($status === DemandStatus::ACCEPTED->value) {
            $companyDemand->setStatus(DemandStatus::ACCEPTED);
            $company = new Company();
            $company->setStatus(true);
            $company->setCompanyName($companyDemand->getCompanyName());
            $company->setKbis($companyDemand->getKbis());
            $company->setOwner($companyDemand->getAuthor());
            $company->setLatitude($companyDemand->getLatitude());
            $company->setLongitude($companyDemand->getLongitude());
            $company->setAddress($companyDemand->getAddress());
            $user = $companyDemand->getAuthor();
            $user->setRoles([Role::MANAGER]);

            $this->em->persist($company);

            $mailer->sendCompanyDemandAcceptedEmail($companyDemand);

        } else if ($status === DemandStatus::REJECTED->value) {
            $companyDemand->setStatus(DemandStatus::REJECTED);
            $mailer->sendCompanyDemandRejectedEmail($companyDemand);
        } else {
            return $this->json(['message' => 'Invalid status'], 400);
        }

        $this->em->persist($companyDemand);
        $this->em->flush();

        return new JsonResponse($data, 200);

    }

}
