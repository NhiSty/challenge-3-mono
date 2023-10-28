<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231028131855 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE picture_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE temporary_employee_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE temporary_user_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE picture (id INT NOT NULL, owner_id INT DEFAULT NULL, path VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_16DB4F897E3C61F9 ON picture (owner_id)');
        $this->addSql('CREATE TABLE temporary_employee (id INT NOT NULL, user_id_id INT NOT NULL, company_id_id INT NOT NULL, role VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9E95918B9D86650F ON temporary_employee (user_id_id)');
        $this->addSql('CREATE INDEX IDX_9E95918B38B53C32 ON temporary_employee (company_id_id)');
        $this->addSql('CREATE TABLE temporary_user (id INT NOT NULL, username VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, age INT NOT NULL, email VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_DACDCB0EF85E0677 ON temporary_user (username)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_DACDCB0EE7927C74 ON temporary_user (email)');
        $this->addSql('ALTER TABLE picture ADD CONSTRAINT FK_16DB4F897E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE temporary_employee ADD CONSTRAINT FK_9E95918B9D86650F FOREIGN KEY (user_id_id) REFERENCES temporary_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE temporary_employee ADD CONSTRAINT FK_9E95918B38B53C32 FOREIGN KEY (company_id_id) REFERENCES company (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE picture_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE temporary_employee_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE temporary_user_id_seq CASCADE');
        $this->addSql('ALTER TABLE picture DROP CONSTRAINT FK_16DB4F897E3C61F9');
        $this->addSql('ALTER TABLE temporary_employee DROP CONSTRAINT FK_9E95918B9D86650F');
        $this->addSql('ALTER TABLE temporary_employee DROP CONSTRAINT FK_9E95918B38B53C32');
        $this->addSql('DROP TABLE picture');
        $this->addSql('DROP TABLE temporary_employee');
        $this->addSql('DROP TABLE temporary_user');
    }
}
