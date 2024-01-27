<?php

namespace App\Action\Post;

use App\Entity\Employee;
use App\Entity\Franchise;
use App\Entity\User;
use App\Repository\FranchiseRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class EmployeeAction extends AbstractController
{

    public function __construct(
        protected EntityManagerInterface $em,
    )
    {
    }

    public function __invoke(FranchiseRepository $fr,Request $req): JsonResponse
    {

        $data = json_decode($req->getContent(), true);
        $email = $data['email'];
        $pwd = $data['password'];
        //$role = $data['role'];
        $firstName = $data['firstName'];
        $lastName = $data['lastName'];
        $age = $data['age'];
        $username = $data['username'];
        $franchise = $data['franchise'];

        $franchise = $fr->findOneBy(['id' => $franchise]);

        if (!$franchise) {
            return $this->json(['message' => 'Franchise not found'], 404);
        }



        $user = new User();
        $user->setEmail($email);
        $user->setPassword($pwd);
        $user->setRoles(['ROLE_USER']);
        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setAge($age);
      //  $user->setBiography($faker->text(100));
        $user->setUsername($username);

        $this->em->persist($user);

        $employee = new Employee();
        $employee->setUserId($user);
        $employee->setFranchiseId($franchise);
        $employee->setRole('ROLE_EMPLOYEE');

        $this->em->persist($employee);
        $this->em->persist($user);
        $this->em->flush();

        return $this->json(['message' => 'Employee created']);
    }

}
