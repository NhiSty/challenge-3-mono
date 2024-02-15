<?php

namespace App\DataFixtures;

use App\Entity\Booking;
use App\Entity\Review;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class ReviewFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $bookings = $manager->getRepository(Booking::class)->findAll();

        for($i=0; $i<10; $i++){
            $object = (new Review())
                ->setReviewContent($faker->text)
                ->setBooking($faker->randomElement($bookings));

            $manager->persist($object);
        }

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            BookingFixtures::class,
        ];
    }
}
