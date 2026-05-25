-- PostgreSQL-adaptado para pgAdmin 4

CREATE TABLE IF NOT EXISTS "Documents_Type" (
  "idDocument_Type" SERIAL PRIMARY KEY,
  "documentType" VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Permissions" (
  "idPermission" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "description" TEXT,
  "status" INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS "Roles" (
  "idRole" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "description" TEXT,
  "status" INT DEFAULT 1,
  "idPermission" INT
);

CREATE TABLE IF NOT EXISTS "Suppliers" (
  "idSupplier" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "phone" VARCHAR(20),
  "email" VARCHAR(100),
  "address" VARCHAR(100),
  "status" INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS "Workshops" (
  "idWorkshop" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "phone" VARCHAR(20),
  "address" VARCHAR(100),
  "status" INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS "Users" (
  "idUser" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "lastName" VARCHAR(50) NOT NULL,
  "phone" VARCHAR(20),
  "email" VARCHAR(100) UNIQUE,
  "password" VARCHAR(255),
  "address" VARCHAR(100),
  "status" INT DEFAULT 1,
  "idDocument_Type" INT,
  "idRole" INT,
  "idEmployee" INT,
  "idCustomer" INT
);

CREATE TABLE IF NOT EXISTS "Employees" (
  "idEmployee" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "lastName" VARCHAR(100) NOT NULL,
  "phone" VARCHAR(20),
  "hireDate" DATE,
  "salary" DECIMAL(10,2) NOT NULL,
  "status" INT DEFAULT 1,
  "idDocument_Type" INT,
  "idRole" INT,
  "idUser" INT
);

CREATE TABLE IF NOT EXISTS "Customers" (
  "idCustomer" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "lastName" VARCHAR(100) NOT NULL,
  "phone" VARCHAR(20),
  "email" VARCHAR(100),
  "address" VARCHAR(150),
  "status" INT DEFAULT 1,
  "idDocument_Type" INT,
  "idUser" INT
);

CREATE TABLE IF NOT EXISTS "Supplies" (
  "idSupply" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "stock" INT DEFAULT 0,
  "status" INT DEFAULT 1,
  "idProductCategory" INT
);

CREATE TABLE IF NOT EXISTS "Products_Category" (
  "idProductCategory" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "description" TEXT,
  "status" INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS "Products" (
  "idProduct" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "price" DECIMAL(10,2) NOT NULL,
  "description" TEXT,
  "stock" INT DEFAULT 0,
  "status" INT DEFAULT 1,
  "idProductCategory" INT
);

CREATE TABLE IF NOT EXISTS "Orders" (
  "idOrder" SERIAL PRIMARY KEY,
  "orderDate" DATE,
  "quantity" INT,
  "total" DECIMAL(10,2),
  "subTotal" DECIMAL(10,2),
  "status" INT,
  "idCustomer" INT,
  "idSale" INT
);

CREATE TABLE IF NOT EXISTS "Orders_Details" (
  "idOrderDetail" SERIAL PRIMARY KEY,
  "idOrder" INT,
  "idProduct" INT
);

CREATE TABLE IF NOT EXISTS "Payments" (
  "idPayment" SERIAL PRIMARY KEY,
  "paymentDate" DATE NOT NULL,
  "amount" DECIMAL(10,2) NOT NULL,
  "status" INT DEFAULT 1,
  "idOrder" INT
);

CREATE TABLE IF NOT EXISTS "Purchases" (
  "idPurchase" SERIAL PRIMARY KEY,
  "purchaseDate" DATE NOT NULL,
  "total" DECIMAL(10,2),
  "status" INT DEFAULT 1,
  "idSupplier" INT
);

CREATE TABLE IF NOT EXISTS "Purchasing_Details" (
  "idPurchaseDetail" SERIAL PRIMARY KEY,
  "quantity" INT NOT NULL,
  "unitValue" DECIMAL(10,2) NOT NULL,
  "subTotal" DECIMAL(10,2),
  "idPurchase" INT,
  "idProduct" INT
);

CREATE TABLE IF NOT EXISTS "Deliveries" (
  "idDelivery" SERIAL PRIMARY KEY,
  "total" VARCHAR(50),
  "address" VARCHAR(150),
  "city" VARCHAR(100),
  "phone" VARCHAR(20),
  "idCustomer" INT,
  "idEmployee" INT,
  "idOrder" INT
);

CREATE TABLE IF NOT EXISTS "Returns" (
  "idReturn" SERIAL PRIMARY KEY,
  "returnDate" DATE NOT NULL,
  "reason" VARCHAR(255),
  "status" INT DEFAULT 1,
  "idOrder" INT,
  "idProduction" INT
);

CREATE TABLE IF NOT EXISTS "Returns_Details" (
  "idReturnDetail" SERIAL PRIMARY KEY,
  "quantity" INT NOT NULL,
  "subtotal" DECIMAL(10,2),
  "idReturn" INT,
  "idProduct" INT
);

CREATE TABLE IF NOT EXISTS "Productions" (
  "idProduction" SERIAL PRIMARY KEY,
  "status" INT DEFAULT 1,
  "idWorkshop" INT,
  "idProduct" INT
);

CREATE TABLE IF NOT EXISTS "Production_Details" (
  "idProductionDetail" SERIAL PRIMARY KEY,
  "quantityDelivered" INT,
  "amountReceived" INT,
  "dateReceived" DATE,
  "deliveryDate" DATE,
  "status" INT,
  "idProduction" INT
);

CREATE TABLE IF NOT EXISTS "Sales" (
  "idSale" SERIAL PRIMARY KEY,
  "saleDate" DATE,
  "total" DECIMAL(10,2),
  "quantity" INT,
  "unitValue" DECIMAL(10,2),
  "vatValue" DECIMAL(10,2),
  "discountValue" DECIMAL(10,2),
  "totalValue" DECIMAL(10,2),
  "status" INT,
  "idCustomer" INT,
  "idOrder" INT
);

CREATE TABLE IF NOT EXISTS "Sales_Details" (
  "idSaleDetail" SERIAL PRIMARY KEY,
  "idSale" INT,
  "idProduct" INT
);

ALTER TABLE "Users"
  ADD CONSTRAINT fk_users_role FOREIGN KEY ("idRole") REFERENCES "Roles"("idRole");

ALTER TABLE "Users"
  ADD CONSTRAINT fk_users_employee FOREIGN KEY ("idEmployee") REFERENCES "Employees"("idEmployee");

ALTER TABLE "Users"
  ADD CONSTRAINT fk_users_customer FOREIGN KEY ("idCustomer") REFERENCES "Customers"("idCustomer");

ALTER TABLE "Employees"
  ADD CONSTRAINT fk_employees_role FOREIGN KEY ("idRole") REFERENCES "Roles"("idRole");

ALTER TABLE "Employees"
  ADD CONSTRAINT fk_employees_user FOREIGN KEY ("idUser") REFERENCES "Users"("idUser");

ALTER TABLE "Customers"
  ADD CONSTRAINT fk_customers_user FOREIGN KEY ("idUser") REFERENCES "Users"("idUser");

ALTER TABLE "Orders"
  ADD CONSTRAINT fk_orders_sale FOREIGN KEY ("idSale") REFERENCES "Sales"("idSale");

ALTER TABLE "Orders_Details"
  ADD CONSTRAINT fk_orders_details_product FOREIGN KEY ("idProduct") REFERENCES "Products"("idProduct");

ALTER TABLE "Purchasing_Details"
  ADD CONSTRAINT fk_purchasing_details_product FOREIGN KEY ("idProduct") REFERENCES "Products"("idProduct");

ALTER TABLE "Deliveries"
  ADD CONSTRAINT fk_deliveries_employee FOREIGN KEY ("idEmployee") REFERENCES "Employees"("idEmployee");

ALTER TABLE "Deliveries"
  ADD CONSTRAINT fk_deliveries_order FOREIGN KEY ("idOrder") REFERENCES "Orders"("idOrder");

ALTER TABLE "Returns"
  ADD CONSTRAINT fk_returns_production FOREIGN KEY ("idProduction") REFERENCES "Productions"("idProduction");

ALTER TABLE "Returns_Details"
  ADD CONSTRAINT fk_returns_details_product FOREIGN KEY ("idProduct") REFERENCES "Products"("idProduct");

ALTER TABLE "Productions"
  ADD CONSTRAINT fk_productions_product FOREIGN KEY ("idProduct") REFERENCES "Products"("idProduct");

ALTER TABLE "Sales"
  ADD CONSTRAINT fk_sales_order FOREIGN KEY ("idOrder") REFERENCES "Orders"("idOrder");

ALTER TABLE "Sales_Details"
  ADD CONSTRAINT fk_sales_details_product FOREIGN KEY ("idProduct") REFERENCES "Products"("idProduct");

ALTER TABLE "Roles"
  ADD CONSTRAINT fk_roles_permission FOREIGN KEY ("idPermission") REFERENCES "Permissions"("idPermission");

ALTER TABLE "Users"
  ADD CONSTRAINT fk_users_document_type FOREIGN KEY ("idDocument_Type") REFERENCES "Documents_Type"("idDocument_Type");

ALTER TABLE "Employees"
  ADD CONSTRAINT fk_employees_document_type FOREIGN KEY ("idDocument_Type") REFERENCES "Documents_Type"("idDocument_Type");

ALTER TABLE "Customers"
  ADD CONSTRAINT fk_customers_document_type FOREIGN KEY ("idDocument_Type") REFERENCES "Documents_Type"("idDocument_Type");

ALTER TABLE "Supplies"
  ADD CONSTRAINT fk_supplies_product_category FOREIGN KEY ("idProductCategory") REFERENCES "Products_Category"("idProductCategory");

ALTER TABLE "Products"
  ADD CONSTRAINT fk_products_product_category FOREIGN KEY ("idProductCategory") REFERENCES "Products_Category"("idProductCategory");

ALTER TABLE "Orders"
  ADD CONSTRAINT fk_orders_customer FOREIGN KEY ("idCustomer") REFERENCES "Customers"("idCustomer");

ALTER TABLE "Orders_Details"
  ADD CONSTRAINT fk_orders_details_order FOREIGN KEY ("idOrder") REFERENCES "Orders"("idOrder");

ALTER TABLE "Payments"
  ADD CONSTRAINT fk_payments_order FOREIGN KEY ("idOrder") REFERENCES "Orders"("idOrder");

ALTER TABLE "Purchases"
  ADD CONSTRAINT fk_purchases_supplier FOREIGN KEY ("idSupplier") REFERENCES "Suppliers"("idSupplier");

ALTER TABLE "Purchasing_Details"
  ADD CONSTRAINT fk_purchasing_details_purchase FOREIGN KEY ("idPurchase") REFERENCES "Purchases"("idPurchase");

ALTER TABLE "Deliveries"
  ADD CONSTRAINT fk_deliveries_customer FOREIGN KEY ("idCustomer") REFERENCES "Customers"("idCustomer");

ALTER TABLE "Returns"
  ADD CONSTRAINT fk_returns_order FOREIGN KEY ("idOrder") REFERENCES "Orders"("idOrder");

ALTER TABLE "Returns_Details"
  ADD CONSTRAINT fk_returns_details_return FOREIGN KEY ("idReturn") REFERENCES "Returns"("idReturn");

ALTER TABLE "Productions"
  ADD CONSTRAINT fk_productions_workshop FOREIGN KEY ("idWorkshop") REFERENCES "Workshops"("idWorkshop");

ALTER TABLE "Production_Details"
  ADD CONSTRAINT fk_production_details_production FOREIGN KEY ("idProduction") REFERENCES "Productions"("idProduction");

ALTER TABLE "Sales"
  ADD CONSTRAINT fk_sales_customer FOREIGN KEY ("idCustomer") REFERENCES "Customers"("idCustomer");

ALTER TABLE "Sales_Details"
  ADD CONSTRAINT fk_sales_details_sale FOREIGN KEY ("idSale") REFERENCES "Sales"("idSale");
