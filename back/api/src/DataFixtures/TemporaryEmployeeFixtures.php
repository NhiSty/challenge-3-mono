<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Entity\TemporaryEmployee;
use App\Entity\TemporaryUser;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class TemporaryEmployeeFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $tempUsers = $manager->getRepository(TemporaryUser::class)->findAll();
        $companys = $manager->getRepository(Company::class)->findAll();

        for($i=0; $i<10; $i++){
            $object = new TemporaryEmployee();
            $object
                ->setUserId($tempUsers[$i])
                ->setRole($faker->randomElement(['CEO', 'EMPLOYEE']))
                ->setCompanyId($companys[$i]);

            $manager->persist($object);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            TemporaryUserFixtures::class,
            CompanyFixtures::class,
        ];
    }
}
