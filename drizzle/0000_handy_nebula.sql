CREATE TABLE `category` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` text NOT NULL);
--> statement-breakpoint
CREATE TABLE `task` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`title` varchar(100) NOT NULL,
	`description` text,
	`priority` text,
	`status` text,
	`created_at` timestamp DEFAULT (now()),
	`expires_at` timestamp,
	`userId` int,
	`categoryId` int);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` timestamp DEFAULT (now()));
--> statement-breakpoint
ALTER TABLE `task` ADD CONSTRAINT `task_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task` ADD CONSTRAINT `task_categoryId_category_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE no action ON UPDATE no action;