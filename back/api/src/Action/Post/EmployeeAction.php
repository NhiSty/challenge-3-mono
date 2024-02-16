<?php

namespace App\Action\Post;

use App\Controller\Mailer;
use App\Entity\Employee;
use App\Entity\Role;
use App\Entity\User;
use App\Repository\FranchiseRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsController]
class EmployeeAction extends AbstractController
{

    public function __construct(
        protected EntityManagerInterface $em,
    )
    {
    }

    /**
     * @throws TransportExceptionInterface
     */
    public function __invoke(FranchiseRepository $fr, Request $req, Mailer $mailer, UserPasswordHasherInterface $hasher): JsonResponse
    {

        $data = json_decode($req->getContent(), true);
        $email = $data['email'];
        $pwd = 'test123!';
        //$role = $data['role'];
        $firstName = $data['firstname'];
        $lastName = $data['lastname'];
        $age = $data['age'];
        $username = $data['username'];
        $franchise = $data['franchise'];

        $franchise = $fr->findOneBy(['id' => $franchise]);

        if (!$franchise) {
            return $this->json(['message' => 'Franchise not found'], 404);
        }

        $user = new User();
        $user->setEmail($email);
        $user->setPassword($hasher->hashPassword($user, $pwd));
        $user->setRoles([Role::EMPLOYEE]);
        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setAge($age);
      //  $user->setBiography($faker->text(100));
        $user->setUsername($username);
        $user->setIsFirstConnection(true);

        $this->em->persist($user);

        $employee = new Employee();
        $employee->setUserId($user);
        $employee->setFranchiseId($franchise);
        $employee->setRole(Role::EMPLOYEE);

        $this->em->persist($employee);
        $this->em->persist($user);
        $this->em->flush();

        $company = $franchise->getCompanyId();
        $mailer->sendEmail($user, $company, $pwd);

        return $this->json($data, 201);
    }

}
