/*
  Warnings:

  - Added the required column `title` to the `Transcript` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transcript" ADD COLUMN     "title" TEXT NOT NULL;
