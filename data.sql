CREATE TABLE `partners` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `civility` varchar(255) NOT NULL,
  `company` varchar(255),
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `siret_number` varchar(255) NOT NULL,
  `tva_number` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `payment_address` varchar(255) NOT NULL,
  `city_payment` varchar(255) NOT NULL,
  `post_code_payment` int NOT NULL,
  `delivery_adress` varchar(255) NOT NULL,
  `post_code_delivery` int NOT NULL,
  `city_delivery` varchar(255) NOT NULL,
  `picture_path` varchar(255),
  `role` varchar(255)
);

CREATE TABLE `partner_logo` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `picture_path` varchar(255)
);

CREATE TABLE `users` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `civility` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `payment_address` varchar(255) NOT NULL,
  `delivery_adress` varchar(255) NOT NULL
);

CREATE TABLE `banner` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `picture_path` varchar(255)
);

CREATE TABLE `schema_home` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `picture_path` varchar(255)
);

CREATE TABLE `schema_pros` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `picture_path` varchar(255)
);

CREATE TABLE `team` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `picture_path` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
);

CREATE TABLE `news` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `picture_path` varchar(255)
);
