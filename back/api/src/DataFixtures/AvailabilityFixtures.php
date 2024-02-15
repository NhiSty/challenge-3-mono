<?php

namespace App\DataFixtures;

use App\Entity\Availability;
use App\Entity\User;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AvailabilityFixtures extends Fixture implements DependentFixtureInterface
{
    /**
     * @throws \Exception
     */
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $users = $manager->getRepository(User::class)->findAll();

        for ($i = 0; $i < 10; $i++) {
            $object = (new Availability())
                ->setWeekDay($faker->randomElement(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]))
                ->setStartTime(new DateTime("09:00:00"))
                ->setEndTime(new DateTime("18:00:00"))
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
