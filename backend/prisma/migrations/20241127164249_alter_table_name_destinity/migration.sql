/*
  Warnings:

  - You are about to drop the column `distanceKm` on the `races` table. All the data in the column will be lost.
  - Added the required column `destinyName` to the `races` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `races` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originName` to the `races` table without a default value. This is not possible if the table is not empty.
  - Made the column `customerId` on table `races` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `races` DROP FOREIGN KEY `races_customerId_fkey`;

-- DropIndex
DROP INDEX `races_driverId_fkey` ON `races`;

-- AlterTable
ALTER TABLE `races` DROP COLUMN `distanceKm`,
    ADD COLUMN `destinyName` VARCHAR(191) NOT NULL,
    ADD COLUMN `duration` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `originName` VARCHAR(191) NOT NULL,
    MODIFY `customerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `races` ADD CONSTRAINT `races_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
