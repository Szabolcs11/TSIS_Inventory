-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2022 at 03:03 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tsis_inventory_new`
--

-- --------------------------------------------------------

--
-- Table structure for table `classrooms`
--

CREATE TABLE `classrooms` (
  `id` int(11) NOT NULL,
  `Name` varchar(64) NOT NULL,
  `Description` varchar(128) NOT NULL,
  `CreatedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classrooms`
--

INSERT INTO `classrooms` (`id`, `Name`, `Description`, `CreatedDate`) VALUES
(8, 'S01', '', '2022-11-03 22:25:22'),
(9, 'US02', '', '2022-11-03 22:25:22'),
(10, 'US03', '', '2022-11-03 22:25:22'),
(11, 'US04', '', '2022-11-03 22:25:22'),
(12, 'S05/S06', '', '2022-11-03 22:25:22'),
(13, 'KS07', '', '2022-11-03 22:25:22'),
(14, 'KS08', '', '2022-11-03 22:25:22'),
(15, 'KS09-učenička prostorija', '', '2022-11-03 22:25:22'),
(16, 'S10 - Kantina', '', '2022-11-03 22:25:22'),
(17, 'S11 i S12 / WC / i Hodnik', '', '2022-11-03 22:25:22'),
(18, 'S13, S14 i Hol', '', '2022-11-03 22:25:22'),
(19, 'test', 'test', '2022-11-10 19:34:04'),
(20, 'K123', '', '2022-11-10 19:38:25'),
(21, '123123', '', '2022-11-11 02:53:50'),
(22, '1231233', '', '2022-11-11 02:53:55'),
(23, '12312335', '', '2022-11-11 02:53:58');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `InventoryID` int(11) DEFAULT NULL,
  `Name` varchar(128) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Discarded` int(11) NOT NULL,
  `Note` varchar(256) NOT NULL,
  `Classroom` int(11) NOT NULL,
  `Modifier` int(11) NOT NULL,
  `AddedDate` datetime NOT NULL,
  `ModifiedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `InventoryID`, `Name`, `Quantity`, `Discarded`, `Note`, `Classroom`, `Modifier`, `AddedDate`, `ModifiedDate`) VALUES
(103, NULL, 'Sto', 1, 0, '', 8, 1, '2022-11-03 22:57:22', NULL),
(104, NULL, 'Stolica', 1, 0, '', 8, 1, '2022-11-03 22:57:22', NULL),
(105, NULL, 'Vešalica-zidna', 1, 0, '', 8, 1, '2022-11-03 22:57:22', NULL),
(106, NULL, 'Orman', 1, 0, '', 8, 1, '2022-11-03 22:57:22', NULL),
(107, NULL, 'Čiviluk zidni', 1, 0, '', 9, 1, '2022-11-03 22:57:22', NULL),
(108, NULL, 'Razvodne table', 4, 0, '', 9, 1, '2022-11-03 22:57:22', NULL),
(109, NULL, 'Šlolske stolice', 0, 50, '', 9, 1, '2022-11-03 22:57:22', NULL),
(110, NULL, 'Klupa školska', 0, 5, '', 9, 1, '2022-11-03 22:57:22', NULL),
(111, 10602, 'Simulator sudara', 1, 0, '', 9, 1, '2022-11-03 22:57:22', NULL),
(112, 10603, 'Motor (za takmičenje)', 1, 0, '', 9, 1, '2022-11-03 22:57:22', NULL),
(113, 10604, 'Natpis za školski štand', 0, 0, '', 9, 1, '2022-11-03 22:57:22', NULL),
(114, NULL, 'Čiviluk (drveni)', 0, 1, '', 9, 1, '2022-11-03 22:57:22', NULL),
(115, 10601, 'Karting', 1, 0, '', 9, 1, '2022-11-03 22:57:22', NULL),
(116, 10606, 'Ormar', 0, 1, '', 9, 1, '2022-11-03 22:57:22', NULL),
(117, NULL, 'Sklopivi panoi sa držačkima', 36, 0, '', 9, 1, '2022-11-03 22:57:22', NULL),
(118, NULL, 'Tabla', 1, 0, '', 10, 1, '2022-11-03 22:57:22', NULL),
(119, NULL, 'Korpa za otpatke', 1, 0, '', 10, 1, '2022-11-03 22:57:22', NULL),
(120, NULL, 'Školske stolice', 36, 0, '', 10, 1, '2022-11-03 22:57:22', NULL),
(121, NULL, 'Klupe', 18, 0, '', 10, 1, '2022-11-03 22:57:22', NULL),
(122, NULL, 'Tapacirana stolica', 1, 0, '', 10, 1, '2022-11-03 22:57:22', NULL),
(123, NULL, 'Hobla', 1, 0, '', 11, 1, '2022-11-03 22:57:22', NULL),
(124, NULL, 'Špahtla', 1, 0, '', 11, 1, '2022-11-03 22:57:22', NULL),
(125, NULL, 'Bojler', 1, 0, '', 11, 1, '2022-11-03 22:57:22', NULL),
(126, NULL, 'Prskalica', 1, 0, '', 11, 1, '2022-11-03 22:57:22', NULL),
(127, NULL, 'Orman', 1, 0, '', 11, 1, '2022-11-03 22:57:22', NULL),
(128, NULL, 'Klešta kombinovana', 1, 0, '', 11, 1, '2022-11-03 22:57:22', NULL),
(129, NULL, 'Ravni odvijač', 1, 0, '', 11, 1, '2022-11-03 22:57:22', NULL),
(130, NULL, 'Ispitivač napona', 1, 0, '', 11, 1, '2022-11-03 22:57:22', NULL),
(131, NULL, 'Silikonski pištolj', 1, 0, '', 11, 1, '2022-11-03 22:57:22', NULL),
(132, NULL, 'Sto', 1, 0, '', 11, 1, '2022-11-03 22:57:22', NULL),
(133, NULL, 'Stolica', 1, 0, '', 11, 1, '2022-11-03 22:57:22', NULL),
(134, NULL, 'Korpa za otpatke', 1, 0, '', 11, 1, '2022-11-03 22:57:22', NULL),
(135, NULL, 'Poludisperzija', 3, 0, '', 11, 1, '2022-11-03 22:57:22', NULL),
(136, NULL, 'Valjak veliki', 1, 0, '', 11, 1, '2022-11-03 22:57:22', NULL),
(137, NULL, 'Valjak mali', 1, 0, '', 11, 1, '2022-11-03 22:57:22', NULL),
(138, NULL, 'Četka za mazanje', 2, 0, '', 11, 1, '2022-11-03 22:57:22', NULL),
(139, NULL, 'Labavo', 1, 0, '', 11, 1, '2022-11-03 22:57:22', NULL),
(140, NULL, 'Tabla', 1, 0, '', 12, 1, '2022-11-03 22:57:22', NULL),
(141, NULL, 'Lavabo', 1, 0, '', 12, 1, '2022-11-03 22:57:22', NULL),
(142, NULL, 'Stolica (školska)', 32, 0, '', 12, 1, '2022-11-03 22:57:22', NULL),
(143, NULL, 'Klupa (školska)', 16, 0, '', 12, 1, '2022-11-03 22:57:22', NULL),
(144, 10607, 'Visokonaponski trafo', 1, 0, '', 12, 1, '2022-11-03 22:57:22', NULL),
(145, NULL, 'Korpa za otpatke', 1, 0, '', 12, 1, '2022-11-03 22:57:22', NULL),
(146, NULL, 'Tabla', 1, 0, '', 12, 1, '2022-11-03 22:57:22', NULL),
(147, NULL, 'Reflektor (sala)', 0, 1, '', 12, 1, '2022-11-03 22:57:22', NULL),
(148, NULL, 'Benzinska nosilica', 1, 1, '', 12, 1, '2022-11-03 22:57:22', NULL),
(149, NULL, 'Građevinska kolica', 1, 0, '', 12, 1, '2022-11-03 22:57:22', NULL),
(150, NULL, 'Stolica kancelarijska ', 1, 0, '', 12, 1, '2022-11-03 22:57:22', NULL),
(151, NULL, 'Katedra', 1, 0, '', 12, 1, '2022-11-03 22:57:22', NULL),
(152, NULL, 'Kolica građevinska', 1, 0, '', 12, 1, '2022-11-03 22:57:22', NULL),
(153, NULL, 'Kvarcna peć', 0, 1, '', 12, 1, '2022-11-03 22:57:22', NULL),
(154, NULL, 'Protivpožarni aparat', 0, 0, '', 12, 1, '2022-11-03 22:57:22', NULL),
(155, NULL, 'Trimer', 1, 0, '', 12, 1, '2022-11-03 22:57:22', NULL),
(156, NULL, 'Zidni sat', 1, 0, '', 13, 1, '2022-11-03 22:57:22', NULL),
(157, NULL, 'Bela tabla (školska)', 1, 0, '', 13, 1, '2022-11-03 22:57:22', NULL),
(158, NULL, 'Solarni panel', 1, 0, '', 13, 1, '2022-11-03 22:57:22', NULL),
(159, 10609, 'Vatmetar (nemački)', 1, 0, '', 13, 1, '2022-11-03 22:57:22', NULL),
(160, 10610, 'Distance measuring sensor  GP2ZOA41SKOF', 1, 0, '', 13, 1, '2022-11-03 22:57:22', NULL),
(161, NULL, 'Korpa za otpatke', 1, 0, '', 13, 1, '2022-11-03 22:57:22', NULL),
(162, NULL, 'Držač za projektor (metalni)', 3, 0, '', 13, 1, '2022-11-03 22:57:22', NULL),
(163, NULL, 'Lavabo', 1, 0, '', 13, 1, '2022-11-03 22:57:22', NULL),
(164, 10611, 'Razvodna kutija', 1, 0, '', 13, 1, '2022-11-03 22:57:22', NULL),
(165, NULL, 'Školske-stolice', 4, 0, '', 13, 1, '2022-11-03 22:57:22', NULL),
(166, 10604, 'Natpis za školski štand', 1, 0, '', 13, 1, '2022-11-03 22:57:22', NULL),
(167, 11173, 'Kompresor \"NUAIR\"', 1, 0, '', 13, 1, '2022-11-03 22:57:22', NULL),
(168, NULL, 'Katedra', 1, 0, '', 14, 1, '2022-11-03 22:57:22', NULL),
(169, NULL, 'Tabla (školska)', 1, 0, '', 14, 1, '2022-11-03 22:57:22', NULL),
(170, NULL, 'Stolica (učenička)', 29, 0, '', 14, 1, '2022-11-03 22:57:22', NULL),
(171, NULL, 'Sto (učenički)', 15, 0, '', 14, 1, '2022-11-03 22:57:22', NULL),
(172, NULL, 'Korpa za otpatke', 1, 0, '', 14, 1, '2022-11-03 22:57:22', NULL),
(173, 10612, 'Metalna razvodna tabla', 1, 0, '', 14, 1, '2022-11-03 22:57:22', NULL),
(174, NULL, 'Čiviluk zidni', 1, 0, '', 14, 1, '2022-11-03 22:57:22', NULL),
(175, NULL, 'Lavabo', 1, 0, '', 14, 1, '2022-11-03 22:57:22', NULL),
(176, 10618, 'Razvodna kutija', 1, 0, '', 15, 1, '2022-11-03 22:57:22', NULL),
(177, NULL, 'Lavabo', 1, 0, '', 15, 1, '2022-11-03 22:57:22', NULL),
(178, NULL, 'Ugaona garnitura', 1, 0, '', 15, 1, '2022-11-03 22:57:22', NULL),
(179, NULL, 'Prekrivač (za garnituru)', 1, 0, '', 15, 1, '2022-11-03 22:57:22', NULL),
(180, 10615, 'Sto', 1, 0, '', 15, 1, '2022-11-03 22:57:22', NULL),
(181, NULL, 'Fotelja', 10, 0, '', 15, 1, '2022-11-03 22:57:22', NULL),
(182, NULL, 'Korpa za otpatke', 1, 0, '', 15, 1, '2022-11-03 22:57:22', NULL),
(183, 10616, 'Ogledalo (zidno)', 1, 0, '', 15, 1, '2022-11-03 22:57:22', NULL),
(184, 10617, 'Ormarić za lavabo', 1, 0, '', 15, 1, '2022-11-03 22:57:22', NULL),
(185, NULL, 'Kutija za salvete', 1, 0, '', 15, 1, '2022-11-03 22:57:22', NULL),
(186, NULL, 'Zidni sat', 1, 0, '', 15, 1, '2022-11-03 22:57:22', NULL),
(187, NULL, 'Garnišne za zavese', 3, 0, '', 16, 1, '2022-11-03 22:57:22', NULL),
(188, NULL, 'Korpa za otpatke', 2, 0, '', 16, 1, '2022-11-03 22:57:22', NULL),
(189, 10786, 'Bojler', 1, 0, '', 16, 1, '2022-11-03 22:57:22', NULL),
(190, NULL, 'Lavabo', 1, 0, '', 16, 1, '2022-11-03 22:57:22', NULL),
(191, NULL, 'Zavese', 0, 0, '', 16, 1, '2022-11-03 22:57:22', NULL),
(192, NULL, 'Sto za kantinu', 6, 0, '', 16, 1, '2022-11-03 22:57:22', NULL),
(193, NULL, 'Klupe', 6, 0, '', 16, 1, '2022-11-03 22:57:22', NULL),
(194, NULL, 'Stolice za kantinu', 5, 0, '', 16, 1, '2022-11-03 22:57:22', NULL),
(195, NULL, 'Korpe za smeće', 2, 0, '', 17, 1, '2022-11-03 22:57:22', NULL),
(196, NULL, 'Korpa za otpatke', 2, 0, '', 18, 1, '2022-11-03 22:57:22', NULL),
(197, NULL, 'Tabla - školska', 1, 0, '', 18, 1, '2022-11-03 22:57:22', NULL),
(198, 10613, 'Kosilica za travu', 0, 0, '', 18, 1, '2022-11-03 22:57:22', NULL),
(199, NULL, 'Čiviluk zidni', 3, 0, '', 18, 1, '2022-11-03 22:57:22', NULL),
(200, NULL, 'Klupe za sedenje', 7, 0, '', 18, 1, '2022-11-03 22:57:22', NULL),
(201, NULL, 'Oglasna tabla', 1, 0, '', 18, 1, '2022-11-03 22:57:22', NULL),
(202, NULL, 'Beli sto (visoki)', 1, 0, '', 18, 1, '2022-11-03 22:57:22', NULL),
(203, NULL, 'baštenske klupe', 8, 0, '', 18, 1, '2022-11-03 22:57:22', NULL),
(204, NULL, 'baštenski stolovi ', 2, 0, '', 18, 1, '2022-11-03 22:57:22', NULL),
(205, 1, 'adsad', 123, 0, 'asdasd', 9, 1, '2022-11-10 10:52:34', '2022-11-10 10:52:34'),
(206, 234, 'TEST2', 2, 0, 'TEST222', 11, 1, '2022-11-10 19:33:47', '2022-11-10 19:33:47'),
(207, 123123123, 'asdasdasd', 2, 0, 'asdasd', 8, 1, '2022-11-11 02:53:38', '2022-11-11 02:53:38'),
(208, 123123123, 'asdasdasd', 2, 0, 'asdasd', 8, 1, '2022-11-11 02:53:41', '2022-11-11 02:53:41'),
(209, 123123123, 'asdasdasd', 2, 0, 'asdasd', 8, 1, '2022-11-11 02:53:43', '2022-11-11 02:53:43');

-- --------------------------------------------------------

--
-- Table structure for table `items_old`
--

CREATE TABLE `items_old` (
  `id` int(11) NOT NULL,
  `InventoryID` int(11) NOT NULL,
  `Name` varchar(128) NOT NULL,
  `Type` varchar(128) NOT NULL,
  `Count` int(11) NOT NULL,
  `Classroom` int(11) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `AddedDate` datetime NOT NULL,
  `ModifiedDate` datetime NOT NULL,
  `ModifierID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ranks`
--

CREATE TABLE `ranks` (
  `id` int(11) NOT NULL,
  `Name` varchar(64) NOT NULL,
  `PermissionLevel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ranks`
--

INSERT INTO `ranks` (`id`, `Name`, `PermissionLevel`) VALUES
(1, 'Tanár', 2),
(2, 'Titkár', 3),
(3, 'Jogász', 3),
(4, 'Igazgató-helyettes', 7),
(5, 'Igazgató', 8),
(6, 'Admin', 10);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Token` varchar(64) NOT NULL,
  `Ip` varchar(128) NOT NULL,
  `Date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `UserID`, `Token`, `Ip`, `Date`) VALUES
(2, 2, '', '::1', '2022-11-02 21:18:24'),
(3, 2, '', '::1', '2022-11-02 21:23:29'),
(4, 2, '', '::1', '2022-11-02 21:23:50'),
(5, 2, '', '::1', '2022-11-02 21:25:08'),
(6, 2, 'Y119QsfcnKUAnqyDoRgcCzkG9AAGmHGV', '::1', '2022-11-02 21:25:44'),
(7, 2, '1BK1aakXROU51sbkUcRDMOo6QAneanEa', '::1', '2022-11-02 21:26:18'),
(8, 2, 'EtOOchdXIdQA2aEzFUGoqxVpLh0R8gVO', '::1', '2022-11-02 21:26:38'),
(9, 2, 'BCJREXE1PYFLxbhXc7aWtnSy3ZJzwKd6', '::1', '2022-11-02 21:27:27'),
(16, 1, 'csXqCgcmBLgtKQAxzo6g9nec7c4WrMUy', '::1', '2022-11-02 22:04:32'),
(18, 5, 'UcyBWIfTVNnYSpESk3ytBRXCn7XlZYp3', '::1', '2022-11-10 21:00:35'),
(19, 1, '7wJCw0pS5uSJV4IfAXDyQYcO1vreZOad', '::1', '2022-11-10 23:00:21'),
(20, 1, 'Mk6G1RD3kkrgrcBHrJilS3bbe7uSGdMe', '::1', '2022-11-10 23:01:38'),
(21, 1, 'bMHijRYq43a2U1mQ5LBcUFTR0UyKuIIZ', '::1', '2022-11-10 23:02:08'),
(22, 1, '890Np0bblXQ3QTlS2MJJ9BX3xnncOkRp', '::1', '2022-11-10 23:02:26'),
(44, 1, 'bJg4mjFqNF7yFcCkXE7Gv7xVQPvqtbXh', '::1', '2022-11-11 02:38:39'),
(48, 1, 'LqybffN7gLFqnkkJZijiA9NjK7Z3WISq', '::1', '2022-11-11 02:53:14'),
(50, 1, '4cWWZ1cs4LjiwkCkKdjf9mSTtFZJ4dVL', '::1', '2022-11-11 02:57:47'),
(51, 1, 'YlIXNB9TkxeDN9h6RKSYFrDiencTbYwf', '::1', '2022-11-11 03:00:12'),
(52, 1, 'FLtMdqP8UpN4Muh30F531P5oOmEu7A3t', '::1', '2022-11-11 03:00:40');

-- --------------------------------------------------------

--
-- Table structure for table `twofalogins`
--

CREATE TABLE `twofalogins` (
  `id` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Token` varchar(32) NOT NULL,
  `Date` datetime NOT NULL,
  `Ip` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `twofalogins`
