<?php

namespace App\Action\Post;

use App\Controller\Mailer;
use App\Entity\CompanyDemand;
use App\Entity\DemandStatus;
use App\Entity\User;
use App\Repository\CompanyRepository;
use App\Repository\FranchiseRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Utils\RandomStringGenerator;

#[AsController]
class CompanyDemandAction extends AbstractController
{
    public function __construct(
        protected EntityManagerInterface $em,
    )
    {
    }

    public function __invoke(Request $req, Mailer $mailer, UserPasswordHasherInterface $hasher, RandomStringGenerator $randomStringGenerato, UserRepository $userRepository, CompanyRepository $companyRepository): JsonResponse
    {
        $data = json_decode($req->getContent(), true);
        $firstname = $data['firstname'];
        $lastname = $data['lastname'];
        $email = $data['email'];
        $companyName = $data['companyName'];
        //$kbis = $data['kbis'] ?? null;
        $pwd = 'test123!'; //$randomStringGenerator->generateRandomString(16);

        $useExist = $userRepository->findOneBy(['email' => $email]);
        if($useExist){
            return $this->json(['message' => 'Email account already exist'], 400); // todo mettre la clé dans un fichier de traduction
        }

        $companyExist = $companyRepository->findOneBy(['company_name' => $companyName]);
        if($companyExist){
            return $this->json(['message' => 'Company already exist'], 400); // todo mettre la clé dans un fichier de traduction
        }


        $user = new User();
        $user->setEmail($email);
        $user->setUsername($email);
        $user->setPassword($hasher->hashPassword($user, $pwd));
        $user->setRoles(['COMPANY_DEMAND']);
        $user->setFirstName($firstname);
        $user->setLastName($lastname);

        $this->em->persist($user);

        $companyDemand = new CompanyDemand();
        $companyDemand->setCompanyName($companyName);
        //$companyDemand->setKbis($kbis);
        $companyDemand->setStatus(DemandStatus::PENDING);
        $companyDemand->setAuthor($user);

        $this->em->persist($companyDemand);

        $mailer->sendCompanyDemandEmail($companyDemand);

        $this->em->flush();


        return $this->json(['message' => 'Company demand created'], 201);
    }
}
