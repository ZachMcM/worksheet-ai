/*
  Warnings:

  - You are about to drop the `Speech` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Speech" DROP CONSTRAINT "Speech_userId_fkey";

-- DropTable
DROP TABLE "Speech";

-- CreateTable
CREATE TABLE "McTest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "finished" BOOLEAN NOT NULL,
    "grade" DECIMAL(65,30),

    CONSTRAINT "McTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "a" TEXT NOT NULL,
    "b" TEXT NOT NULL,
    "c" TEXT NOT NULL,
    "d" TEXT NOT NULL,
    "e" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "userAnswer" TEXT,
    "correct" BOOLEAN,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlashCardSet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FlashCardSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlashCard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "flashCardSetId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "FlashCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WrittenTest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "finished" BOOLEAN NOT NULL,
    "grade" DECIMAL(65,30),
    "userAnswer" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WrittenTest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "McTest" ADD CONSTRAINT "McTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_testId_fkey" FOREIGN KEY ("testId") REFERENCES "McTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashCardSet" ADD CONSTRAINT "FlashCardSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashCard" ADD CONSTRAINT "FlashCard_flashCardSetId_fkey" FOREIGN KEY ("flashCardSetId") REFERENCES "FlashCardSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WrittenTest" ADD CONSTRAINT "WrittenTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
