-- Create Table User
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Create Table Correction
CREATE TABLE "Correction" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "corrected" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "Correction_pkey" PRIMARY KEY ("id")
);

-- Create Table AnonymousUsage
CREATE TABLE "AnonymousUsage" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "remaining" INTEGER NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnonymousUsage_pkey" PRIMARY KEY ("id")
);

-- Create Index
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- Create Index
CREATE UNIQUE INDEX "AnonymousUsage_sessionId_key" ON "AnonymousUsage"("sessionId");

-- Add ForeignKey
ALTER TABLE "Correction" ADD CONSTRAINT "Correction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
