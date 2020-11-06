-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema goodtrip
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema goodtrip
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `goodtrip` DEFAULT CHARACTER SET utf8 ;
USE `goodtrip` ;

-- -----------------------------------------------------
-- Table `goodtrip`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goodtrip`.`usuarios` ;

CREATE TABLE IF NOT EXISTS `goodtrip`.`usuarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `ativo` TINYINT(4) NULL DEFAULT '1',
  `email` VARCHAR(255) NOT NULL,
  `nome` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `foto` VARCHAR(200) NULL,
  `username` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `goodtrip`.`viagens`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goodtrip`.`viagens` ;

CREATE TABLE IF NOT EXISTS `goodtrip`.`viagens` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `destino` VARCHAR(255) NOT NULL,
  `finalizada` TINYINT(4) NULL DEFAULT '0',
  `inicio` DATE NOT NULL,
  `termino` DATE NOT NULL,
  `imagem` VARCHAR(200) NULL,
  `fk_id_usuario` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK6p58i5iuj4b40w1eqdh9kv011` (`fk_id_usuario` ASC),
  CONSTRAINT `FK6p58i5iuj4b40w1eqdh9kv011`
    FOREIGN KEY (`fk_id_usuario`)
    REFERENCES `goodtrip`.`usuarios` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `goodtrip`.`embarques`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goodtrip`.`embarques` ;

CREATE TABLE IF NOT EXISTS `goodtrip`.`embarques` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `aceito` TINYINT(4) NULL DEFAULT NULL,
  `finalizada` TINYINT(4) NULL DEFAULT NULL,
  `fk_id_usuario` INT(11) NOT NULL,
  `fk_id_viagem` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKhh97iaa9efxigmspd5uad2oe6` (`fk_id_viagem` ASC),
  INDEX `FKhj2x3lr0kmgxq9pnfl9ev81j7` (`fk_id_usuario` ASC),
  CONSTRAINT `FKhh97iaa9efxigmspd5uad2oe6`
    FOREIGN KEY (`fk_id_viagem`)
    REFERENCES `goodtrip`.`viagens` (`id`),
  CONSTRAINT `FKhj2x3lr0kmgxq9pnfl9ev81j7`
    FOREIGN KEY (`fk_id_usuario`)
    REFERENCES `goodtrip`.`usuarios` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `goodtrip`.`itens`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goodtrip`.`itens` ;

CREATE TABLE IF NOT EXISTS `goodtrip`.`itens` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `ativo` TINYINT(4) NULL DEFAULT '1',
  `categoria` INT(11) NULL DEFAULT NULL,
  `checado` TINYINT(4) NULL DEFAULT '0',
  `nome` VARCHAR(255) NOT NULL,
  `pessoal` TINYINT(4) NULL DEFAULT '1',
  `fk_id_usuario` INT(11) NOT NULL,
  `fk_id_viagem` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKlbwvgc81yv312nidaxlca24ox` (`fk_id_viagem` ASC),
  INDEX `FKqn2d5q0jqiqhelu7cx99ac0lp` (`fk_id_usuario` ASC),
  CONSTRAINT `FKlbwvgc81yv312nidaxlca24ox`
    FOREIGN KEY (`fk_id_viagem`)
    REFERENCES `goodtrip`.`viagens` (`id`),
  CONSTRAINT `FKqn2d5q0jqiqhelu7cx99ac0lp`
    FOREIGN KEY (`fk_id_usuario`)
    REFERENCES `goodtrip`.`usuarios` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `goodtrip`.`tarefas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goodtrip`.`tarefas` ;

CREATE TABLE IF NOT EXISTS `goodtrip`.`tarefas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `custo` FLOAT NULL DEFAULT '0',
  `data` DATE NOT NULL,
  `descricao` VARCHAR(255) NULL DEFAULT '',
  `finalizada` TINYINT(4) NULL DEFAULT '0',
  `horario` TIME NOT NULL,
  `moeda` INT(11) NULL DEFAULT '3',
  `pessoal` TINYINT(4) NULL DEFAULT '1',
  `titulo` VARCHAR(255) NOT NULL,
  `transporte` INT(11) NULL DEFAULT '4',
  `fk_id_usuario` INT(11) NOT NULL,
  `fk_id_viagem` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKhh9s0olp44wkqppxjblsdjiod` (`fk_id_usuario` ASC),
  INDEX `FKsrf2pduwxv6mvhdyhsylrt2tm` (`fk_id_viagem` ASC),
  CONSTRAINT `FKhh9s0olp44wkqppxjblsdjiod`
    FOREIGN KEY (`fk_id_usuario`)
    REFERENCES `goodtrip`.`usuarios` (`id`),
  CONSTRAINT `FKsrf2pduwxv6mvhdyhsylrt2tm`
    FOREIGN KEY (`fk_id_viagem`)
    REFERENCES `goodtrip`.`viagens` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
