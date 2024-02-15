<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Entity\Performance;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Random\RandomException;

class PerformanceFixtures extends Fixture implements DependentFixtureInterface
{
    /**
     * @throws RandomException
     */
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $companies = $manager->getRepository(Company::class)->findAll();

        for ($i = 0; $i < 10; $i++) {
            $object = (new Performance())
                ->setName($faker->word())
                ->setPrice(random_int(1, 200))
                ->setCompanyId($companies[$i]);

            $manager->persist($object);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CompanyFixtures::class,
        ];
    }
}
