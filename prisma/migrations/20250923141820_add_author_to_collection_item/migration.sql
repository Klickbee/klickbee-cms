/*
  Warnings:

  - Added the required column `author` to the `collection_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."collection_item" ADD COLUMN     "author" TEXT NOT NULL;
