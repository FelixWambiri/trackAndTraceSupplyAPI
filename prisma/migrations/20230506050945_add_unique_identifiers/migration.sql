/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `SupplyChainItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SupplyChainItem_id_userId_key" ON "SupplyChainItem"("id", "userId");
