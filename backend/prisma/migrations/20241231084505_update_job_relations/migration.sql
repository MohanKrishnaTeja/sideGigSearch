/*
  Warnings:

  - You are about to alter the column `salary` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Job` ADD COLUMN `profilePhoto` VARCHAR(191) NULL,
    ADD COLUMN `resume` VARCHAR(191) NULL,
    MODIFY `salary` DOUBLE NOT NULL,
    ALTER COLUMN `componyLogo` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Profile` MODIFY `resume` LONGBLOB NOT NULL,
    MODIFY `profilePhoto` LONGBLOB NOT NULL;
