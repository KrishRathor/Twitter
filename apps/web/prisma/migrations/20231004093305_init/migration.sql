-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "Likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "RepliesCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reTweetCount" INTEGER NOT NULL DEFAULT 0;
