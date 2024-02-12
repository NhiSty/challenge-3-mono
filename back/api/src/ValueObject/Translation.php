<?php

namespace App\ValueObject;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use App\State\TranslationProvider;

#[ApiResource(
    operations: [
        new Get(
            formats: ["json"],
        ),
    ],
    provider: TranslationProvider::class
)]

class Translation
{

    private string $key;
    private string $translation;

    public function __construct(string $id, string $key, string $translation)
    {

        $this->key = $key;
        $this->translation = $translation;
    }


    public function getKey(): string
    {
        return $this->key;
    }

    public function setKey(string $key): self
    {
        $this->key = $key;

        return $this;
    }

    public function getTranslation(): string
    {
        return $this->translation;
    }

    public function setTranslation(string $translation): self
    {
        $this->translation = $translation;

        return $this;
    }

    public function __toString(): string
    {
        return $this->translation;
    }


}
