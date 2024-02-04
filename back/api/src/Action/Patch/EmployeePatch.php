<?php

namespace App\Action\Patch;

use App\Repository\EmployeeRepository;
use App\Repository\FranchiseRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class EmployeePatch extends AbstractController
{
    public function __construct(
        protected EntityManagerInterface $em,
    )
    {}

    public function __invoke(FranchiseRepository $fr, Request $req, UserRepository $userRepository, EmployeeRepository $employeeRepository): JsonResponse
    {
        $employeeId = $req->get('id');
        $data = json_decode($req->getContent(), true);
        $email = $data['email'] ?? null;
        $role = $data['role'] ?? null;
        $firstName = $data['firstname'] ?? null;
        $lastName = $data['lastname'] ?? null;
        $age = $data['age'] ?? null;
        $username = $data['username'] ?? null;
        $franchiseId = $data['franchise'] ?? null;

        $franchise = $fr->findOneBy(['id' => $franchiseId]);
        if (!$franchise) {
            return $this->json(['message' => 'Franchise not found'], 404);
        }

        $employee = $employeeRepository->findOneBy(['id' => $employeeId]);
        if (!$employee) {
            return $this->json(['message' => 'Employee not found'], 404);
        }

        $user = $employee->getUserId();
        if (!$user) {
            return $this->json(['message' => 'User not found'], 404);
        }

        $user->setEmail($email ?? $user->getEmail());
        $user->setFirstName($firstName ?? $user->getFirstName());
        $user->setLastName($lastName ?? $user->getLastName());
        $user->setAge($age ?? $user->getAge());
        $user->setUsername($username ?? $user->getUsername());
        $this->em->persist($user);

        $employee->setRole($role ?? $employee->getRole());
        $employee->setFranchiseId($franchise);
        $this->em->persist($employee);

        $this->em->flush();

        return new JsonResponse($data, 200);
    }
}
