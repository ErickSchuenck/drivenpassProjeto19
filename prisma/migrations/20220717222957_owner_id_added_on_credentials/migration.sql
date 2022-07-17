/*
  Warnings:

  - Added the required column `ownerId` to the `credentials` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "credentials" DROP CONSTRAINT "credentials_id_fkey";

-- AlterTable
ALTER TABLE "credentials" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
