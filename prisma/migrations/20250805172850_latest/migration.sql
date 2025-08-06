/*
  Warnings:

  - Added the required column `expiresAt` to the `OneTimeCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `OneTimePassword` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."OneTimeCode" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."OneTimePassword" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
