<?php

namespace App\DataFixtures;

use App\Entity\Employee;
use App\Entity\Franchise;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class EmployeeFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $franchises = $manager->getRepository(Franchise::class)->findAll();
        $users = $manager->getRepository(User::class)->findAll();

        for($i=0; $i<10; $i++){
            $object = (new Employee())
                ->setRole($faker->randomElement(['CEO', 'EMPLOYEE']))
                ->setFranchiseId($franchises[$i])
                ->setUserId($users[$i]);

            $manager->persist($object);
        }

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            FranchiseFixtures::class,
            UserFixtures::class,
        ];
    }
}
