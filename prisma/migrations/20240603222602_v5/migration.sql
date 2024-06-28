-- AlterTable
ALTER TABLE `Consulta` MODIFY `fecha_actualizacion` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Gasto` MODIFY `fecha_actualizacion` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Ingreso` MODIFY `fecha_actualizacion` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Paciente` MODIFY `fecha_actualizacion` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `CorteCaja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_fin` DATETIME(3) NOT NULL,
    `total_ingresos` DOUBLE NOT NULL,
    `total_gastos` DOUBLE NOT NULL,
    `efectivo` DOUBLE NOT NULL,
    `transferencia` DOUBLE NOT NULL,
    `tarjeta` DOUBLE NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NULL,
    `usuario_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CorteCaja` ADD CONSTRAINT `CorteCaja_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
