-- DropForeignKey
ALTER TABLE "page" DROP CONSTRAINT "page_parentId_fkey";

-- AddForeignKey
ALTER TABLE "page" ADD CONSTRAINT "page_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
