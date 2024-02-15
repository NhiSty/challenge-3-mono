<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $passwordHasher)
    {

    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        // PWD = test123!
        $pwd = '$2y$13$Fs05Q7OWSMIj6ZwxXitCiu9m5fmqp35aSrMNmlV0xND1rY6DnPWUO';

        $user = new User();
        $user
            ->setEmail('test@gmail.com')
            ->setPassword($pwd)
            ->setRoles(['ROLE_USER'])
            ->setFirstName($faker->firstName())
            ->setLastName($faker->lastName())
            ->setAge($faker->numberBetween(18, 64))
            ->setBiography($faker->text(100))
            ->setUsername($faker->userName());

        $manager->persist($user);

        $admin = new User();
        $admin
            ->setEmail('admin@gmail.com')
            ->setPassword($pwd)
            ->setRoles(['ROLE_ADMIN'])
            ->setFirstName($faker->firstName())
            ->setLastName($faker->lastName())
            ->setAge($faker->numberBetween(18, 64))
            ->setBiography($faker->text(100))
            ->setUsername($faker->userName());

        $password = $this->passwordHasher->hashPassword($user, 'test123!');

        $user = new User();
        $user
            ->setEmail('user@gmail.com')
            ->setPassword($password)
            ->setRoles(['ROLE_USER'])
            ->setFirstName($faker->firstName())
            ->setLastName($faker->lastName())
            ->setAge($faker->numberBetween(18, 64))
            ->setBiography($faker->text(100))
            ->setUsername($faker->userName());

        $manager->persist($admin);
        $manager->persist($user);

        for ($i = 0; $i < 10; $i++) {
            $user = new User();

            $user
                ->setEmail($faker->email())
                ->setPassword($pwd)
                ->setRoles($faker->randomElement([['ROLE_USER'], ['ROLE_MANAGER']]))
                ->setRoles($faker->randomElement([['ROLE_USER'], ['ROLE_ADMIN']]))
                ->setFirstName($faker->firstName())
                ->setLastName($faker->lastName())
                ->setAge($faker->numberBetween(18, 64))
                ->setUsername($faker->userName())
                ->setBiography($faker->text(100));

            $manager->persist($user);
        }

        $manager->flush();
    }
}
