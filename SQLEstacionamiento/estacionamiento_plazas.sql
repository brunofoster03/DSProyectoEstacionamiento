-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: estacionamiento
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `plazas`
--

DROP TABLE IF EXISTS `plazas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plazas` (
  `ID` int NOT NULL,
  `Identificador` varchar(15) NOT NULL,
  `Piso` varchar(10) NOT NULL,
  `Plaza` varchar(15) NOT NULL,
  `Estado` varchar(10) NOT NULL DEFAULT 'Libre',
  `Habilitado` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plazas`
--

LOCK TABLES `plazas` WRITE;
/*!40000 ALTER TABLE `plazas` DISABLE KEYS */;
INSERT INTO `plazas` VALUES (1,'1-1','1','1','Ocupado','Si'),(2,'1-2','1','2','Ocupado','Si'),(3,'1-3','1','3','Ocupado','Si'),(4,'1-4','1','4','Ocupado','Si'),(5,'1-5','1','5','Ocupado','Si'),(6,'1-6','1','6','Ocupado','Si'),(7,'1-7','1','7','Libre','Si'),(8,'1-8','1','8','Libre','Si'),(9,'1-9','1','9','Libre','Si'),(10,'1-10','1','10','Libre','Si'),(11,'S1-1','-1','1','Libre','Si'),(12,'S1-2','-1','2','Libre','Si'),(13,'S1-3','-1','3','Libre','Si'),(14,'S1-4','-1','4','Libre','Si'),(15,'S1-5','-1','5','Libre','Si'),(16,'S1-6','-1','6','Libre','Si'),(17,'S1-7','-1','7','Libre','Si'),(18,'S1-8','-1','8','Libre','Si'),(19,'S1-9','-1','9','Libre','Si'),(20,'S1-10','-1','10','Libre','Si'),(21,'2-1','2','1','Libre','Si'),(22,'2-2','2','2','Libre','Si'),(23,'2-3','2','3','Libre','Si'),(24,'2-4','2','4','Libre','Si'),(25,'2-5','2','5','Libre','Si'),(26,'2-6','2','6','Libre','Si'),(27,'2-7','2','7','Libre','Si'),(28,'2-8','2','8','Libre','Si'),(29,'2-9','2','9','Libre','Si'),(30,'2-10','2','10','Libre','Si'),(31,'3-1','3','1','Libre','Si'),(32,'3-2','3','2','Libre','Si'),(33,'3-3','3','3','Libre','Si'),(34,'3-4','3','4','Libre','Si'),(35,'3-5','3','5','Libre','Si'),(36,'3-6','3','6','Libre','Si'),(37,'3-7','3','7','Libre','Si'),(38,'3-8','3','8','Libre','Si'),(39,'3-9','3','9','Libre','Si'),(40,'3-10','3','10','Libre','Si'),(41,'4-1','4','1','Libre','Si'),(42,'4-2','4','2','Libre','Si'),(43,'4-3','4','3','Libre','Si'),(44,'4-4','4','4','Libre','Si'),(45,'4-5','4','5','Libre','Si'),(46,'4-6','4','6','Libre','Si'),(47,'4-7','4','7','Libre','Si'),(48,'4-8','4','8','Libre','Si'),(49,'4-9','4','9','Libre','Si'),(50,'4-10','4','10','Libre','Si'),(51,'5-1','5','1','Libre','Si'),(52,'5-2','5','2','Libre','Si'),(53,'5-3','5','3','Libre','Si'),(54,'5-4','5','4','Libre','Si'),(55,'5-5','5','5','Libre','Si'),(56,'5-6','5','6','Libre','Si'),(57,'5-7','5','7','Libre','Si'),(58,'5-8','5','8','Libre','Si'),(59,'5-9','5','9','Libre','Si'),(60,'5-10','5','10','Libre','Si'),(61,'6-1','6','1','Libre','Si'),(62,'6-2','6','2','Libre','Si'),(63,'6-3','6','3','Libre','Si'),(64,'6-4','6','4','Libre','Si'),(65,'6-5','6','5','Libre','Si'),(66,'6-6','6','6','Libre','Si'),(67,'6-7','6','7','Libre','Si'),(68,'6-8','6','8','Libre','Si'),(69,'6-9','6','9','Libre','Si'),(70,'6-10','6','10','Libre','Si'),(71,'7-1','7','1','Libre','Si'),(72,'7-2','7','2','Libre','Si'),(73,'7-3','7','3','Libre','Si'),(74,'7-4','7','4','Libre','Si'),(75,'7-5','7','5','Libre','Si'),(76,'7-6','7','6','Libre','Si'),(77,'7-7','7','7','Libre','Si'),(78,'7-8','7','8','Libre','Si'),(79,'7-9','7','9','Libre','Si'),(80,'7-10','7','10','Libre','Si'),(81,'8-1','8','1','Libre','No'),(82,'8-2','8','2','Libre','No'),(83,'8-3','8','3','Libre','No'),(84,'8-4','8','4','Libre','No'),(85,'8-5','8','5','Libre','No'),(86,'8-6','8','6','Libre','No'),(87,'8-7','8','7','Libre','No'),(88,'8-8','8','8','Libre','No'),(89,'8-9','8','9','Libre','No'),(90,'8-10','8','10','Libre','No'),(91,'9-1','9','1','Libre','No'),(92,'9-2','9','2','Libre','No'),(93,'9-3','9','3','Libre','No'),(94,'9-4','9','4','Libre','No'),(95,'9-5','9','5','Libre','No'),(96,'9-6','9','6','Libre','No'),(97,'9-7','9','7','Libre','No'),(98,'9-8','9','8','Libre','No'),(99,'9-9','9','9','Libre','No'),(100,'9-10','9','10','Libre','No'),(101,'S2-1','-2','1','Libre','Si'),(102,'S2-2','-2','2','Libre','Si'),(103,'S2-3','-2','3','Libre','Si'),(104,'S2-4','-2','4','Libre','Si'),(105,'S2-5','-2','5','Libre','Si'),(106,'S2-6','-2','6','Libre','Si'),(107,'S2-7','-2','7','Libre','Si'),(108,'S2-8','-2','8','Libre','Si'),(109,'S2-9','-2','9','Libre','Si'),(110,'S2-10','-2','10','Libre','Si'),(111,'S3-1','-3','1','Libre','No'),(112,'S3-2','-3','2','Libre','No'),(113,'S3-3','-3','3','Libre','No'),(114,'S3-4','-3','4','Libre','No'),(115,'S3-5','-3','5','Libre','No'),(116,'S3-6','-3','6','Libre','No'),(117,'S3-7','-3','7','Libre','No'),(118,'S3-8','-3','8','Libre','No'),(119,'S3-9','-3','9','Libre','No'),(120,'S3-10','-3','10','Libre','No');
/*!40000 ALTER TABLE `plazas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-18 12:24:00
