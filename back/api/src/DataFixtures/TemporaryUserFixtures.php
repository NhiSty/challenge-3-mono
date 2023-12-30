<?php

namespace App\DataFixtures;

use App\Entity\TemporaryUser;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class TemporaryUserFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        for($i=0; $i<10; $i++){
            $tempUser = new TemporaryUser();
            $tempUser
                ->setUsername($faker->userName())
                ->setFirstName($faker->firstName())
                ->setLastName($faker->lastName())
                ->setAge($faker->numberBetween(18, 99))
                ->setEmail($faker->email());

            $manager->persist($tempUser);
        }

        $manager->flush();
    }
}
