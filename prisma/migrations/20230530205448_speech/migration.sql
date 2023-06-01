/*
  Warnings:

  - You are about to drop the `Transcript` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transcript" DROP CONSTRAINT "Transcript_userId_fkey";

-- DropTable
DROP TABLE "Transcript";

-- CreateTable
CREATE TABLE "Speech" (
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "wordCount" INTEGER NOT NULL,
    "duration" DECIMAL(65,30) NOT NULL,
    "wpm" DECIMAL(65,30) NOT NULL,
    "fillerPerct" DECIMAL(65,30) NOT NULL,
    "feedback" TEXT[],
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "umCount" INTEGER NOT NULL,
    "ohCount" INTEGER NOT NULL,
    "erCount" INTEGER NOT NULL,
    "ahCount" INTEGER NOT NULL,
    "veryCount" INTEGER NOT NULL,
    "reallyCount" INTEGER NOT NULL,
    "highlyCount" INTEGER NOT NULL,
    "likeCount" INTEGER NOT NULL,
    "justCount" INTEGER NOT NULL,
    "worstWord" TEXT NOT NULL,
    "worstWordCount" INTEGER NOT NULL,

    CONSTRAINT "Speech_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Speech" ADD CONSTRAINT "Speech_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
