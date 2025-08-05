/*
  Warnings:

  - The primary key for the `page` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `page` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `parentId` column on the `page` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "page" DROP CONSTRAINT "page_parentId_fkey";

-- AlterTable
ALTER TABLE "page" DROP CONSTRAINT "page_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "parentId",
ADD COLUMN     "parentId" INTEGER,
ADD CONSTRAINT "page_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "page" ADD CONSTRAINT "page_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
