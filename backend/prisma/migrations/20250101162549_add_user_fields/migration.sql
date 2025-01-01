/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_JobRequirements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserSkills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `_JobRequirements` DROP FOREIGN KEY `_JobRequirements_A_fkey`;

-- DropForeignKey
ALTER TABLE `_JobRequirements` DROP FOREIGN KEY `_JobRequirements_B_fkey`;

-- DropForeignKey
ALTER TABLE `_UserSkills` DROP FOREIGN KEY `_UserSkills_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserSkills` DROP FOREIGN KEY `_UserSkills_B_fkey`;

-- AlterTable
ALTER TABLE `Job` ADD COLUMN `requirements` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `bio` VARCHAR(191) NULL,
    ADD COLUMN `experience` VARCHAR(191) NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL,
    ADD COLUMN `skills` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Profile`;

-- DropTable
DROP TABLE `Skill`;

-- DropTable
DROP TABLE `_JobRequirements`;

-- DropTable
DROP TABLE `_UserSkills`;
