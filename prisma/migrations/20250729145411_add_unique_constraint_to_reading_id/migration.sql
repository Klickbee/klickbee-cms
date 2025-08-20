/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `contact` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[readingId]` on the table `contact` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "contact" DROP COLUMN "updatedAt",
ADD COLUMN     "readingId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "contact_readingId_key" ON "contact"("readingId");
