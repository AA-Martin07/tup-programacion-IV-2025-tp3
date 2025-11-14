-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: programacion-4
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password_hash` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (9,'Jose Argento','pepeadmin2@gmail.com','$2b$12$dPWCSriz8EiIjshi2cL0.O7CYbSvTjmiQYu5t.eAJkrhp1i8Awhhm'),(10,'jose','jose123@gmail.com','$2b$12$arfLNCuJUVCcA1sVps1kEuIIR8QcFjJGJ27DRUvwBS/f9MIk1GOZS'),(11,'aaadas','sasasasasa@gmail.com','$2b$12$wy93hHO7AnMT5yCXxK9MueCdMJXs5qbwPGLxc3J12eI9rESm6ZOoy'),(12,'dsdada','dsadasdasd@sasa.com','$2b$12$zlNJOuFxGgb0knlV.6CjPO24PUCZM5AQSQnI.3e/d1DkZlMAxeLIW'),(13,'comunUser','comunUser@gmail.com','$2b$12$Vk.dfAXHQoq3rJSXIF91huV.YbJFEQG3g3BdeeHL39Zxs33rVg1Au'),(15,'jese rodriguez','jese@gmail.com','$2b$12$9FdTwXUwWI0Ltmv/WTqnNepqO1rt.3SOzVZn1xLOSahfs5Etfgu56'),(17,'jese rodriguez','jeseR@gmail.com','$2b$12$iDcvSf52ZdssRQJ/vDIt3.YK3j8MERRw1EUawMZtLcu9WlI8e6ENS'),(18,'jese rodriguez','jeseRdz@gmail.com','$2b$12$E7X47eoAxHvySmJnmhMK/.TjhX8H6XkCL4moSh5W2XUSynmLcZSw.'),(19,'jese rodriguez','jeseee@gmail.com','$2b$12$8um8ese2dYJExfBFKcv79.8TmYG0D/idvj2AZmsiwW9BMbMAQFjY6'),(20,'jese rodriguez','jesee@gmail.com','$2b$12$XbOjXIJB3fueZuDkHQQmiOLT1OxB4dgerZmDTHJHwgmSbbXlhen/e'),(21,'otro usuario','usuario7u7@gmail.com','$2b$12$4rXhFPXV61dEi5ElZ4Z1Ju/PynEjqqFBjdwGjITfHrPe.IV5pTv.a'),(22,'usuario2','usuario2@gmail.com','$2b$12$ZgDjeSBBBmwbQpwp8T59HOlLTIYIPFkySKLu6oxNCdbxB.DQhGdrm');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-14 12:27:01
