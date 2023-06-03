/*
  Warnings:

  - You are about to drop the `FlashCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FlashCardSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `McTest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WrittenTest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FlashCard" DROP CONSTRAINT "FlashCard_flashCardSetId_fkey";

-- DropForeignKey
ALTER TABLE "FlashCardSet" DROP CONSTRAINT "FlashCardSet_userId_fkey";

-- DropForeignKey
ALTER TABLE "McTest" DROP CONSTRAINT "McTest_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_testId_fkey";

-- DropForeignKey
ALTER TABLE "WrittenTest" DROP CONSTRAINT "WrittenTest_userId_fkey";

-- DropTable
DROP TABLE "FlashCard";

-- DropTable
DROP TABLE "FlashCardSet";

-- DropTable
DROP TABLE "McTest";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "WrittenTest";

-- CreateTable
CREATE TABLE "Worksheet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pdfLink" TEXT NOT NULL,

    CONSTRAINT "Worksheet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Worksheet" ADD CONSTRAINT "Worksheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
