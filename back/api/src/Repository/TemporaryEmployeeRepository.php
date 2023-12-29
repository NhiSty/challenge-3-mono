<?php

namespace App\Repository;

use App\Entity\TemporaryEmployee;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<TemporaryEmployee>
 *
 * @method TemporaryEmployee|null find($id, $lockMode = null, $lockVersion = null)
 * @method TemporaryEmployee|null findOneBy(array $criteria, array $orderBy = null)
 * @method TemporaryEmployee[]    findAll()
 * @method TemporaryEmployee[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TemporaryEmployeeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TemporaryEmployee::class);
    }

//    /**
//     * @return TemporaryEmployee[] Returns an array of TemporaryEmployee objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('t.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?TemporaryEmployee
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
