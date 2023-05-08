-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplyChainItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "price" DOUBLE PRECISION,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SupplyChainItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplyChainItemEvent" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "custodian" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supplyChainItemId" TEXT NOT NULL,

    CONSTRAINT "SupplyChainItemEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "SupplyChainItem" ADD CONSTRAINT "SupplyChainItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplyChainItemEvent" ADD CONSTRAINT "SupplyChainItemEvent_supplyChainItemId_fkey" FOREIGN KEY ("supplyChainItemId") REFERENCES "SupplyChainItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
