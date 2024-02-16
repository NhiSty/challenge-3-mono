<?php

namespace App\Normalizer;

use App\Entity\Employee;
use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class EmployeeNormalizer implements NormalizerInterface
{
    public function __construct(
        protected Security $security,
        protected ObjectNormalizer $normalizer,
    ) {}

    public function supportsNormalization(mixed $data, string $format = null): bool
    {
        return $data instanceof Employee;
    }

    public function normalize(mixed $object, string $format = null, array $context = []): mixed
    {
        /** @var ?User $user */
        $user = $this->security->getUser();
        $employee = null;

        if (!$user) {
            return new JsonResponse(['message' => 'Unauthorized'], 401);
        }

        /** @var Employee $currentEmployee */
        $currentEmployeeUser = $object->getUserId();

        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            if ($currentEmployeeUser->getId() === $user->getId()) {
                return null;
            }
            return $this->normalizer->normalize($object, $format, $context);
        } else if (in_array('ROLE_MANAGER', $user->getRoles())) {
            if ($currentEmployeeUser->getId() === $user->getId()) {
                return null;
            }
            if ($user->getCompanies()->contains($object->getFranchiseId()->getCompanyId())) {
                return $this->normalizer->normalize($object, $format, $context);
            }
        }

        return $this->normalizer->normalize($object, $format, $context);
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            Employee::class => true,
        ];
    }
}
