/*
  Warnings:

  - The primary key for the `contact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `readingId` on the `contact` table. All the data in the column will be lost.
  - The `id` column on the `contact` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "contact_readingId_key";

-- AlterTable
ALTER TABLE "contact" DROP CONSTRAINT "contact_pkey",
DROP COLUMN "readingId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "contact_pkey" PRIMARY KEY ("id");
