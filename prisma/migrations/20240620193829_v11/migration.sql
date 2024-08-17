/*
  Warnings:

  - Added the required column `efectivo_gastos` to the `CorteCaja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tarjeta_gastos` to the `CorteCaja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transferencia_gastos` to the `CorteCaja` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CorteCaja` ADD COLUMN `efectivo_gastos` DOUBLE NOT NULL,
    ADD COLUMN `tarjeta_gastos` DOUBLE NOT NULL,
    ADD COLUMN `transferencia_gastos` DOUBLE NOT NULL;
