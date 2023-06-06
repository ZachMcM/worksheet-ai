/*
  Warnings:

  - Added the required column `numStars` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "numStars" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
