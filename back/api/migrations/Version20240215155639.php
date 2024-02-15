<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240215155639 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE availability_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE booking_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE company_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE company_demand_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE employee_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE franchise_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE override_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE performance_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE picture_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE report_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE review_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE availability (id INT NOT NULL, user_id_id INT NOT NULL, week_day VARCHAR(255) NOT NULL, start_time TIME(0) WITHOUT TIME ZONE NOT NULL, end_time TIME(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_3FB7A2BF9D86650F ON availability (user_id_id)');
        $this->addSql('CREATE TABLE booking (id INT NOT NULL, booker_id_id INT NOT NULL, booked_id_id INT NOT NULL, performance_id INT NOT NULL, duration VARCHAR(255) NOT NULL, start_datetime TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E00CEDDE2508AA37 ON booking (booker_id_id)');
        $this->addSql('CREATE INDEX IDX_E00CEDDE210603C3 ON booking (booked_id_id)');
        $this->addSql('CREATE INDEX IDX_E00CEDDEB91ADEEE ON booking (performance_id)');
        $this->addSql('COMMENT ON COLUMN booking.duration IS \'(DC2Type:dateinterval)\'');
        $this->addSql('CREATE TABLE company (id INT NOT NULL, owner_id INT DEFAULT NULL, company_name VARCHAR(255) NOT NULL, status BOOLEAN NOT NULL, kbis TEXT NOT NULL, address VARCHAR(255) NOT NULL, latitude DOUBLE PRECISION DEFAULT NULL, longitude DOUBLE PRECISION DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_4FBF094F7E3C61F9 ON company (owner_id)');
        $this->addSql('CREATE TABLE company_demand (id INT NOT NULL, author_id INT NOT NULL, company_name VARCHAR(255) NOT NULL, kbis TEXT DEFAULT NULL, status VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, latitude DOUBLE PRECISION NOT NULL, longitude DOUBLE PRECISION NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_7F121D06F675F31B ON company_demand (author_id)');
        $this->addSql('CREATE TABLE employee (id INT NOT NULL, franchise_id_id INT NOT NULL, user_id_id INT NOT NULL, role VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5D9F75A1EA39FCC8 ON employee (franchise_id_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5D9F75A19D86650F ON employee (user_id_id)');
        $this->addSql('CREATE TABLE franchise (id INT NOT NULL, company_id_id INT DEFAULT NULL, franchise_name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_66F6CE2A38B53C32 ON franchise (company_id_id)');
        $this->addSql('CREATE TABLE override (id INT NOT NULL, user_id_id INT NOT NULL, date DATE NOT NULL, start_time TIME(0) WITHOUT TIME ZONE NOT NULL, end_time TIME(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_820306E59D86650F ON override (user_id_id)');
        $this->addSql('CREATE TABLE performance (id INT NOT NULL, company_id_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, price VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_82D7968138B53C32 ON performance (company_id_id)');
        $this->addSql('CREATE TABLE picture (id INT NOT NULL, owner_id INT DEFAULT NULL, path TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_16DB4F897E3C61F9 ON picture (owner_id)');
        $this->addSql('CREATE TABLE report (id INT NOT NULL, reporter_id INT NOT NULL, reportee_id INT NOT NULL, report_content TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_C42F7784E1CFE6F5 ON report (reporter_id)');
        $this->addSql('CREATE INDEX IDX_C42F77842C0189D3 ON report (reportee_id)');
        $this->addSql('CREATE TABLE review (id INT NOT NULL, booking_id INT NOT NULL, review_content TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_794381C63301C60 ON review (booking_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, age INT DEFAULT NULL, biography TEXT DEFAULT NULL, is_first_connection BOOLEAN DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('ALTER TABLE availability ADD CONSTRAINT FK_3FB7A2BF9D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDE2508AA37 FOREIGN KEY (booker_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDE210603C3 FOREIGN KEY (booked_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDEB91ADEEE FOREIGN KEY (performance_id) REFERENCES performance (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE company ADD CONSTRAINT FK_4FBF094F7E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE company_demand ADD CONSTRAINT FK_7F121D06F675F31B FOREIGN KEY (author_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE employee ADD CONSTRAINT FK_5D9F75A1EA39FCC8 FOREIGN KEY (franchise_id_id) REFERENCES franchise (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE employee ADD CONSTRAINT FK_5D9F75A19D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE franchise ADD CONSTRAINT FK_66F6CE2A38B53C32 FOREIGN KEY (company_id_id) REFERENCES company (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE override ADD CONSTRAINT FK_820306E59D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE performance ADD CONSTRAINT FK_82D7968138B53C32 FOREIGN KEY (company_id_id) REFERENCES company (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE picture ADD CONSTRAINT FK_16DB4F897E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report ADD CONSTRAINT FK_C42F7784E1CFE6F5 FOREIGN KEY (reporter_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report ADD CONSTRAINT FK_C42F77842C0189D3 FOREIGN KEY (reportee_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C63301C60 FOREIGN KEY (booking_id) REFERENCES booking (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE availability_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE booking_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE company_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE company_demand_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE employee_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE franchise_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE override_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE performance_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE picture_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE report_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE review_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('ALTER TABLE availability DROP CONSTRAINT FK_3FB7A2BF9D86650F');
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT FK_E00CEDDE2508AA37');
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT FK_E00CEDDE210603C3');
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT FK_E00CEDDEB91ADEEE');
        $this->addSql('ALTER TABLE company DROP CONSTRAINT FK_4FBF094F7E3C61F9');
        $this->addSql('ALTER TABLE company_demand DROP CONSTRAINT FK_7F121D06F675F31B');
        $this->addSql('ALTER TABLE employee DROP CONSTRAINT FK_5D9F75A1EA39FCC8');
        $this->addSql('ALTER TABLE employee DROP CONSTRAINT FK_5D9F75A19D86650F');
        $this->addSql('ALTER TABLE franchise DROP CONSTRAINT FK_66F6CE2A38B53C32');
        $this->addSql('ALTER TABLE override DROP CONSTRAINT FK_820306E59D86650F');
        $this->addSql('ALTER TABLE performance DROP CONSTRAINT FK_82D7968138B53C32');
        $this->addSql('ALTER TABLE picture DROP CONSTRAINT FK_16DB4F897E3C61F9');
        $this->addSql('ALTER TABLE report DROP CONSTRAINT FK_C42F7784E1CFE6F5');
        $this->addSql('ALTER TABLE report DROP CONSTRAINT FK_C42F77842C0189D3');
        $this->addSql('ALTER TABLE review DROP CONSTRAINT FK_794381C63301C60');
        $this->addSql('DROP TABLE availability');
        $this->addSql('DROP TABLE booking');
        $this->addSql('DROP TABLE company');
        $this->addSql('DROP TABLE company_demand');
        $this->addSql('DROP TABLE employee');
        $this->addSql('DROP TABLE franchise');
        $this->addSql('DROP TABLE override');
        $this->addSql('DROP TABLE performance');
        $this->addSql('DROP TABLE picture');
        $this->addSql('DROP TABLE report');
        $this->addSql('DROP TABLE review');
        $this->addSql('DROP TABLE "user"');
    }
}
