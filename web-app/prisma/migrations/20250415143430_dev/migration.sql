-- CreateEnum
CREATE TYPE "SplitType" AS ENUM ('PERCENTAGE', 'FIXED', 'EQUAL', 'WEIGHTED');

-- AlterEnum
ALTER TYPE "TransactionType" ADD VALUE 'TRANSFER';

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "fromAccountId" TEXT,
ADD COLUMN     "toAccountId" TEXT;

-- CreateTable
CREATE TABLE "splits" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "splitType" "SplitType" NOT NULL,
    "percentage" DOUBLE PRECISION,
    "fixedAmount" DECIMAL(65,30),
    "weight" DOUBLE PRECISION,
    "parts" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "splits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "splits_transactionId_idx" ON "splits"("transactionId");

-- CreateIndex
CREATE INDEX "splits_userId_idx" ON "splits"("userId");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fromAccountId_fkey" FOREIGN KEY ("fromAccountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_toAccountId_fkey" FOREIGN KEY ("toAccountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "splits" ADD CONSTRAINT "splits_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "splits" ADD CONSTRAINT "splits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
