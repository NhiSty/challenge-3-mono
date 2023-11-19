<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Entity\Override;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class OverrideFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $users = $manager->getRepository(User::class)->findAll();

        for($i=0; $i<10; $i++){
            $object = (new Override())
                ->setDate($faker->dateTimeBetween('now', '+1 year'))
                ->setStartTime($faker->dateTimeBetween('now', '+1 year'))
                ->setEndTime($faker->dateTimeBetween('now', '+1 year'))
                ->setUserId($users[$i]);

            $manager->persist($object);
        }

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
        ];
    }
}
