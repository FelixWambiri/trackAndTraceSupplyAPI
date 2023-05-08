/*
  Warnings:

  - You are about to drop the column `userId` on the `SupplyChainItem` table. All the data in the column will be lost.
  - You are about to drop the column `supplyChainItemId` on the `SupplyChainItemEvent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,belongsToId]` on the table `SupplyChainItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `belongsToId` to the `SupplyChainItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `belongsToId` to the `SupplyChainItemEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SupplyChainItem" DROP CONSTRAINT "SupplyChainItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "SupplyChainItemEvent" DROP CONSTRAINT "SupplyChainItemEvent_supplyChainItemId_fkey";

-- DropIndex
DROP INDEX "SupplyChainItem_id_userId_key";

-- AlterTable
ALTER TABLE "SupplyChainItem" DROP COLUMN "userId",
ADD COLUMN     "belongsToId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SupplyChainItemEvent" DROP COLUMN "supplyChainItemId",
ADD COLUMN     "belongsToId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SupplyChainItem_id_belongsToId_key" ON "SupplyChainItem"("id", "belongsToId");

-- AddForeignKey
ALTER TABLE "SupplyChainItem" ADD CONSTRAINT "SupplyChainItem_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplyChainItemEvent" ADD CONSTRAINT "SupplyChainItemEvent_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "SupplyChainItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
