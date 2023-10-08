/*
  Warnings:

  - Added the required column `fromUserId` to the `ReTweets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReTweets" ADD COLUMN     "fromUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ReTweets" ADD CONSTRAINT "ReTweets_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
