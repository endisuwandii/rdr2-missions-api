/*
  Warnings:

  - You are about to drop the column `missionId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `missionId` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Mission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Mission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_missionId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_missionId_fkey";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "missionId";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "missionId";

-- AlterTable
ALTER TABLE "Mission" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_CharacterToMission" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CharacterToMission_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_LocationToMission" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LocationToMission_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CharacterToMission_B_index" ON "_CharacterToMission"("B");

-- CreateIndex
CREATE INDEX "_LocationToMission_B_index" ON "_LocationToMission"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Mission_slug_key" ON "Mission"("slug");

-- AddForeignKey
ALTER TABLE "_CharacterToMission" ADD CONSTRAINT "_CharacterToMission_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToMission" ADD CONSTRAINT "_CharacterToMission_B_fkey" FOREIGN KEY ("B") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToMission" ADD CONSTRAINT "_LocationToMission_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToMission" ADD CONSTRAINT "_LocationToMission_B_fkey" FOREIGN KEY ("B") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
