/*
  Warnings:

  - You are about to drop the column `description` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `content` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "content" TEXT NOT NULL;
