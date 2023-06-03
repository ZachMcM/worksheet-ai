/*
  Warnings:

  - You are about to drop the column `name` on the `Worksheet` table. All the data in the column will be lost.
  - Added the required column `stringData` to the `Worksheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Worksheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Worksheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `Worksheet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Worksheet" DROP COLUMN "name",
ADD COLUMN     "stringData" TEXT NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "topic" TEXT NOT NULL;
