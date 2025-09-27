/*
  Warnings:

  - You are about to drop the column `mission` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `mission` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Mission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `missionId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `missionId` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Character" DROP COLUMN "mission",
ADD COLUMN     "missionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Location" DROP COLUMN "mission",
ADD COLUMN     "missionId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Mission_title_key" ON "public"."Mission"("title");

-- AddForeignKey
ALTER TABLE "public"."Character" ADD CONSTRAINT "Character_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "public"."Mission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Location" ADD CONSTRAINT "Location_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "public"."Mission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
