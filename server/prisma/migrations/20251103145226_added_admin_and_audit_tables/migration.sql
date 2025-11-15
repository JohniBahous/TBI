-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'SUPERADMIN');

-- CreateTable
CREATE TABLE "public"."admin" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "admin_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."audit" (
    "id" SERIAL NOT NULL,
    "adminUuid" TEXT NOT NULL,
    "adminName" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "audit_pkey" PRIMARY KEY ("id")
);
