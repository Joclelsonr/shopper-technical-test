/*
  Warnings:

  - Added the required column `distance` to the `races` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `races` ADD COLUMN `distance` DECIMAL(65, 30) NOT NULL;
