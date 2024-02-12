<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\ValueObject\ResetPassword;
use Doctrine\ORM\EntityNotFoundException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Message;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsController]
class ResetPasswordController
{
    public function __construct(
        protected MailerInterface $mailer,
        protected UserRepository $userRepository,
    )
    {
    }

    public function __invoke(ResetPassword $dto, Request $request, UserPasswordHasherInterface $hasher)
    {
        $user = $this->userRepository->findOneBy(['email' => $dto->getEmail()]);
        $data = json_decode($request->getContent(), true);
        $newPassword = $data['newPassword'];

        if (null === $user) {
            throw new EntityNotFoundException('email not found');
        }

        if ($user->isIsFirstConnection()) {
            $user->setIsFirstConnection(false);
        }

        $user->setPassword($hasher->hashPassword($user, $newPassword));

        return new JsonResponse(200);
    }
}
