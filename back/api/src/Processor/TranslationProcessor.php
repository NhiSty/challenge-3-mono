<?php

namespace App\Processor;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\State\TranslationProvider;
use App\ValueObject\Translation;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\String\Slugger\AsciiSlugger;

class TranslationProcessor implements ProcessorInterface
{
    public function __construct(
        protected KernelInterface $kernel,
    ) {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
        if (
            !$data instanceof Translation

        ) {
            return;
        }

        $slugger = new AsciiSlugger();
        $slug = $slugger->slug($data->getKey())->snake()->toString();
        $data->setId($slug);

        $data = [$data->getId(), $data->setTranslation('test')];
        $this->writeInFile($data);
    }

    protected function writeInFile(array $data): void
    {
        $filePath = $this->kernel->getProjectDir() . TranslationProvider::TRANSLATION_PATH;
        $file = fopen($filePath, 'wb');
        fwrite($file, json_encode($data) . PHP_EOL);
    }
}
