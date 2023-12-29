<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231028130406 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE franchise_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE franchise (id INT NOT NULL, company_id_id INT DEFAULT NULL, building_name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_66F6CE2A38B53C32 ON franchise (company_id_id)');
        $this->addSql('ALTER TABLE franchise ADD CONSTRAINT FK_66F6CE2A38B53C32 FOREIGN KEY (company_id_id) REFERENCES company (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE franchise_id_seq CASCADE');
        $this->addSql('ALTER TABLE franchise DROP CONSTRAINT FK_66F6CE2A38B53C32');
        $this->addSql('DROP TABLE franchise');
    }
}
