CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` text
);
--> statement-breakpoint
CREATE TABLE `clinic_settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`clinic_name` text NOT NULL,
	`clinic_email` text NOT NULL,
	`booking_start_time` text NOT NULL,
	`booking_end_time` text NOT NULL,
	`slot_duration_minutes` integer DEFAULT 15,
	`updated_at` text
);
--> statement-breakpoint
CREATE TABLE `consultations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`category_id` integer NOT NULL,
	`service_id` integer NOT NULL,
	`preferred_date` text NOT NULL,
	`slot_id` integer NOT NULL,
	`status` text DEFAULT 'pending',
	`created_at` text,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`slot_id`) REFERENCES `slots`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `consultations_preferred_date_slot_id_unique` ON `consultations` (`preferred_date`,`slot_id`);--> statement-breakpoint
CREATE TABLE `services` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_id` integer NOT NULL,
	`name` text NOT NULL,
	`created_at` text,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `slot_blocks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slot_id` integer NOT NULL,
	`blocked_date` text NOT NULL,
	`reason` text,
	`created_at` text,
	FOREIGN KEY (`slot_id`) REFERENCES `slots`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `slot_blocks_blocked_date_slot_id_unique` ON `slot_blocks` (`blocked_date`,`slot_id`);--> statement-breakpoint
CREATE TABLE `slots` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`start_time` text NOT NULL,
	`end_time` text NOT NULL,
	`is_active` integer DEFAULT true,
	`created_at` text
);

CREATE TABLE `admins` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admins_username_unique` ON `admins` (`username`);

ALTER TABLE `consultations` ADD `payment_mode` text DEFAULT 'offline';--> statement-breakpoint
ALTER TABLE `consultations` ADD `payment_status` text DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `consultations` ADD `payment_reference_id` text;--> statement-breakpoint
ALTER TABLE `consultations` ADD `payment_amount` integer;--> statement-breakpoint
ALTER TABLE `consultations` ADD `payment_date` text;