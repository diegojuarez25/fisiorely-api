-- AlterTable
ALTER TABLE `Consulta` ADD COLUMN `modalidad_id` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `Consulta` ADD CONSTRAINT `Consulta_modalidad_id_fkey` FOREIGN KEY (`modalidad_id`) REFERENCES `Modalidad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
