/*
  Warnings:

  - You are about to drop the column `belongsToId` on the `SupplyChainItemEvent` table. All the data in the column will be lost.
  - Added the required column `supplyChainItemId` to the `SupplyChainItemEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SupplyChainItemEvent" DROP CONSTRAINT "SupplyChainItemEvent_belongsToId_fkey";

-- AlterTable
ALTER TABLE "SupplyChainItemEvent" DROP COLUMN "belongsToId",
ADD COLUMN     "supplyChainItemId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SupplyChainItemEvent" ADD CONSTRAINT "SupplyChainItemEvent_supplyChainItemId_fkey" FOREIGN KEY ("supplyChainItemId") REFERENCES "SupplyChainItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
