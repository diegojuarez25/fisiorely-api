-- AddForeignKey
ALTER TABLE `Ingreso` ADD CONSTRAINT `Ingreso_modalidad_id_fkey` FOREIGN KEY (`modalidad_id`) REFERENCES `Modalidad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
