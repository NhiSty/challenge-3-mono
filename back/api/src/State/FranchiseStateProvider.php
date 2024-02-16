<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use Symfony\Bundle\SecurityBundle\Security;

class FranchiseStateProvider implements ProviderInterface
{
    private Security $security;
    public function __construct(private ProviderInterface $provider, Security $security)
    {
        $this->security = $security;
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $roles = $this->security->getUser()->getRoles();
        $franchises = $this->provider->provide($operation, $uriVariables, $context)->getQuery()->getResult();
        if (in_array('ROLE_ADMIN', $roles)) {
            return $franchises;
        } else if (in_array('ROLE_MANAGER', $roles)) {
            $companies = $this->security->getUser()->getCompanies();

            foreach ($companies as $company) {
                return $company->getFranchises();
            }
        }

        return [];
    }
}
