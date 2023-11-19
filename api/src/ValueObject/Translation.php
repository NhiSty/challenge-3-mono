<?php

namespace App\ValueObject;

use ApiPlatform\Metadata\ApiResource;
use App\State\TranslationProvider;

#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(),
    ],
    // normalizationContext: ['groups' => ['color:read']],
    provider: TranslationProvider::class
)]
class Translation
{
    private string $id;
    private string $key;
    private string $translation;

    public function __construct(string $id = '', string $key = '', string $translation = '')
    {
        $this->id = $id;
        $this->key = $key;
        $this->translation = $translation;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): self
    {
        $this->id = $id;
        return $this;
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
