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
  `bowler_id` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ball`
--

LOCK TABLES `ball` WRITE;
/*!40000 ALTER TABLE `ball` DISABLE KEYS */;
INSERT INTO `ball` VALUES (1,1,0,0,0,0,'0',0,1,NULL,NULL,NULL,NULL),(2,1,0,0,0,6,'6',0,2,NULL,NULL,NULL,NULL),(3,1,0,0,0,0,'0',1,1,'cd4be55d-44b1-11e5-b147-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(4,1,0,0,0,0,'0',1,2,'cd4be55d-44b1-11e5-b147-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(5,1,0,0,0,0,'0',1,3,'cd4be55d-44b1-11e5-b147-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(6,1,0,0,0,0,'0',1,4,'cd4be55d-44b1-11e5-b147-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(7,1,0,0,0,0,'0',1,5,'cd4be55d-44b1-11e5-b147-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(8,1,0,0,0,0,'0',1,6,'cd4be55d-44b1-11e5-b147-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(9,1,0,0,0,0,'0',2,1,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(10,1,0,0,0,0,'0',2,2,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(11,1,0,0,0,0,'0',2,3,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(12,1,0,0,0,0,'0',2,4,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(13,1,0,0,0,0,'0',2,5,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(14,1,0,0,0,0,'0',2,6,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(15,1,0,0,0,0,'0',2,1,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(16,1,0,0,0,0,'0',2,2,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(17,1,0,0,0,0,'0',2,3,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(18,1,0,0,0,0,'0',2,4,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(19,1,0,0,0,0,'0',2,5,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(20,1,0,0,0,0,'0',2,6,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(21,1,0,0,0,0,'0',2,1,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(22,1,0,0,0,0,'0',2,2,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(23,1,0,0,0,0,'0',2,3,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(24,1,0,0,0,0,'0',2,4,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(25,1,0,0,0,0,'0',2,5,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(26,1,0,0,0,0,'0',2,6,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(27,1,0,0,0,0,'0',2,1,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(28,1,0,0,0,0,'0',2,2,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(29,1,0,0,0,0,'0',2,3,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(30,1,0,0,0,0,'0',2,4,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(31,1,0,0,0,0,'0',2,5,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(32,1,0,0,0,0,'0',2,6,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(33,1,0,1,0,0,'1',2,1,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(34,1,0,0,0,0,'0',2,1,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(35,1,0,0,0,0,'0',2,2,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(36,1,0,0,0,0,'0',2,3,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(37,1,0,0,0,0,'0',2,4,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(38,1,0,0,0,0,'0',2,5,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(39,1,0,0,0,0,'0',2,6,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(40,1,0,0,0,0,'0',2,1,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(41,1,0,0,0,0,'0',2,2,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(42,1,0,0,0,0,'0',2,3,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(43,1,0,0,0,0,'0',2,4,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(44,1,0,0,0,0,'0',2,5,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(45,1,0,0,0,0,'0',2,6,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(46,2,0,0,0,0,'0',2,1,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(47,2,0,0,0,0,'0',2,2,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(48,2,0,0,0,0,'0',2,3,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(49,2,0,0,0,0,'0',2,4,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(50,2,0,0,0,0,'0',2,5,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(51,2,0,0,0,0,'0',2,6,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(52,1,0,0,0,0,'0',2,1,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(53,1,0,0,0,0,'0',2,2,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(54,1,0,0,0,0,'0',2,3,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(55,1,0,0,0,0,'0',2,4,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(56,1,0,0,0,0,'0',2,5,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(57,1,0,0,0,0,'0',2,6,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(58,2,0,0,0,0,'0',2,1,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(59,2,0,0,0,0,'0',2,2,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(60,2,0,0,0,0,'0',2,3,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(61,2,0,0,0,6,'6',2,4,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(62,2,0,0,0,0,'0',2,5,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(63,2,0,0,0,0,'0',2,6,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(64,3,0,0,0,1,'1',2,1,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(65,3,0,0,0,1,'1',5,2,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(66,3,0,0,0,1,'1',2,3,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(67,3,0,0,0,1,'1',5,4,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(68,3,0,0,0,1,'1',2,5,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(69,3,0,0,0,1,'1',5,6,'52bbd2ed-457b-11e5-aec0-94de80c7','3e527be1-4253-11e5-b03f-554c22cd',NULL,NULL),(70,1,0,0,0,0,'0',1,1,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(71,1,0,0,0,0,'0',1,2,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(72,1,0,0,0,6,'6',1,3,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(73,1,0,0,0,6,'6',1,4,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(74,1,0,0,0,0,'0',1,5,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(75,1,0,0,0,0,'0',1,6,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(76,2,0,0,0,0,'0',1,1,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(77,2,0,0,0,6,'6',1,2,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(78,2,0,1,0,0,'1',1,3,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(79,2,0,1,0,0,'1',1,3,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(80,2,0,0,0,0,'0',1,3,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(81,2,0,0,0,0,'0',1,4,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(82,2,0,0,0,0,'0',1,5,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(83,2,0,0,0,0,'0',1,6,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(84,3,0,0,0,0,'0',1,1,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(85,3,0,0,0,0,'0',1,2,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(86,3,0,0,0,0,'0',1,3,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(87,3,0,0,0,0,'0',1,4,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(88,3,0,0,0,0,'0',1,5,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(89,3,0,0,0,0,'0',1,6,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(90,1,0,1,0,4,'5',1,1,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(91,1,0,0,0,3,'3',1,1,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(92,1,0,0,0,6,'6',4,2,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(93,1,0,0,0,0,'0',4,3,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(94,1,0,0,0,0,'0',4,4,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(95,1,0,0,0,0,'0',4,5,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(96,1,0,0,0,0,'0',4,6,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(97,2,0,0,1,0,'0',1,1,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(98,2,0,0,0,5,'5',4,2,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(99,1,0,0,0,1,'1',1,1,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(100,1,0,0,0,2,'2',4,2,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(101,1,0,0,0,6,'6',4,3,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(102,1,0,0,0,2,'2',4,4,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(103,1,0,0,0,3,'3',4,5,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(104,1,0,0,0,2,'2',1,6,'a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(105,1,0,0,0,6,'6',1,1,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(106,1,0,0,0,0,'0',1,2,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(107,1,0,0,0,0,'0',1,3,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(108,1,0,0,0,0,'0',1,4,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(109,1,0,0,0,0,'0',1,5,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(110,1,0,0,0,0,'0',1,6,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(111,2,0,0,0,4,'4',1,1,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(112,1,0,0,0,6,'6',4,1,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(113,1,0,0,0,0,'0',4,2,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(114,1,0,0,0,0,'0',4,3,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(115,1,0,0,0,0,'0',4,4,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(116,1,0,0,0,0,'0',4,5,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(117,1,0,0,0,0,'0',4,6,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(118,1,0,0,0,6,'6',1,1,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(119,1,0,0,1,0,'0',1,2,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(120,1,0,0,0,2,'2',1,1,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(121,1,0,0,0,1,'1',1,2,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(122,1,0,0,0,5,'5',4,3,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(123,1,0,0,1,6,'6',4,4,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(124,1,0,0,0,5,'5',1,1,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(125,1,0,0,1,0,'0',4,2,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(126,2,0,0,0,4,'4',6,1,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL),(127,2,0,0,1,0,'0',4,2,'e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd',NULL,NULL);
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
INSERT INTO `match_info` VALUES ('52bbd2ed-457b-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd','3e527be1-4253-11e5-b03f-554c22cd','',NULL,4,4,'2015-08-18 13:02:47','bowl','3e527be0-4253-11e5-b03f-554c22cd'),('a3d9253d-4593-11e5-aec0-94de80c7','3e527be0-4253-11e5-b03f-554c22cd','3e527be1-4253-11e5-b03f-554c22cd','',NULL,4,4,'2015-08-18 15:56:51','bat','3e527be0-4253-11e5-b03f-554c22cd'),('cd4be55d-44b1-11e5-b147-94de80c7','3e527be0-4253-11e5-b03f-554c22cd','3e527be1-4253-11e5-b03f-554c22cd','',NULL,5,5,'2015-08-17 13:00:14','bowl','3e527be1-4253-11e5-b03f-554c22cd'),('e5333e13-4b0e-11e5-89d8-94de80c7','3e527be0-4253-11e5-b03f-554c22cd','3e527be2-4253-11e5-b03f-554c22cd','',NULL,3,3,'2015-08-25 15:21:45','bowl','3e527be2-4253-11e5-b03f-554c22cd');
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,'3e527be0-4253-11e5-b03f-554c22cd','vikash','kumar','9035227134','vikash.kumar@osscube.com','Noida',NULL,NULL,NULL,NULL,NULL,'e5333e13-4b0e-11e5-89d8-94de80c7','OSS/25/412'),(2,'3e527be1-4253-11e5-b03f-554c22cd','jyoti','kumari','9035227134','jyoti.kumari@osscube.com','Noida',NULL,NULL,NULL,NULL,NULL,'a3d9253d-4593-11e5-aec0-94de80c7','OSS/25/404'),(3,'3e527be2-4253-11e5-b03f-554c22cd','mohit','gupta','453554545','mohit@osscube.com','Noida',NULL,NULL,NULL,NULL,NULL,'e5333e13-4b0e-11e5-89d8-94de80c7','OSS/25/425'),(4,'3e527be0-4253-11e5-b03f-554c22cd','sanchit','puri','9','sanchit@osscube.com','Noida',NULL,NULL,NULL,NULL,NULL,'e5333e13-4b0e-11e5-89d8-94de80c7','OSS/25/425'),(5,'3e527be1-4253-11e5-b03f-554c22cd','amber','sharma','889868668','amber@osscube.com','Noida',NULL,NULL,NULL,NULL,NULL,'a3d9253d-4593-11e5-aec0-94de80c7','OSS/25/425'),(6,'3e527be0-4253-11e5-b03f-554c22cd','Deepak','garg','8888888','deepak@osscube.com','Noida',NULL,NULL,NULL,NULL,NULL,'e5333e13-4b0e-11e5-89d8-94de80c7','OSS/25/425'),(7,'3e527be0-4253-11e5-b03f-554c22cd','Manish','Gadhock','67867867','manish@gmail.com','dsgghdfghs',NULL,NULL,NULL,NULL,NULL,NULL,'OSS/25/425'),(8,'0','Manish','Gadhock','67867867','manish@gmail.com','dsgghdfghs',NULL,NULL,NULL,NULL,NULL,NULL,'OSS/25/425'),(9,'0','vikash','kumar','9035227134','vikash.kumar@osscube.com','Noida',NULL,NULL,NULL,NULL,NULL,NULL,'OSS/25/425'),(10,'0','vikash','kumar','9035227134','vikash44.kumar@osscube.com','Noida',NULL,NULL,NULL,NULL,NULL,NULL,'OSS/25/425'),(11,'0','vikash','sds','9035227134','vikash.kumar@osscube.comddd','Noida',NULL,NULL,NULL,NULL,NULL,NULL,'OSS/25/425'),(12,'0','vikash','kumar','9035227134','vikashhhh.kumar@osscube.com','Noida',NULL,NULL,NULL,NULL,NULL,NULL,'OSS/25/425');
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
  `tournament_id` char(32) DEFAULT NULL,
  `team_name` varchar(100) DEFAULT NULL,
  `captain` varchar(50) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `no_of_won_match` int(5) DEFAULT NULL,
  `no_of_loss_match` int(5) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES ('3e527be0-4253-11e5-b03f-554c22cd','3e4c1340-4253-11e5-b03f-554c22cd','Team 1','Captain 1','',0,0,''),('3e527be1-4253-11e5-b03f-554c22cd','3e4c1340-4253-11e5-b03f-554c22cd','Team 2','Captain 2','3e527be1-4253-11e5-b03f-554c22cd.jpg',0,0,''),('3e527be2-4253-11e5-b03f-554c22cd','3e4c1340-4253-11e5-b03f-554c22cd','Team 3','Captain 3','',0,0,''),('3e527be3-4253-11e5-b03f-554c22cd','3e4c1340-4253-11e5-b03f-554c22cd','Team 4','Captain 4','',0,0,''),('abdc45c0-4253-11e5-b502-94de80c7','86b990ff-4253-11e5-b502-94de80c7','Team 1','Captain 1','',0,0,'');
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
INSERT INTO `tournament` VALUES ('3e4c1340-4253-11e5-b03f-554c22cd','OPL 3',2015,4,14),('86b990ff-4253-11e5-b502-94de80c7','OPL 2',2014,1,12);
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

-- Dump completed on 2015-08-28 18:27:40
