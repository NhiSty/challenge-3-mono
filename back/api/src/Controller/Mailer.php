<?php

namespace App\Controller;

use App\Entity\CompanyDemand;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

#[AsController]
class Mailer extends AbstractController
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

    /**
     * @throws TransportExceptionInterface
     */
    public function sendEmail(): void
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
            ->html('<p>Felicitation pour votre inscription</p>');

        $this->mailer->send($email);
    }

    public function sendCompanyDemandEmail(CompanyDemand $companyDemand, string $pwd, string $email): void
    {
        $firstName = $companyDemand->getAuthor()->getFirstName();
        $lastName = $companyDemand->getAuthor()->getLastName();
        $companyName = $companyDemand->getCompanyName();

        $email = (new TemplatedEmail())
            ->from('dev.mailing4@gmail.com')
            ->to('thomas.jallu@gmail.com'/*$companyDemand->getAuthor()->getEmail()*/)
            ->subject('Demande de création de compte entreprise')
            ->htmlTemplate('emails/demandRefused.html.twig')
            ->context([
                'firstname' => $firstName,
                'lastname' => $lastName,
                'companyName' => $companyName,
                'pwd' => $pwd,
                'identifier' => $email
            ]);

        $this->mailer->send($email);
    }

    public function sendCompanyDemandAcceptedEmail(CompanyDemand $companyDemand): void
    {
        $firstName = $companyDemand->getAuthor()->getFirstName();
        $lastName = $companyDemand->getAuthor()->getLastName();
        $companyName = $companyDemand->getCompanyName();
        ;
        $email = (new TemplatedEmail())
            ->from('dev.mailing4@gmail.com')
            ->to('thomas.jallu@gmail.com'/*$companyDemand->getAuthor()->getEmail()*/)
            ->subject('Demande de création de compte entreprise')
            ->htmlTemplate('emails/newDemandAccepted.html.twig')
            ->context([
                'firstname' => $firstName,
                'lastname' => $lastName,
                'companyName' => $companyName
            ]);

        $this->mailer->send($email);
    }

    public function sendCompanyDemandRejectedEmail(CompanyDemand $companyDemand): void
    {
        $firstName = $companyDemand->getAuthor()->getFirstName();
        $lastName = $companyDemand->getAuthor()->getLastName();
        $companyName = $companyDemand->getCompanyName();

        $email = (new TemplatedEmail())
            ->from('dev.mailing4@gmail.com')
            ->to('thomas.jallu@gmail.com'/*$companyDemand->getAuthor()->getEmail()*/)
            ->subject('Demande de création de compte entreprise')
            ->htmlTemplate('emails/newDemandRejected.html.twig')
            ->context([
                'firstname' => $firstName,
                'lastname' => $lastName,
                'companyName' => $companyName
            ]);

        $this->mailer->send($email);
    }
}
