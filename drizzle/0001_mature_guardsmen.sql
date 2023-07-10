ALTER TABLE `task` DROP FOREIGN KEY `task_userId_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `task` DROP FOREIGN KEY `task_categoryId_category_id_fk`;
--> statement-breakpoint
ALTER TABLE `task` MODIFY COLUMN `userId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `task` MODIFY COLUMN `categoryId` int NOT NULL;