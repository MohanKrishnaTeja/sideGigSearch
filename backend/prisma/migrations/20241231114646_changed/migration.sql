/*
  Warnings:

  - You are about to drop the column `profilePhoto` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `resume` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Job` DROP COLUMN `profilePhoto`,
    DROP COLUMN `resume`,
    MODIFY `salary` INTEGER NOT NULL,
    MODIFY `componyLogo` VARCHAR(191) NOT NULL DEFAULT '';
