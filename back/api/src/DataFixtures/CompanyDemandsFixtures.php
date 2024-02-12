<?php

namespace App\DataFixtures;

use App\Entity\CompanyDemand;
use App\Entity\DemandStatus;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class CompanyDemandsFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $users = $manager->getRepository(User::class)->findAll();

        $object = (new CompanyDemand())
            ->setAddress($faker->address())
            ->setAuthor($faker->randomElement($users))
            ->setStatus(DemandStatus::PENDING)
            ->setKbis($faker->imageUrl(640, 480, 'business'))
            ->setCompanyName($faker->company())
            ->setLatitude($faker->latitude())
            ->setLongitude($faker->longitude());

        $manager->persist($object);

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
        ];
    }
}
