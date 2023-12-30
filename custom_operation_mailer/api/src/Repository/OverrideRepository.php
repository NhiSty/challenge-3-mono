<?php

namespace App\Repository;

use App\Entity\Override;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Override>
 *
 * @method Override|null find($id, $lockMode = null, $lockVersion = null)
 * @method Override|null findOneBy(array $criteria, array $orderBy = null)
 * @method Override[]    findAll()
 * @method Override[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OverrideRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Override::class);
    }

//    /**
//     * @return Override[] Returns an array of Override objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('o.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Override
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
