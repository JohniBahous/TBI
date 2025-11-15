/*
  Warnings:

  - A unique constraint covering the columns `[artistUuid]` on the table `song` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "song_artistUuid_key" ON "public"."song"("artistUuid");
