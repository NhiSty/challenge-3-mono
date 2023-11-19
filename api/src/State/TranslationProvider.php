<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use ApiPlatform\Metadata\CollectionOperationInterface;
use App\ValueObject\Translation;
use Symfony\Component\HttpKernel\KernelInterface;

class TranslationProvider implements ProviderInterface
{
    const TRANSLATION_PATH = 'var/uploads/translations.json';

    public function __construct(
        protected KernelInterface $kernel,
    ) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        if ($operation instanceof CollectionOperationInterface) {
            return [new Translation(), new Translation()];
        }

        return new Translation($uriVariables['id']) ?? null;
    }


    protected function getTranslationData(): array
    {
        $result = [];
        $filePath = $this->kernel->getProjectDir() . self::TRANSLATION_PATH;

        $file = fopen($filePath, 'rb');
        while (($line = fgets($file)) !== false) {
            $result[] = json_decode($line, true);
        }
        fclose($file);

        return $result;
    }

    protected function getCollection(array $content, CollectionOperationInterface $operation, array $uriVariables, array $context): array
    {
        $page = $context['filters']['page'] ?? 1;
        $perPage = $operation->getPaginationItemsPerPage() ?? $operation->getPaginationClientItemsPerPage() ?? 30;
        $offset = $perPage * ((int) $page - 1);

        return array_slice($content, $offset, $perPage);
    }
}
