-- CreateEnum
CREATE TYPE "cardTypes" AS ENUM ('CREDIT', 'DEBIT', 'BOTH');

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "cvc" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_virtual" BOOLEAN NOT NULL,
    "type" "cardTypes" NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
