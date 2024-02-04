<?php

namespace App\DataFixtures;

use App\Entity\Employee;
use App\Entity\Franchise;
use App\Entity\Role;
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

        for($i=0; $i<9; $i++){
            $object = (new Employee())
                ->setRole($faker->randomElement([Role::EMPLOYEE, Role::MANAGER]))
                ->setFranchiseId($franchises[$i])
                ->setUserId($users[$i]);

            $manager->persist($object);
        }

        $ceo = (new Employee())
            ->setRole(Role::CEO)
            ->setFranchiseId($franchises[9])
            ->setUserId($users[9]);

        $manager->persist($ceo);

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
