/*
  Warnings:

  - Made the column `description` on table `SupplyChainItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `SupplyChainItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `SupplyChainItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SupplyChainItem" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL;
