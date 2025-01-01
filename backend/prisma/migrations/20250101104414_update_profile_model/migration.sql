/*
  Warnings:

  - You are about to alter the column `resume` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to alter the column `profilePhoto` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Profile` MODIFY `resume` VARCHAR(191) NOT NULL,
    MODIFY `profilePhoto` VARCHAR(191) NOT NULL;
