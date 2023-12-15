-- CreateEnum
CREATE TYPE "UserRolesEnum" AS ENUM ('ADMIN', 'CONSUMER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRolesEnum"[],
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePicture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "designation" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Designation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Designation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "designationId" INTEGER,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competencies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "competencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleToCompetency" (
    "roleId" INTEGER NOT NULL,
    "competencyId" INTEGER NOT NULL,

    CONSTRAINT "RoleToCompetency_pkey" PRIMARY KEY ("roleId","competencyId")
);

-- CreateTable
CREATE TABLE "competency_levels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "levelNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "competency_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetencyToCompetencyLevel" (
    "competencyId" INTEGER NOT NULL,
    "competencyLevelId" INTEGER NOT NULL,

    CONSTRAINT "CompetencyToCompetencyLevel_pkey" PRIMARY KEY ("competencyId","competencyLevelId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Designation_name_key" ON "Designation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "competencies_name_key" ON "competencies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "competency_levels_name_key" ON "competency_levels"("name");

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "Designation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleToCompetency" ADD CONSTRAINT "RoleToCompetency_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleToCompetency" ADD CONSTRAINT "RoleToCompetency_competencyId_fkey" FOREIGN KEY ("competencyId") REFERENCES "competencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetencyToCompetencyLevel" ADD CONSTRAINT "CompetencyToCompetencyLevel_competencyId_fkey" FOREIGN KEY ("competencyId") REFERENCES "competencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetencyToCompetencyLevel" ADD CONSTRAINT "CompetencyToCompetencyLevel_competencyLevelId_fkey" FOREIGN KEY ("competencyLevelId") REFERENCES "competency_levels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
