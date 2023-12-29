<?php

namespace App\DataFixtures;

use App\Entity\Booking;
use App\Entity\Company;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class BookingFixtures extends Fixture implements DependentFixtureInterface
{
    /**
     * @throws \Exception
     */
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $users = $manager->getRepository(User::class)->findAll();

        for($i=0; $i<10; $i++){
            $object = (new Booking())
                ->setDuration(new \DateInterval('PT' . $faker->randomElement(['30M', '1H', '2H', '3H'])))
                ->setStartDatetime($faker->dateTimeBetween('now', '+1 year'))
                ->setBookerId($users[$i]);

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
