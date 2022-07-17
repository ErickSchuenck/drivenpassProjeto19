/*
  Warnings:

  - You are about to drop the column `userId` on the `credentials` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "credentials" DROP CONSTRAINT "credentials_userId_fkey";

-- AlterTable
ALTER TABLE "credentials" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
