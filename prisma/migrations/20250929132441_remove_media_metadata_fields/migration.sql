/*
  Warnings:

  - You are about to drop the column `height` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `media` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."media" DROP COLUMN "height",
DROP COLUMN "size",
DROP COLUMN "type",
DROP COLUMN "width";
