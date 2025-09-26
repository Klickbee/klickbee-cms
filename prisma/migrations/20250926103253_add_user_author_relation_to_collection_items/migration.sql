/*
  Warnings:

  - You are about to drop the column `author` on the `collection_item` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `collection_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."collection_item" DROP COLUMN "author",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."collection_item" ADD CONSTRAINT "collection_item_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
