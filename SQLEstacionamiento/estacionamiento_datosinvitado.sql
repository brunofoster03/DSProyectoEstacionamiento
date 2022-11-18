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
-- Table structure for table `datosinvitado`
--

DROP TABLE IF EXISTS `datosinvitado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datosinvitado` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Patente` varchar(20) NOT NULL,
  `Año` varchar(20) NOT NULL,
  `Mes` varchar(20) NOT NULL,
  `Dia` varchar(20) NOT NULL,
  `Entrada` varchar(10) NOT NULL,
  `Salida` varchar(10) NOT NULL,
  `Plaza` varchar(20) NOT NULL DEFAULT 'Sin plaza',
  `Estado` varchar(10) NOT NULL DEFAULT 'No pago',
  `Total` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datosinvitado`
--

LOCK TABLES `datosinvitado` WRITE;
/*!40000 ALTER TABLE `datosinvitado` DISABLE KEYS */;
INSERT INTO `datosinvitado` VALUES (1,'A156OCJ','2022','11','15','10:30','12:00','1-1','Pago','1000'),(27,'A9JCJ9A','2022','11','15','08:00','12:30','1-2','Pago','3000'),(30,'SBC9A','2022','11','15','06:30','11:00','2-9','Pago','3500'),(33,'LANA139','2022','11','18','04:30','07:30','1-5','Pago','2000'),(34,'LANALUZ938','2022','11','18','01:00','07:00','1-6','Pago','4000'),(35,'QATAR2022','2022','11','18','22:00','02:30','1-7','Pago','3600');
/*!40000 ALTER TABLE `datosinvitado` ENABLE KEYS */;
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
