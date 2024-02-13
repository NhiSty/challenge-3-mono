<?php

namespace App\Processor;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpKernel\KernelInterface;

class PerformanceProcessor implements ProcessorInterface
{
    private Security $security;

    public function __construct(
        protected KernelInterface           $kernel,
        #[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')]
        private readonly ProcessorInterface $persistProcessor,
        Security                            $security
    ) {
        $this->security = $security;
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        $user = $this->security->getUser();
        if ($user === null) {
            return $data;
        }
        $companies = $user->getCompanies();
        if ($companies === null || count($companies) === 0) {
            return $data;
        }
        $data->setCompanyId($companies[0]);

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
