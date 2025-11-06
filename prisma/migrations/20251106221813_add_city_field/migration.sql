/*
  Warnings:

  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" TEXT NOT NULL DEFAULT 'Não informado';

-- Remove the default after setting initial values
ALTER TABLE "User" ALTER COLUMN "city" DROP DEFAULT;
