-- DropForeignKey
ALTER TABLE `races` DROP FOREIGN KEY `races_driverId_fkey`;

-- AddForeignKey
ALTER TABLE `races` ADD CONSTRAINT `races_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
