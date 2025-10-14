-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "destination" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'MXN',
    "description" TEXT NOT NULL,
    "itinerary" TEXT NOT NULL,
    "recommendations" TEXT NOT NULL,
    "policies" TEXT NOT NULL,
    "thumbnailId" TEXT,
    "notes" TEXT,
    "paymentPlanId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Trip_paymentPlanId_fkey" FOREIGN KEY ("paymentPlanId") REFERENCES "PaymentPlan" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IncludedItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "PaymentPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Installment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "daysBeforeTrip" INTEGER NOT NULL,
    "paymentPlanId" TEXT NOT NULL,
    CONSTRAINT "Installment_paymentPlanId_fkey" FOREIGN KEY ("paymentPlanId") REFERENCES "PaymentPlan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "src" TEXT NOT NULL,
    "alt" TEXT,
    "tripId" TEXT NOT NULL,
    CONSTRAINT "Image_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSuscribed" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Booking" (
    "bookingDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "userId" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "tripId"),
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Booking_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "paymentDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "method" TEXT NOT NULL,
    "reference" TEXT,
    "bookingUserId" TEXT NOT NULL,
    "bookingTripId" TEXT NOT NULL,
    CONSTRAINT "Payment_bookingUserId_bookingTripId_fkey" FOREIGN KEY ("bookingUserId", "bookingTripId") REFERENCES "Booking" ("userId", "tripId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_IncludedItemToTrip" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_IncludedItemToTrip_A_fkey" FOREIGN KEY ("A") REFERENCES "IncludedItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_IncludedItemToTrip_B_fkey" FOREIGN KEY ("B") REFERENCES "Trip" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "IncludedItem_name_key" ON "IncludedItem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentPlan_name_key" ON "PaymentPlan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Image_src_key" ON "Image"("src");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_IncludedItemToTrip_AB_unique" ON "_IncludedItemToTrip"("A", "B");

-- CreateIndex
CREATE INDEX "_IncludedItemToTrip_B_index" ON "_IncludedItemToTrip"("B");
