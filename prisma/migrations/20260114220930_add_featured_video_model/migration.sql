-- AlterTable
ALTER TABLE "News" ADD COLUMN "images" TEXT;

-- CreateTable
CREATE TABLE "FeaturedVideo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "thumbnail" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "FeaturedVideo_active_order_idx" ON "FeaturedVideo"("active", "order");
