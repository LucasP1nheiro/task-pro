CREATE TABLE `verification_tokens` (
	`identifier` varchar(191) PRIMARY KEY NOT NULL,
	`token` varchar(191) NOT NULL,
	`expires` datetime NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);
--> statement-breakpoint
CREATE UNIQUE INDEX `verification_tokens__token__idx` ON `verification_tokens` (`token`);