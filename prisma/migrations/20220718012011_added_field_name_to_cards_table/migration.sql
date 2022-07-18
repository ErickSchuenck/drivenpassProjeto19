/*
  Warnings:

  - Added the required column `name` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "name" TEXT NOT NULL;
