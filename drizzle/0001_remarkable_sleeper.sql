CREATE TABLE `popup_settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`enabled` integer DEFAULT false NOT NULL,
	`headline` text DEFAULT '' NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`image_url` text DEFAULT '' NOT NULL,
	`button_text` text DEFAULT '' NOT NULL,
	`button_url` text DEFAULT '' NOT NULL,
	`expires_at` text,
	`revision` text NOT NULL
);
