CREATE SCHEMA IF NOT EXISTS 'scoreboard' DEFAULT CHARACTER SET utf8 ;
USE `scoreboard` ;

-- -----------------------------------------------------
-- Table `scoreboard`.`MC`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scoreboard`.`MC` (
  `idMC` INT NOT NULL,
  `MC_name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idMC`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scoreboard`.`LC`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scoreboard`.`LC` (
  `idLC` INT NOT NULL,
  `LC_name` VARCHAR(45) NULL,
  `MC_idMC` INT NOT NULL,
  PRIMARY KEY (`idLC`, `MC_idMC`),
  INDEX `fk_LC_MC_idx` (`MC_idMC` ASC),
  CONSTRAINT `fk_LC_MC`
    FOREIGN KEY (`MC_idMC`)
    REFERENCES `scoreboard`.`MC` (`idMC`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scoreboard`.`program`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scoreboard`.`program` (
  `idprogram` INT NOT NULL,
  `name` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idprogram`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scoreboard`.`operation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scoreboard`.`operation` (
  `month` INT NOT NULL,
  `year` INT NOT NULL,
  `operationcol` VARCHAR(45) NOT NULL,
  `LC_idLC` INT NOT NULL,
  `program_idprogram` INT NOT NULL,
  `app_plan` INT NOT NULL,
  `app_ach` INT NOT NULL,
  `re_plan` INT NOT NULL,
  `re_ach` INT NOT NULL,
  PRIMARY KEY (`month`, `LC_idLC`, `program_idprogram`),
  INDEX `fk_operation_LC1_idx` (`LC_idLC` ASC),
  INDEX `fk_operation_program1_idx` (`program_idprogram` ASC),
  CONSTRAINT `fk_operation_LC1`
    FOREIGN KEY (`LC_idLC`)
    REFERENCES `scoreboard`.`LC` (`idLC`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_operation_program1`
    FOREIGN KEY (`program_idprogram`)
    REFERENCES `scoreboard`.`program` (`idprogram`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;





