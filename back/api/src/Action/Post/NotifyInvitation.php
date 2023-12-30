<?php

namespace App\Action\Post;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

#[AsController]
class NotifyInvitation extends AbstractController
{
    public function __construct(
        protected MailerInterface $mailer
    ) {}


    /**
     * @throws TransportExceptionInterface
     */
    public function __invoke(): \Symfony\Component\HttpFoundation\JsonResponse
    {
        $email = (new Email())
            ->from('test@test.fr')
            ->to('auralion4@gmail.com')
            ->subject('Invitation')
            ->text('Vous avez été invité à rejoindre le site !');

        try {
            $this->mailer->send($email);
        } catch (\Exception $e) {
            return $this->json(['message' => $e]);
        } ;

        return $this->json(['message' => 'Email sent']);
    }

}
