-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "firstName" VARCHAR(30) NOT NULL,
    "lastName" VARCHAR(30) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Member" (
    "memberId" SERIAL NOT NULL,
    "firstName" VARCHAR(30) NOT NULL,
    "lastName" VARCHAR(30) NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "membershipId" INTEGER,
    "membershipStart" DATE,
    "membershipEnd" DATE,
    "createdBy" INTEGER NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("memberId")
);

-- CreateTable
CREATE TABLE "Membership" (
    "membershipId" SERIAL NOT NULL,
    "membershipName" TEXT NOT NULL,
    "membershipLength" INTEGER NOT NULL,
    "membershipFee" INTEGER NOT NULL DEFAULT 0,
    "createdBy" INTEGER NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("membershipId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("membershipId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
