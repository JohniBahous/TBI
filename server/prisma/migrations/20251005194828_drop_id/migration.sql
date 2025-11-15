/*
  Warnings:

  - The primary key for the `artist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `artist` table. All the data in the column will be lost.
  - The primary key for the `song` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `artistId` on the `song` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `song` table. All the data in the column will be lost.
  - Added the required column `artistUuid` to the `song` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."song" DROP CONSTRAINT "song_artistId_fkey";

-- DropIndex
DROP INDEX "public"."artist_uuid_key";

-- DropIndex
DROP INDEX "public"."song_uuid_key";

-- AlterTable
ALTER TABLE "public"."artist" DROP CONSTRAINT "artist_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "artist_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "public"."song" DROP CONSTRAINT "song_pkey",
DROP COLUMN "artistId",
DROP COLUMN "id",
ADD COLUMN     "artistUuid" TEXT NOT NULL,
ADD CONSTRAINT "song_pkey" PRIMARY KEY ("uuid");

-- AddForeignKey
ALTER TABLE "public"."song" ADD CONSTRAINT "song_artistUuid_fkey" FOREIGN KEY ("artistUuid") REFERENCES "public"."artist"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
