/*
  Warnings:

  - Added the required column `updatedAt` to the `Distribution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `distribution` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
