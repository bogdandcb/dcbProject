SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
--
CREATE DATABASE `b_manager_cautari` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `b_manager_cautari`;

-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `nume` varchar(30) DEFAULT NULL,
  `varsta` int(10) NOT NULL,
  `ocupatie` varchar(30) DEFAULT NULL,
  `hobby` varchar(30) DEFAULT NULL,
  `data` varchar(30) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `cautari_recente` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` smallint(5) DEFAULT NULL,
  `istoric_cautari` varchar(30) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id_cautari` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;



