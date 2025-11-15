-- CreateTable
CREATE TABLE "public"."Artist" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "stageName" TEXT NOT NULL,
    "bioSum" TEXT NOT NULL,
    "bioFull" TEXT NOT NULL,
    "portraitURL" TEXT NOT NULL,
    "songId" INTEGER NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Song" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "bpm" INTEGER NOT NULL,
    "yor" INTEGER NOT NULL,
    "songURL" TEXT NOT NULL,
    "snippetURL" TEXT NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Song" ADD CONSTRAINT "Song_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "public"."Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
