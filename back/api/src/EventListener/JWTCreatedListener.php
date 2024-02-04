<?php

namespace App\EventListener;

use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpFoundation\RequestStack;

class JWTCreatedListener
{
    /**
     * @var RequestStack
     */
    private RequestStack $requestStack;
    private UserRepository $userRepository;

    /**
     * @param RequestStack $requestStack
     * @param UserRepository $userRepository
     */
    public function __construct(RequestStack $requestStack, UserRepository $userRepository)
    {
        $this->requestStack = $requestStack;
        $this->userRepository = $userRepository;
    }

    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        $request = $this->requestStack->getCurrentRequest();
        $user = $this->userRepository->findOneBy(['email' => $event->getUser()->getUserIdentifier()]);
        $id = $user->getId();

        $payload = $event->getData();
        $payload['id'] = $id;

        $event->setData($payload);
    }
}
