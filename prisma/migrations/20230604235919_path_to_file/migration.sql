/*
  Warnings:

  - Added the required column `pathToFile` to the `Worksheet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Worksheet" ADD COLUMN     "pathToFile" TEXT NOT NULL;
