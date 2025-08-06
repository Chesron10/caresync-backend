/*
  Warnings:

  - You are about to drop the column `profileId` on the `Allergies` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Allergies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Allergies" DROP CONSTRAINT "Allergies_profileId_fkey";

-- AlterTable
ALTER TABLE "public"."Allergies" DROP COLUMN "profileId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Allergies" ADD CONSTRAINT "Allergies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
