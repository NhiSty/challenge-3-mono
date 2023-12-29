<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Entity\Franchise;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class FranchiseFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $companys = $manager->getRepository(Company::class)->findAll();

        for($i=0; $i<10; $i++){
            $object = (new Franchise())
                ->setFranchiseName($faker->company)
                ->setCompanyId($companys[$i]);

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
