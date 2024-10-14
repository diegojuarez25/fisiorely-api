/*
  Warnings:

  - You are about to drop the column `fecha_fin` on the `Consulta` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_inicio` on the `Consulta` table. All the data in the column will be lost.
  - Added the required column `persona_que_atendio` to the `Consulta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Consulta` DROP COLUMN `fecha_fin`,
    DROP COLUMN `fecha_inicio`,
    ADD COLUMN `persona_que_atendio` VARCHAR(191) NOT NULL;
