-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_consultantId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "consultantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
