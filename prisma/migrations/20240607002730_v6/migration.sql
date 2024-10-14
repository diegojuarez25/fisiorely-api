-- AlterTable
ALTER TABLE `Ingreso` ADD COLUMN `modalidad_id` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `Modalidad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
