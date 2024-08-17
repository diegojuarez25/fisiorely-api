/*
  Warnings:

  - You are about to drop the column `usuario_id` on the `Consulta` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Consulta` DROP FOREIGN KEY `Consulta_usuario_id_fkey`;

-- AlterTable
ALTER TABLE `Consulta` DROP COLUMN `usuario_id`;
