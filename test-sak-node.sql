-- --------------------------------------------------------
-- Host:                         64.176.82.141
-- Server version:               8.4.3 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for sornsakon_db
CREATE DATABASE IF NOT EXISTS `sornsakon_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sornsakon_db`;

-- Dumping structure for table sornsakon_db.blogs
CREATE TABLE IF NOT EXISTS `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FK_blogs_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table sornsakon_db.blogs: ~0 rows (approximately)
INSERT INTO `blogs` (`id`, `title`, `status`, `user_id`, `created_at`, `updated_at`) VALUES
	(1, 'tite1', 0, 1, '2024-11-07 10:23:49', '2024-11-07 10:23:52'),
	(2, 'title2', 1, 4, '2024-11-07 10:24:06', '2024-11-07 10:24:07'),
	(3, 'test3', 0, 1, '2024-11-07 10:24:30', '2024-11-07 10:24:31');

-- Dumping structure for table sornsakon_db.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `permission` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'member',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `email_idx` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table sornsakon_db.users: ~3 rows (approximately)
INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `permission`) VALUES
	(1, 'Best11', 'best1@gmail.com', '$2b$10$/6Du5NXhWyiHGbWy4GQ5KerRNgRKV/qJ6BCMJJo6sqJimqOCFNuNe', 'admin'),
	(3, 'Bester', 'bester@gmail.com', '$2b$10$g5CWs.97Y6qkJFpPLvdOnOkwEb4OGgrxxUkLF38UDL2G93DHRjM1y', 'member'),
	(4, 'Bestbie', 'besbie@gmail.com', '$2b$10$FuJV4CkItATy0MTYlcTBEOa2CBdFGU2Z/IAmAi/.MkaPspttM2Wxu', 'member');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
