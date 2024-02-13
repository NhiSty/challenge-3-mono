<?php

declare(strict_types=1);

namespace App\Normalizer;

use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactoryInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserDenormalizer implements DenormalizerInterface
{
    public function __construct(
        protected Security $security,
        protected PasswordHasherFactoryInterface $hasher,
        protected ObjectNormalizer $normalizer,
        protected ValidatorInterface $validator,
    ) {}

    public function denormalize(mixed $data, string $type, string $format = null, array $context = []): mixed
    {
        $user = $this->normalizer->denormalize($data, $type, $format, $context);
        $constraints = new Assert\Collection([
            'plainPassword' => [new Assert\NotBlank()],
            'firstName' => [new Assert\NotBlank()],
            'lastName' => [new Assert\NotBlank()],
            'username' => [new Assert\NotBlank()],
            'age' => [new Assert\NotBlank()],
            'profile' => []
        ]);



        $violations = $this->validator->validate($data, $constraints);

        if (count($violations) > 0) {
            $arrayOfErrors = [];
            foreach ($violations as $violation) {
                $arrayOfErrors[$violation->getPropertyPath()] = $violation->getMessage();
            }
            return new JsonResponse($arrayOfErrors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        assert($user instanceof User);

        $plainPassword = $user->getPlainPassword();

        if (empty($plainPassword)) {
            return $user;
        }

        $hasher = $this->hasher->getPasswordHasher($user);
        $hashedPassword = $hasher->hash($plainPassword);

        $user->setPassword($hashedPassword);
        $user->eraseCredentials();

        return $user;
    }

    public function supportsDenormalization(mixed $data, string $type, string $format = null): bool
    {
        return $type === User::class;
    }
}
