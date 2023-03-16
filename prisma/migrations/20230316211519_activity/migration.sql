-- CreateTable
CREATE TABLE "ActivityDate" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivityDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLocal" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivityLocal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activities" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "dateId" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "localId" INTEGER NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityBooking" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "ActivityBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ActivityDate_date_idx" ON "ActivityDate"("date");

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "ActivityDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_localId_fkey" FOREIGN KEY ("localId") REFERENCES "ActivityLocal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityBooking" ADD CONSTRAINT "ActivityBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityBooking" ADD CONSTRAINT "ActivityBooking_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
