<?php

namespace App\Controller;

use App\Entity\Company;
use App\Entity\CompanyDemand;
use App\Entity\Employee;
use App\Entity\User;
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
    public function sendEmail(User $user, Company $company, string $pwd): void
    {
        $email = (new TemplatedEmail())
            ->from('dev.mailing4@gmail.com')
            ->to($user->getEmail())
            ->subject('Bienvenue chez nous !')
            ->htmlTemplate('emails/newEmployee.html.twig')
            ->context([
                'firstname' => $user->getFirstName(),
                'lastname' => $user->getLastName(),
                'companyName' => $company->getCompanyName(),
                'pwd' => $pwd,
                'identifier' => $user->getEmail()
            ]);

        $this->mailer->send($email);
    }

    public function sendCompanyDemandEmail(CompanyDemand $companyDemand, string $pwd, string $email): void
    {
        $firstName = $companyDemand->getAuthor()->getFirstName();
        $lastName = $companyDemand->getAuthor()->getLastName();
        $companyName = $companyDemand->getCompanyName();

        $email = (new TemplatedEmail())
            ->from('dev.mailing4@gmail.com')
            ->to($companyDemand->getAuthor()->getEmail())
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
            ->to($companyDemand->getAuthor()->getEmail())
            ->subject('Demande de création de compte entreprise')
            ->htmlTemplate('emails/demandAccepted.html.twig')
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
            ->to($companyDemand->getAuthor()->getEmail())
            ->subject('Demande de création de compte entreprise')
            ->htmlTemplate('emails/demandRefused.html.twig')
            ->context([
                'firstname' => $firstName,
                'lastname' => $lastName,
                'companyName' => $companyName
            ]);

        $this->mailer->send($email);
    }
}
