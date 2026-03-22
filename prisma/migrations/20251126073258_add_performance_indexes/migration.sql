-- CreateIndex
CREATE INDEX "Event_published_startDate_idx" ON "Event"("published", "startDate");

-- CreateIndex
CREATE INDEX "Event_status_idx" ON "Event"("status");

-- CreateIndex
CREATE INDEX "FAQ_active_category_order_idx" ON "FAQ"("active", "category", "order");

-- CreateIndex
CREATE INDEX "HeroSlide_active_order_idx" ON "HeroSlide"("active", "order");

-- CreateIndex
CREATE INDEX "Job_closingDate_idx" ON "Job"("closingDate");

-- CreateIndex
CREATE INDEX "Leadership_active_order_idx" ON "Leadership"("active", "order");

-- CreateIndex
CREATE INDEX "News_published_date_idx" ON "News"("published", "date");

-- CreateIndex
CREATE INDEX "News_category_idx" ON "News"("category");

-- CreateIndex
CREATE INDEX "OnlineService_active_order_idx" ON "OnlineService"("active", "order");

-- CreateIndex
CREATE INDEX "Partner_active_order_idx" ON "Partner"("active", "order");

-- CreateIndex
CREATE INDEX "Project_active_status_order_idx" ON "Project"("active", "status", "order");

-- CreateIndex
CREATE INDEX "Project_departmentId_idx" ON "Project"("departmentId");

-- CreateIndex
CREATE INDEX "QuickLink_active_order_idx" ON "QuickLink"("active", "order");

-- CreateIndex
CREATE INDEX "Statistic_active_order_idx" ON "Statistic"("active", "order");

-- CreateIndex
CREATE INDEX "Tender_status_deadline_idx" ON "Tender"("status", "deadline");
