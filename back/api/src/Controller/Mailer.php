<?php

namespace App\Controller;

use App\Entity\CompanyDemand;
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

    public function sendCompanyDemandEmail(CompanyDemand $companyDemand): void
    {
        $firstName = $companyDemand->getAuthor()->getFirstName();
        $lastName = $companyDemand->getAuthor()->getLastName();
        $companyName = $companyDemand->getCompanyName();
        $html = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">

        <h2 style="color: #2196F3;">Demande de création de compagnie</h2>

        <p>Bonjour {$firstName} {$lastName},</p>

        <p>Votre demande de création pour la compagnie {$companyName} a bien été reçue. Nous vous remercions pour votre confiance.</p>

        <p>Nous vous tiendrons informé de l'avancement de votre demande dans les plus brefs délais.</p>

        <p>Cordialement,<br>
        L\'équipe Rent-A-Dream</p>
        </div>`;

        $email = (new Email())
            ->from('dev.mailing4@gmail.com')
            ->to('thomas.jallu@gmail.com'/*$companyDemand->getAuthor()->getEmail()*/)
            ->subject('Demande de création de compte entreprise')
            ->text('Votre demande a été acceptée')
            ->html($html);

        $this->mailer->send($email);
    }

    public function sendCompanyDemandAcceptedEmail(CompanyDemand $companyDemand): void
    {
        $firstName = $companyDemand->getAuthor()->getFirstName();
        $lastName = $companyDemand->getAuthor()->getLastName();
        $companyName = $companyDemand->getCompanyName();
        $html = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">

        <h2 style="color: #4CAF50;">Demande de création de compagnie acceptée</h2>

        <p>Bonjour {$firstName} {$lastName},</p>

        <p>Votre demande de création pour la compagnie {$companyName} a été acceptée avec succès. Félicitations !</p>

        <p>Vous pouvez maintenant accéder à votre compte et commencer à utiliser nos services.</p>

        <p>Merci de faire partie de notre communauté.</p>

        <p>Cordialement,<br>
        L\'équipe Rent-A-Dream</p>

    </div>`;
        $email = (new Email())
            ->from('dev.mailing4@gmail.com')
            ->to('thomas.jallu@gmail.com'/*$companyDemand->getAuthor()->getEmail()*/)
            ->subject('Demande de création de compte entreprise')
            ->text('Votre demande a été acceptée')
            ->html($html);

        $this->mailer->send($email);
    }

    public function sendCompanyDemandRejectedEmail(CompanyDemand $companyDemand): void
    {
        $firstName = $companyDemand->getAuthor()->getFirstName();
        $lastName = $companyDemand->getAuthor()->getLastName();
        $companyName = $companyDemand->getCompanyName();
        $html = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">

        <h2 style="color: #f44336;">Demande de création de compagnie refusée</h2>

        <p>Bonjour {$firstName} {$lastName},</p>

        <p>Votre demande de création pour la compagnie {$companyName} a été refusée. Veuillez nous excuser pour la gêne occasionnée.</p>

        <p>N'hésitez pas à nous contacter pour plus d'informations.</p>

        <p>Cordialement,<br>
        L\'équipe Rent-A-Dream</p>
        </div>`;
        $email = (new Email())
            ->from('dev.mailing4@gmail.com')
            ->to('thomas.jallu@gmail.com'/*$companyDemand->getAuthor()->getEmail()*/)
            ->subject('Demande de création de compte entreprise')
            ->text('Votre demande a été acceptée')
            ->html($html);

        $this->mailer->send($email);
    }
}
