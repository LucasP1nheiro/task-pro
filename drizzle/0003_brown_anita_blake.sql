ALTER TABLE `user` MODIFY COLUMN `id` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `name` varchar(191);--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `email` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `user` ADD `emailVerified` timestamp;--> statement-breakpoint
ALTER TABLE `user` ADD `image` varchar(191);--> statement-breakpoint
ALTER TABLE `user` ADD `updated_at` timestamp DEFAULT (now()) NOT NULL ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
CREATE UNIQUE INDEX `users__email__idx` ON `user` (`email`);