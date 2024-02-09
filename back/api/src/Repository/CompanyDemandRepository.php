<?php

namespace App\Repository;

use App\Entity\CompanyDemand;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CompanyDemand>
 *
 * @method CompanyDemand|null find($id, $lockMode = null, $lockVersion = null)
 * @method CompanyDemand|null findOneBy(array $criteria, array $orderBy = null)
 * @method CompanyDemand[]    findAll()
 * @method CompanyDemand[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CompanyDemandRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CompanyDemand::class);
    }

//    /**
//     * @return CompanyDemand[] Returns an array of CompanyDemand objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CompanyDemand
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
