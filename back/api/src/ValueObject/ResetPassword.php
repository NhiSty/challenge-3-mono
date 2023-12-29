<?php

namespace App\ValueObject;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use App\Controller\ResetPasswordController;
use App\Entity\User;

use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/users/reset-password',
            controller: ResetPasswordController::class,
            normalizationContext: ['groups' => ['read-user']],
            output: User::class,
            name: 'ResetPassword',
        ),
    ],
)]
class ResetPassword
{
    #[Assert\Email()]
    private string $email = '';

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }
}
