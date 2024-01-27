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
            ->from('dev.mailing4@gmail.com')
            ->to('auralion4@gmail.com')
            //->cc('cc@example.com')
            //->bcc('bcc@example.com')
            //->replyTo('fabien@example.com')
            //->priority(Email::PRIORITY_HIGH)
            ->subject('Time for Symfony Mailer!')
            ->text('Sending emails is fun again!')
            ->html('<p>See Twig integration for better HTML integration!</p>');

            $this->mailer->send($email);
        

        return $this->json(['message' => 'Email sent']);
    }

}
