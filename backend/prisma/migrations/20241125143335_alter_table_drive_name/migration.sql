/*
  Warnings:

  - You are about to drop the column `userId` on the `races` table. All the data in the column will be lost.
  - Added the required column `driverName` to the `races` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `races` DROP FOREIGN KEY `races_userId_fkey`;

-- AlterTable
ALTER TABLE `races` DROP COLUMN `userId`,
    ADD COLUMN `customerId` INTEGER NULL,
    ADD COLUMN `driverName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `races` ADD CONSTRAINT `races_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
