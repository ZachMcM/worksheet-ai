-- CreateTable
CREATE TABLE "Transcript" (
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

    CONSTRAINT "Transcript_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
