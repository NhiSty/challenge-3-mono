<?php

namespace App\Action\Delete;

use App\Repository\AvailabilityRepository;
use App\Repository\EmployeeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class EmployeeAction extends AbstractController
{

    public function __construct(
    protected EntityManagerInterface $em,
)
{
}

    public function __invoke(EmployeeRepository $employeeRepository, Request $request): JsonResponse
{
    $user = $this->getUser();
    $employeeId = $request->get('id');
    $employee = $employeeRepository->findOneBy(['id' => $employeeId]);

    if (!$employee) {
        return $this->json([
            'error' => 'Employee not found'
        ], 404);
    }

    $employeeUser = $employee->getUserId();

    if (in_array('ROLE_ADMIN', $user->getRoles())) {
        $this->em->remove($employee);
        $this->em->remove($employeeUser);
        $this->em->flush();

        return new JsonResponse(null, 204);
    }

    if (in_array('ROLE_MANAGER', $user->getRoles())) {
        $franchises = $user->getCompanies()[0]->getFranchises();

        foreach ($franchises as $franchise) {
            if ($franchise->getId() === $employee->getFranchiseId()->getId()) {
                $this->em->remove($employee);
                $this->em->flush();
                return new JsonResponse(null, 204);
                break;
            }
        }
    }

    return $this->json([
        'error' => 'You are not allowed to delete this employee'
    ], 403);
}

}