--

INSERT INTO `twofalogins` (`id`, `UserID`, `Token`, `Date`, `Ip`) VALUES
(11, 1, 'P5nHMdzAEDCW8F1CrHZg6gE2yAIW61An', '2022-11-11 00:13:56', '::1'),
(12, 1, 'tETWI2Ex0neGzhJUOHP0oMrosCXJfPHY', '2022-11-11 00:17:30', '::1'),
(13, 1, 'oa9xQxvNOXqWJ14Zenld6XVR9eK00FEv', '2022-11-11 00:17:56', '::1'),
(14, 1, 'D18eXttFq19DAXCbgwK1hdyx21WMshF9', '2022-11-11 00:19:28', '::1'),
(15, 1, 'UXXmwKPrurS7h1wNdPZjx0UQuwj2tvrr', '2022-11-11 00:20:01', '::1'),
(16, 1, 'dLzun9gZ4Yz1UsoNC0YCkANHIvw9SMiX', '2022-11-11 00:22:50', '::1'),
(17, 1, 'q2D0bqyR6vqoOqTTV13uDbCa2RPUHcfn', '2022-11-11 02:09:36', '::1'),
(18, 1, '42ujWGaQVdzLsBs1p6Vn0dx26tjgcLw6', '2022-11-11 02:10:47', '::1'),
(19, 1, 'CMfgiPBukbRn6TkLpLRIQ9NQfkma4eZb', '2022-11-11 02:11:37', '::1'),
(21, 1, 'PcPor7EuQ1ot06FCa0khG5iQYSY8clIW', '2022-11-11 02:13:01', '::1'),
(23, 1, 'XrAHvSGUYTyRKr0CzB5HcEeSvCp3Oivx', '2022-11-11 02:16:20', '::1'),
(28, 1, 'p2sAPESG9hnezmqKCZ1EOlWY049SmrN9', '2022-11-11 02:23:37', '::1'),
(29, 1, 'y18R2FUfW48oeBs9wuWGdOFx0f8bZ2Kf', '2022-11-11 02:24:01', '::1'),
(44, 1, 'g1SiQkBtoLBSozcrtZScZQHavPCLfVfq', '2022-11-11 02:44:54', '::1'),
(45, 1, 'OE4Y1KoZDtCiuaruxzPSC3vZA8QKHtBT', '2022-11-11 02:51:10', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `Username` varchar(128) NOT NULL,
  `Password` varchar(256) NOT NULL,
  `FullName` varchar(128) NOT NULL,
  `Email` varchar(128) NOT NULL,
  `Rank` int(11) NOT NULL,
  `Secret` varchar(256) NOT NULL,
  `AvatarURL` varchar(256) NOT NULL DEFAULT 'DefaultAvatar.png',
  `LastLoginDate` datetime NOT NULL,
  `RegisterDate` datetime NOT NULL,
  `Flag` varchar(64) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `Username`, `Password`, `FullName`, `Email`, `Rank`, `Secret`, `AvatarURL`, `LastLoginDate`, `RegisterDate`, `Flag`) VALUES
