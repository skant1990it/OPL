-- MySQL dump 10.13  Distrib 5.5.44, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: OPL
-- ------------------------------------------------------
-- Server version	5.5.44-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'vikash.kumar@osscube.com','vikash');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ball`
--

DROP TABLE IF EXISTS `ball`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ball` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `over_id` int(3) NOT NULL,
  `wide` int(11) NOT NULL,
  `noball` int(3) NOT NULL,
  `wicket` int(3) NOT NULL,
  `run` int(3) NOT NULL,
  `score` varchar(50) NOT NULL,
  `batsman_id` int(3) DEFAULT NULL,
  `ball_id` int(3) DEFAULT NULL,
  `match_id` char(32) DEFAULT NULL,
  `team_id` char(32) DEFAULT NULL,
  `tournament_id` char(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ball`
--

LOCK TABLES `ball` WRITE;
/*!40000 ALTER TABLE `ball` DISABLE KEYS */;
/*!40000 ALTER TABLE `ball` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_info`
--

DROP TABLE IF EXISTS `match_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `match_info` (
  `id` char(32) NOT NULL DEFAULT '',
  `first_team` char(32) DEFAULT NULL,
  `second_team` char(32) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `winning_team` char(32) DEFAULT NULL,
  `total_over` int(3) NOT NULL,
  `over_limit` int(3) NOT NULL,
  `match_date` datetime DEFAULT NULL,
  `opt_for` enum('bat','bowl') DEFAULT NULL,
  `toss_won` char(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_info`
--

LOCK TABLES `match_info` WRITE;
/*!40000 ALTER TABLE `match_info` DISABLE KEYS */;
INSERT INTO `match_info` VALUES ('76034a60-3f5f-11e5-8e65-94de80c7','1','2','','',3,3,'2015-08-10 18:28:13',NULL,NULL),('7d9fa995-3f5f-11e5-8e65-94de80c7','2','1','','',32,32,'2015-08-10 18:28:26',NULL,NULL),('8afee2ac-3ff6-11e5-8fdf-94de80c7','1','2','','',5,5,'2015-08-11 12:29:43',NULL,NULL),('957af4f0-4030-11e5-8fdf-94de80c7','2','1','','',3,3,'2015-08-11 19:25:11','bat','2'),('d6717519-40c1-11e5-a677-94de80c7','1','2','','',4,4,'2015-08-12 12:44:57',NULL,NULL);
/*!40000 ALTER TABLE `match_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_team`
--

DROP TABLE IF EXISTS `match_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `match_team` (
  `id` int(3) NOT NULL,
  `match_id` int(3) NOT NULL,
  `score` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_team`
--

LOCK TABLES `match_team` WRITE;
/*!40000 ALTER TABLE `match_team` DISABLE KEYS */;
/*!40000 ALTER TABLE `match_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `over`
--

DROP TABLE IF EXISTS `over`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `over` (
  `id` int(3) NOT NULL,
  `match_id` char(32) DEFAULT NULL,
  `team_id` char(32) DEFAULT NULL,
  `six` int(3) NOT NULL,
  `four` int(3) NOT NULL,
  `run` int(3) NOT NULL,
  `wicket` int(3) NOT NULL,
  `bowler_id` int(3) NOT NULL,
  `wide` int(3) NOT NULL,
  `noball` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `over`
--

LOCK TABLES `over` WRITE;
/*!40000 ALTER TABLE `over` DISABLE KEYS */;
/*!40000 ALTER TABLE `over` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `team_id` char(32) DEFAULT '0',
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `run` int(5) DEFAULT NULL,
  `wicket` int(5) DEFAULT NULL,
  `no_of_match` int(4) DEFAULT NULL,
  `no_of_six` int(4) DEFAULT NULL,
  `match_id` char(32) DEFAULT NULL,
  `oss_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,'1','vikash','kumar','9035227134','vikash.kumar@osscube.com','Noida',NULL,NULL,NULL,NULL,NULL,NULL,'OSS/25/412'),(2,'2','jyoti','kumari','9035227134','jyoti.kumari@osscube.com','Noida',NULL,NULL,NULL,NULL,NULL,NULL,'OSS/25/404');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `id` char(32) NOT NULL DEFAULT '',
  `team_name` varchar(100) DEFAULT NULL,
  `captain` varchar(50) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `no_of_won_match` int(5) DEFAULT NULL,
  `no_of_loss_match` int(5) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `tournament_id` char(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES ('1','Team A','Amber sharma',NULL,NULL,NULL,NULL,NULL),('2','Team B','Shashank verma',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament`
--

DROP TABLE IF EXISTS `tournament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tournament` (
  `id` char(32) NOT NULL,
  `tournament_name` varchar(100) NOT NULL,
  `tournament_year` int(4) NOT NULL,
  `no_of_teams` int(3) NOT NULL,
  `max_number_of_players` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament`
--

LOCK TABLES `tournament` WRITE;
/*!40000 ALTER TABLE `tournament` DISABLE KEYS */;
INSERT INTO `tournament` VALUES ('7d9b3ae1-40ba-11e5-99e5-902b3447','OPL 1',2014,5,14),('e1ffae40-401c-11e5-8e7a-2f2432fe','OPL 2',2015,4,12);
/*!40000 ALTER TABLE `tournament` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-08-12 13:45:09
