/*
  Warnings:

  - You are about to drop the `Mission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Mission";

-- CreateTable
CREATE TABLE "public"."mission" (
    "id" SERIAL NOT NULL,
    "chapter" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "mission" TEXT NOT NULL,

    CONSTRAINT "character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "chapter" TEXT NOT NULL,
    "mission" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "character_name_key" ON "public"."character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "location_name_key" ON "public"."location"("name");
