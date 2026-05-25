-- CreateTable
CREATE TABLE "ProductsCategory" (
    "id_product_category" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ProductsCategory_pkey" PRIMARY KEY ("id_product_category")
);

-- CreateTable
CREATE TABLE "Products" (
    "id_product" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "tipo" TEXT,
    "color" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT 1,
    "id_product_category" INTEGER,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id_product")
);

-- CreateTable
CREATE TABLE "Users" (
    "id_user" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_id_product_category_fkey" FOREIGN KEY ("id_product_category") REFERENCES "ProductsCategory"("id_product_category") ON DELETE SET NULL ON UPDATE CASCADE;
