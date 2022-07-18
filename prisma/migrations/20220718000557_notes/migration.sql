-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
