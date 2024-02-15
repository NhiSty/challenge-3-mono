<?php

declare(strict_types=1);

namespace App\Normalizer;

use App\Entity\Picture;
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

        assert($user instanceof User);

        if(isset($data['profile'])) {
            $picture = new Picture();
            $picture->setPath($data['profile']);
            $user->addPicture($picture);
        }

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
