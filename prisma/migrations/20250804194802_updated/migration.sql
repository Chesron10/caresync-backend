/*
  Warnings:

  - The values [male,female] on the enum `gender` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `address` on the `Users` table. All the data in the column will be lost.
  - Added the required column `nationality` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."maritalSatus" AS ENUM ('Married', 'Single', 'Divorced');

-- CreateEnum
CREATE TYPE "public"."doctorStatus" AS ENUM ('Available', 'Unavailable');

-- CreateEnum
CREATE TYPE "public"."allegySeverity" AS ENUM ('Mild', 'Moderate', 'Severe');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."gender_new" AS ENUM ('Male', 'Female');
ALTER TABLE "public"."Users" ALTER COLUMN "gender" TYPE "public"."gender_new" USING ("gender"::text::"public"."gender_new");
ALTER TYPE "public"."gender" RENAME TO "gender_old";
ALTER TYPE "public"."gender_new" RENAME TO "gender";
DROP TYPE "public"."gender_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Users" DROP COLUMN "address",
ADD COLUMN     "maritalSatus" "public"."maritalSatus" NOT NULL DEFAULT 'Single',
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "profileImg" TEXT;

-- CreateTable
CREATE TABLE "public"."Doctors" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "specialisation" TEXT NOT NULL,
    "hospitalAffiliation" TEXT NOT NULL,
    "profileImg" TEXT,
    "status" "public"."doctorStatus" NOT NULL DEFAULT 'Available',

    CONSTRAINT "Doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "BMI" DOUBLE PRECISION,
    "bloodPressure" DOUBLE PRECISION,
    "glucoseLevel" DOUBLE PRECISION,
    "age" INTEGER,
    "bloodGroup" TEXT,
    "inheritedDiseases" TEXT,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Allergies" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "severity" "public"."allegySeverity" NOT NULL DEFAULT 'Mild',
    "reaction" TEXT NOT NULL,

    CONSTRAINT "Allergies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctors_email_key" ON "public"."Doctors"("email");

-- AddForeignKey
ALTER TABLE "public"."Profiles" ADD CONSTRAINT "Profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Allergies" ADD CONSTRAINT "Allergies_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
