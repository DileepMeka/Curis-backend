ALTER TABLE `consultations` ADD `payment_mode` text DEFAULT 'offline';--> statement-breakpoint
ALTER TABLE `consultations` ADD `payment_status` text DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `consultations` ADD `payment_reference_id` text;--> statement-breakpoint
ALTER TABLE `consultations` ADD `payment_amount` integer;--> statement-breakpoint
ALTER TABLE `consultations` ADD `payment_date` text;