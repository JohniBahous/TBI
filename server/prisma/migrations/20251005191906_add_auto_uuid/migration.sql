/*
  Warnings:

  - You are about to drop the `Artist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Song` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Song" DROP CONSTRAINT "Song_artistId_fkey";

-- DropTable
DROP TABLE "public"."Artist";

-- DropTable
DROP TABLE "public"."Song";

-- CreateTable
CREATE TABLE "public"."artist" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "stageName" TEXT NOT NULL,
    "bioFull" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,

    CONSTRAINT "artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."song" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "bpm" INTEGER NOT NULL,
    "yor" INTEGER NOT NULL,
    "s3Key" TEXT NOT NULL,
    "songPlays" INTEGER DEFAULT 0,
    "snippetPlays" INTEGER DEFAULT 0,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "song_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "artist_uuid_key" ON "public"."artist"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "song_uuid_key" ON "public"."song"("uuid");

-- AddForeignKey
ALTER TABLE "public"."song" ADD CONSTRAINT "song_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "public"."artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
