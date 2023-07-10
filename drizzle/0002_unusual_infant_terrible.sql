CREATE TABLE `accounts` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`userId` varchar(191) NOT NULL,
	`type` varchar(191) NOT NULL,
	`provider` varchar(191) NOT NULL,
	`providerAccountId` varchar(191) NOT NULL,
	`access_token` text,
	`expires_in` int,
	`id_token` text,
	`refresh_token` text,
	`refresh_token_expires_in` int,
	`scope` varchar(191),
	`token_type` varchar(191),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`sessionToken` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`expires` datetime NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);
--> statement-breakpoint
CREATE UNIQUE INDEX `accounts__provider__providerAccountId__idx` ON `accounts` (`provider`,`providerAccountId`);--> statement-breakpoint
CREATE INDEX `accounts__userId__idx` ON `accounts` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `sessions__sessionToken__idx` ON `sessions` (`sessionToken`);--> statement-breakpoint
CREATE INDEX `sessions__userId__idx` ON `sessions` (`userId`);