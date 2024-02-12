<?php

namespace App\DataFixtures;

use App\Entity\Availability;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AvailabilityFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $users = $manager->getRepository(User::class)->findAll();

        for($i=0; $i<10; $i++){
            $object = (new Availability())
                ->setWeekDay($faker->randomElement(["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]))
                ->setStartTime($faker->dateTimeBetween('08:00', '12:00'))
                ->setEndTime($faker->dateTimeBetween('13:00', '18:00'))
                ->setUser($users[$i]);

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
