/*
  Warnings:

  - The `severity` column on the `Allergies` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."severity" AS ENUM ('Mild', 'Moderate', 'Severe');

-- CreateEnum
CREATE TYPE "public"."healthTipCategory" AS ENUM ('Diet', 'Exercise', 'Mental');

-- AlterTable
ALTER TABLE "public"."Allergies" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "severity",
ADD COLUMN     "severity" "public"."severity" NOT NULL DEFAULT 'Mild';

-- AlterTable
ALTER TABLE "public"."Doctors" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."Profiles" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."Users" ADD COLUMN     "cityOrTown" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "street" TEXT,
ALTER COLUMN "maritalSatus" DROP NOT NULL,
ALTER COLUMN "nationality" DROP NOT NULL;

-- DropEnum
DROP TYPE "public"."allegySeverity";

-- CreateTable
CREATE TABLE "public"."Reports" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "symptoms" TEXT[],
    "descriptions" TEXT[],
    "doctorId" TEXT NOT NULL,
    "userFeedback" TEXT,
    "status" "public"."severity" NOT NULL DEFAULT 'Mild',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tests" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateConducted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "files" TEXT[],
    "result" TEXT,
    "conductedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Prescriptions" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "medicineName" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "quantity" INTEGER,
    "duration" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prescriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HealthTips" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "category" "public"."healthTipCategory",
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "targetDemography" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HealthTips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OneTimeCode" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OneTimeCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OneTimePassword" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "password" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OneTimePassword_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Reports" ADD CONSTRAINT "Reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tests" ADD CONSTRAINT "Tests_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."Reports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Prescriptions" ADD CONSTRAINT "Prescriptions_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."Reports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HealthTips" ADD CONSTRAINT "HealthTips_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "public"."Doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OneTimeCode" ADD CONSTRAINT "OneTimeCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OneTimePassword" ADD CONSTRAINT "OneTimePassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
