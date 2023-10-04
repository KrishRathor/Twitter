/*
  Warnings:

  - Added the required column `email` to the `Tweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Tweet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