(1, 'a', '$2a$12$r0a6PSuF9WtpSAY6dOyp5OCtZMR65IcnHd3omQc3tFSPx2pcyNs6a', 'Kekenj Sabolc', '', 2, 'u^glemo:}s?dEgPP#]}bF%#CPA9:ei/e', '1668108034954kekeny-logo.png', '2022-11-11 00:13:11', '2022-10-28 23:46:30', 'Active'),
(2, 'b', '$2b$10$1trR4WyCrpn8khOxjWUQXe0Oq6pv/5G3Ph3bzQbBFc6eVIjvDNa0C', 'asd asd', '', 6, '', 'DefaultAvatar.png', '2022-11-02 21:27:27', '2022-10-29 01:12:13', 'Active'),
(3, 'c', 'c', 'c c', '', 6, '', 'DefaultAvatar.png', '2022-11-02 22:40:02', '2022-11-02 22:40:02', 'Deleted'),
(4, 'test', '$2b$10$O2IzZf0r6p2XTFC/9o1LlOd9jreZZ/ywRSOX6HZr2jzOmNDiF7mcm', 'test', 'test@.com', 1, '', 'DefaultAvatar.png', '2022-11-10 20:56:37', '2022-11-10 20:56:37', 'Active'),
(5, 'Zsolt', '$2b$10$VWAU1nEr.xKqy18LjZxoq.Oooel0GqlnO5EA9ghC9Bu5VrGB.tE72', 'Tóth Zsolt', 'toth@zsolt.com', 2, '', 'DefaultAvatar.png', '2022-11-10 21:00:35', '2022-11-10 21:00:06', 'Active'),
(6, 'asdasdasd', '$2b$10$Av5xaXj7/8Wk5wEFIZxUvOQWm5DF3EdOLQXL2jtGia2lFZj49VZAO', 'asdasd', 'asd@.com', 2, '', 'DefaultAvatar.png', '2022-11-11 02:54:15', '2022-11-11 02:54:15', 'Active'),
(7, 'asdasdasd', '$2b$10$0xxkjvSrSEkTemgP1sDQau1I7do9celm2UJ/atfroAwTDxGbm1EcW', 'asdasd', 'asd@.com', 2, '', 'DefaultAvatar.png', '2022-11-11 02:54:16', '2022-11-11 02:54:16', 'Active'),
(8, 'asdasdasd', '$2b$10$056lXuSEPKsOf..zO3zHhOaM/8qvGT0vJ9DGRcSbx2bbd0S7fjPqa', 'asdasd', 'asd@.com', 2, '', 'DefaultAvatar.png', '2022-11-11 02:54:19', '2022-11-11 02:54:19', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classrooms`
--
ALTER TABLE `classrooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ITEMS_CLASSROOMS_TO_CLASSROM_NEW` (`Classroom`),
  ADD KEY `ITEMS_MODIFIERID_TO_USERS_NEW` (`Modifier`);

--
-- Indexes for table `items_old`
--
ALTER TABLE `items_old`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ITEMS_CLASSROOMS_TO_CLASSROM` (`Classroom`),
  ADD KEY `ITEMS_MODIFIERID_TO_USERS` (`ModifierID`);

--
-- Indexes for table `ranks`
--
ALTER TABLE `ranks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_userid_to_users_id` (`UserID`);

--
-- Indexes for table `twofalogins`
--
ALTER TABLE `twofalogins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `USERS_RANK_TO_RANK_ID` (`Rank`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classrooms`
--
ALTER TABLE `classrooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=210;

--
-- AUTO_INCREMENT for table `items_old`
--
ALTER TABLE `items_old`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ranks`
--
ALTER TABLE `ranks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `twofalogins`
--
ALTER TABLE `twofalogins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `ITEMS_CLASSROOMS_TO_CLASSROM_NEW` FOREIGN KEY (`Classroom`) REFERENCES `classrooms` (`id`),
  ADD CONSTRAINT `ITEMS_MODIFIERID_TO_USERS_NEW` FOREIGN KEY (`Modifier`) REFERENCES `users` (`id`);

--
-- Constraints for table `items_old`
--
ALTER TABLE `items_old`
  ADD CONSTRAINT `ITEMS_CLASSROOMS_TO_CLASSROM` FOREIGN KEY (`Classroom`) REFERENCES `classrooms` (`id`),
  ADD CONSTRAINT `ITEMS_MODIFIERID_TO_USERS` FOREIGN KEY (`ModifierID`) REFERENCES `users` (`id`);

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `session_userid_to_users_id` FOREIGN KEY (`UserID`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `USERS_RANK_TO_RANK_ID` FOREIGN KEY (`Rank`) REFERENCES `ranks` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
