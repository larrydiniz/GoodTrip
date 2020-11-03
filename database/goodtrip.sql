-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema goodtrip
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema goodtrip
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `goodtrip` DEFAULT CHARACTER SET utf8 ;
USE `goodtrip` ;

-- -----------------------------------------------------
-- Table `goodtrip`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goodtrip`.`usuario` ;

CREATE TABLE IF NOT EXISTS `goodtrip`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `ativo` TINYINT NULL DEFAULT 1,
  `cadastro` DATE NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `goodtrip`.`viagem`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goodtrip`.`viagem` ;

CREATE TABLE IF NOT EXISTS `goodtrip`.`viagem` (
  `id_viagem` INT NOT NULL AUTO_INCREMENT,
  `destino` VARCHAR(70) NOT NULL,
  `inicio` DATE NOT NULL,
  `termino` DATE NOT NULL,
  `imagem` VARCHAR(200) NULL,
  `criacao` DATE NULL,
  `finalizada` TINYINT NULL DEFAULT 0,
  `fk_id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_viagem`),
  INDEX `fk_viagem_usuario_idx` (`fk_id_usuario` ASC),
  CONSTRAINT `fk_viagem_usuario`
    FOREIGN KEY (`fk_id_usuario`)
    REFERENCES `goodtrip`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `goodtrip`.`embarque`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goodtrip`.`embarque` ;

CREATE TABLE IF NOT EXISTS `goodtrip`.`embarque` (
  `id_embarque` INT NOT NULL AUTO_INCREMENT,
  `aceito` TINYINT NULL,
  `criacao` DATE NULL,
  `finalizada` TINYINT NULL,
  `fk_id_viagem` INT NOT NULL,
  `fk_id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_embarque`),
  INDEX `fk_embarque_viagem1_idx` (`fk_id_viagem` ASC),
  INDEX `fk_embarque_usuario1_idx` (`fk_id_usuario` ASC),
  CONSTRAINT `fk_embarque_viagem1`
    FOREIGN KEY (`fk_id_viagem`)
    REFERENCES `goodtrip`.`viagem` (`id_viagem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_embarque_usuario1`
    FOREIGN KEY (`fk_id_usuario`)
    REFERENCES `goodtrip`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `goodtrip`.`item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goodtrip`.`item` ;

CREATE TABLE IF NOT EXISTS `goodtrip`.`item` (
  `id_item` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `categoria` VARCHAR(45) NULL,
  `checado` TINYINT NULL DEFAULT 0,
  `ativo` TINYINT NULL DEFAULT 1,
  `criacao` DATE NULL,
  `pessoal` TINYINT NULL DEFAULT 1,
  `fk_id_usuario` INT NOT NULL,
  `fk_id_viagem` INT NOT NULL,
  PRIMARY KEY (`id_item`),
  INDEX `fk_item_usuario1_idx` (`fk_id_usuario` ASC),
  INDEX `fk_item_viagem1_idx` (`fk_id_viagem` ASC),
  CONSTRAINT `fk_item_usuario1`
    FOREIGN KEY (`fk_id_usuario`)
    REFERENCES `goodtrip`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_item_viagem1`
    FOREIGN KEY (`fk_id_viagem`)
    REFERENCES `goodtrip`.`viagem` (`id_viagem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `goodtrip`.`tarefa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `goodtrip`.`tarefa` ;

CREATE TABLE IF NOT EXISTS `goodtrip`.`tarefa` (
  `id_tarefa` INT NOT NULL AUTO_INCREMENT,
  `data` DATE NOT NULL,
  `horario` VARCHAR(6) NOT NULL,
  `titulo` VARCHAR(70) NOT NULL,
  `descricao` VARCHAR(200) NULL DEFAULT '',
  `transporte` INT NULL DEFAULT 4,
  `moeda` INT NULL DEFAULT 3,
  `custo` DOUBLE NULL DEFAULT 0.00,
  `finalizada` TINYINT NULL DEFAULT 0,
  `criacao` DATE NULL,
  `pessoal` TINYINT NULL DEFAULT 1,
  `fk_id_viagem` INT NOT NULL,
  `fk_id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_tarefa`),
  INDEX `fk_tarefa_viagem1_idx` (`fk_id_viagem` ASC),
  INDEX `fk_tarefa_usuario1_idx` (`fk_id_usuario` ASC),
  CONSTRAINT `fk_tarefa_viagem1`
    FOREIGN KEY (`fk_id_viagem`)
    REFERENCES `goodtrip`.`viagem` (`id_viagem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tarefa_usuario1`
    FOREIGN KEY (`fk_id_usuario`)
    REFERENCES `goodtrip`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
