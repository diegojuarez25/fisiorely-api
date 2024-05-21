-- CreateTable
CREATE TABLE `Usuario` (
    `cveUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(200) NOT NULL,
    `apellidos` VARCHAR(500) NOT NULL,
    `username` VARCHAR(150) NOT NULL,
    `password` VARCHAR(1000) NOT NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`cveUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
