-- CreateEnum
CREATE TYPE "public"."MediaCategory" AS ENUM ('DOCUMENT', 'IMAGE', 'VIDEO');

-- CreateTable
CREATE TABLE "public"."media" (
    "id" SERIAL NOT NULL,
    "altText" TEXT,
    "caption" TEXT,
    "category" "public"."MediaCategory" NOT NULL,
    "description" TEXT,
    "fileName" TEXT NOT NULL,
    "height" INTEGER,
    "size" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."media" ADD CONSTRAINT "media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
