-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'activo',
ALTER COLUMN "password" DROP NOT NULL;
