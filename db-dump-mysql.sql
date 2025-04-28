-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: investigadores
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas` (
  `IdArea` int NOT NULL AUTO_INCREMENT,
  `IdUnidad` int DEFAULT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IdArea`) USING BTREE,
  KEY `fk_areas_unidades` (`IdUnidad`),
  CONSTRAINT `fk_areas_unidades` FOREIGN KEY (`IdUnidad`) REFERENCES `unidades` (`IdUnidad`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` VALUES (1,1,'TI'),(2,2,'Electronica'),(3,3,'Quimicos'),(4,4,'Energia'),(5,5,'Medio ambiente'),(6,1,'Docencia'),(7,2,'Posgrados'),(8,3,'Administrativo');
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articulos`
--

DROP TABLE IF EXISTS `articulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulos` (
  `IdArticulo` int NOT NULL AUTO_INCREMENT,
  `NombreArticulo` varchar(200) DEFAULT NULL,
  `NombreRevista` varchar(100) DEFAULT NULL,
  `Abstracto` text,
  `PaisPublicacion` varchar(100) DEFAULT NULL,
  `AnoPublicacion` int DEFAULT NULL,
  `FechaPublicacion` varchar(100) DEFAULT NULL,
  `DOI` varchar(100) DEFAULT NULL,
  `URL` varchar(200) DEFAULT NULL,
  `Estatus` tinyint(1) DEFAULT '1',
  `Progreso` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IdArticulo`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulos`
--

LOCK TABLES `articulos` WRITE;
/*!40000 ALTER TABLE `articulos` DISABLE KEYS */;
INSERT INTO `articulos` VALUES (1,'Optimización de Algoritmos en Python','IEEE Big Data','Optimización de algoritmos para Big Data en Python.','USA',2025,'2025-01-15','DOI:10.1109/IEEE1','https://ieeexplore.ieee.org/doc1',1,'en proceso'),(2,'Microservicios con Docker y Kubernetes','ACM Comms','Implementación de microservicios con Docker y Kubernetes.','UK',2025,'2025-02-10','DOI:10.1145/678901','https://dl.acm.org/doi/10.1145/678901',1,'terminado'),(3,'Blockchain en Transacciones Digitales','J. Cryptographic Eng.','Uso de blockchain para asegurar transacciones digitales.','Canadá',2025,'2025-03-05','DOI:10.1007/s1234','https://link.springer.com/article/s1234',1,'en proceso'),(4,'IA en Reconocimiento de Imágenes','CVIU','Aplicación de IA para reconocimiento de imágenes.','USA',2025,'2025-04-01','DOI:10.1016/jcviu.2025','https://www.journals.elsevier.com/cviu',1,'terminado'),(5,'Apps Móviles Multiplataforma','Mobile Review','Desarrollo de apps móviles para múltiples plataformas.','Alemania',2025,'2025-04-15','DOI:10.1007/s5678','https://link.springer.com/journal/5678',1,'en proceso'),(6,'Big Data y Análisis Predictivo','Data Science J.','Análisis predictivo usando técnicas de Big Data.','USA',2025,'2025-05-10','DOI:10.1016/jds.2025','https://www.journals.elsevier.com/ds',1,'aceptado'),(7,'Seguridad en la Nube con DevOps','Cloud Sec. J.','Prácticas de seguridad en la nube y DevOps.','Singapur',2025,'2025-06-05','DOI:10.1145/876543','https://dl.acm.org/doi/10.1145/876543',1,'publicado'),(8,'Bases de Datos NoSQL Optimized','ACM Trans. DB','Mejoras en el rendimiento de bases NoSQL.','USA',2025,'2025-06-20','DOI:10.1145/135045','https://dl.acm.org/doi/10.1145/135045',1,'en proceso'),(9,'Automatización de Pruebas Web','STVR','Herramientas para automatizar pruebas en web.','Australia',2025,'2025-07-15','DOI:10.1002/stvr.5678','https://onlinelibrary.wiley.com/journal/14753135',1,'terminado'),(10,'IoT y ML en Smart Cities','IEEE IoT J.','Integración de IoT y ML en ciudades inteligentes.','USA',2025,'2025-08-01','DOI:10.1109/JIOT.789012','https://ieeexplore.ieee.org/document/789012',1,'en proceso'),(11,'Evolución de Lenguajes de Programación','CACM','Breve repaso a la evolución de los lenguajes.','USA',2025,'2025-08-20','DOI:10.1145/112233','https://cacm.acm.org',1,'publicado'),(12,'Software Ágil y DevOps','IEEE Software','Integración de metodologías ágiles y DevOps.','USA',2025,'2025-09-05','DOI:10.1109/MS123456','https://www.computer.orgcsdl/magazine/so',1,'en proceso'),(13,'Ciberseguridad en la Era Digital','InfoSec J.','Estrategias para enfrentar amenazas cibernéticas.','UK',2025,'2025-09-20','DOI:10.1016/j.jinf.001','https://www.journals.elsevier.com/jinf',1,'terminado'),(14,'Realidad Virtual en Educación','Computers & Educ.','Impacto de la realidad virtual en el aula.','USA',2025,'2025-10-05','DOI:10.1016/jcompedu.002','https://www.journals.elsevier.com/compedu',1,'aceptado'),(15,'Deep Learning en Reconocimiento de Voz','IEEE TNN','Aplicación de deep learning en sistemas de voz.','USA',2025,'202510-20','DOI:10.1109/TNN654321','https://ieeexplore.ieee.org/document/654321',1,'en proceso');
/*!40000 ALTER TABLE `articulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=165 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add areas',7,'add_areas'),(26,'Can change areas',7,'change_areas'),(27,'Can delete areas',7,'delete_areas'),(28,'Can view areas',7,'view_areas'),(29,'Can add articulos',8,'add_articulos'),(30,'Can change articulos',8,'change_articulos'),(31,'Can delete articulos',8,'delete_articulos'),(32,'Can view articulos',8,'view_articulos'),(33,'Can add carreras',9,'add_carreras'),(34,'Can change carreras',9,'change_carreras'),(35,'Can delete carreras',9,'delete_carreras'),(36,'Can view carreras',9,'view_carreras'),(37,'Can add eventos',10,'add_eventos'),(38,'Can change eventos',10,'change_eventos'),(39,'Can delete eventos',10,'delete_eventos'),(40,'Can view eventos',10,'view_eventos'),(41,'Can add proyectos',11,'add_proyectos'),(42,'Can change proyectos',11,'change_proyectos'),(43,'Can delete proyectos',11,'delete_proyectos'),(44,'Can view proyectos',11,'view_proyectos'),(45,'Can add lineas',12,'add_lineas'),(46,'Can change lineas',12,'change_lineas'),(47,'Can delete lineas',12,'delete_lineas'),(48,'Can view lineas',12,'view_lineas'),(49,'Can add especialidad',13,'add_especialidad'),(50,'Can change especialidad',13,'change_especialidad'),(51,'Can delete especialidad',13,'delete_especialidad'),(52,'Can view especialidad',13,'view_especialidad'),(53,'Can add estudiantes',14,'add_estudiantes'),(54,'Can change estudiantes',14,'change_estudiantes'),(55,'Can delete estudiantes',14,'delete_estudiantes'),(56,'Can view estudiantes',14,'view_estudiantes'),(57,'Can add herramientas',15,'add_herramientas'),(58,'Can change herramientas',15,'change_herramientas'),(59,'Can delete herramientas',15,'delete_herramientas'),(60,'Can view herramientas',15,'view_herramientas'),(61,'Can add investigadores',16,'add_investigadores'),(62,'Can change investigadores',16,'change_investigadores'),(63,'Can delete investigadores',16,'delete_investigadores'),(64,'Can view investigadores',16,'view_investigadores'),(65,'Can add jefesarea',17,'add_jefesarea'),(66,'Can change jefesarea',17,'change_jefesarea'),(67,'Can delete jefesarea',17,'delete_jefesarea'),(68,'Can view jefesarea',17,'view_jefesarea'),(69,'Can add niveleducacion',18,'add_niveleducacion'),(70,'Can change niveleducacion',18,'change_niveleducacion'),(71,'Can delete niveleducacion',18,'delete_niveleducacion'),(72,'Can view niveleducacion',18,'view_niveleducacion'),(73,'Can add nivelsnii',19,'add_nivelsnii'),(74,'Can change nivelsnii',19,'change_nivelsnii'),(75,'Can delete nivelsnii',19,'delete_nivelsnii'),(76,'Can view nivelsnii',19,'view_nivelsnii'),(77,'Can add rolesevento',20,'add_rolesevento'),(78,'Can change rolesevento',20,'change_rolesevento'),(79,'Can delete rolesevento',20,'delete_rolesevento'),(80,'Can view rolesevento',20,'view_rolesevento'),(81,'Can add snii',21,'add_snii'),(82,'Can change snii',21,'change_snii'),(83,'Can delete snii',21,'delete_snii'),(84,'Can view snii',21,'view_snii'),(85,'Can add tipodeeventos',22,'add_tipodeeventos'),(86,'Can change tipodeeventos',22,'change_tipodeeventos'),(87,'Can delete tipodeeventos',22,'delete_tipodeeventos'),(88,'Can view tipodeeventos',22,'view_tipodeeventos'),(89,'Can add tipoestudiantes',23,'add_tipoestudiantes'),(90,'Can change tipoestudiantes',23,'change_tipoestudiantes'),(91,'Can delete tipoestudiantes',23,'delete_tipoestudiantes'),(92,'Can view tipoestudiantes',23,'view_tipoestudiantes'),(93,'Can add tipoherramientas',24,'add_tipoherramientas'),(94,'Can change tipoherramientas',24,'change_tipoherramientas'),(95,'Can delete tipoherramientas',24,'delete_tipoherramientas'),(96,'Can view tipoherramientas',24,'view_tipoherramientas'),(97,'Can add unidades',25,'add_unidades'),(98,'Can change unidades',25,'change_unidades'),(99,'Can delete unidades',25,'delete_unidades'),(100,'Can view unidades',25,'view_unidades'),(101,'Can add detarticulos',26,'add_detarticulos'),(102,'Can change detarticulos',26,'change_detarticulos'),(103,'Can delete detarticulos',26,'delete_detarticulos'),(104,'Can view detarticulos',26,'view_detarticulos'),(105,'Can add deteventos',27,'add_deteventos'),(106,'Can change deteventos',27,'change_deteventos'),(107,'Can delete deteventos',27,'delete_deteventos'),(108,'Can view deteventos',27,'view_deteventos'),(109,'Can add detherramientas',28,'add_detherramientas'),(110,'Can change detherramientas',28,'change_detherramientas'),(111,'Can delete detherramientas',28,'delete_detherramientas'),(112,'Can view detherramientas',28,'view_detherramientas'),(113,'Can add detproyectos',29,'add_detproyectos'),(114,'Can change detproyectos',29,'change_detproyectos'),(115,'Can delete detproyectos',29,'delete_detproyectos'),(116,'Can view detproyectos',29,'view_detproyectos'),(117,'Can add detlineas',30,'add_detlineas'),(118,'Can change detlineas',30,'change_detlineas'),(119,'Can delete detlineas',30,'delete_detlineas'),(120,'Can view detlineas',30,'view_detlineas'),(121,'Can add usuario',31,'add_usuario'),(122,'Can change usuario',31,'change_usuario'),(123,'Can delete usuario',31,'delete_usuario'),(124,'Can view usuario',31,'view_usuario'),(125,'Can add auth group',32,'add_authgroup'),(126,'Can change auth group',32,'change_authgroup'),(127,'Can delete auth group',32,'delete_authgroup'),(128,'Can view auth group',32,'view_authgroup'),(129,'Can add auth group permissions',33,'add_authgrouppermissions'),(130,'Can change auth group permissions',33,'change_authgrouppermissions'),(131,'Can delete auth group permissions',33,'delete_authgrouppermissions'),(132,'Can view auth group permissions',33,'view_authgrouppermissions'),(133,'Can add auth permission',34,'add_authpermission'),(134,'Can change auth permission',34,'change_authpermission'),(135,'Can delete auth permission',34,'delete_authpermission'),(136,'Can view auth permission',34,'view_authpermission'),(137,'Can add auth user',35,'add_authuser'),(138,'Can change auth user',35,'change_authuser'),(139,'Can delete auth user',35,'delete_authuser'),(140,'Can view auth user',35,'view_authuser'),(141,'Can add auth user groups',36,'add_authusergroups'),(142,'Can change auth user groups',36,'change_authusergroups'),(143,'Can delete auth user groups',36,'delete_authusergroups'),(144,'Can view auth user groups',36,'view_authusergroups'),(145,'Can add auth user user permissions',37,'add_authuseruserpermissions'),(146,'Can change auth user user permissions',37,'change_authuseruserpermissions'),(147,'Can delete auth user user permissions',37,'delete_authuseruserpermissions'),(148,'Can view auth user user permissions',37,'view_authuseruserpermissions'),(149,'Can add django admin log',38,'add_djangoadminlog'),(150,'Can change django admin log',38,'change_djangoadminlog'),(151,'Can delete django admin log',38,'delete_djangoadminlog'),(152,'Can view django admin log',38,'view_djangoadminlog'),(153,'Can add django content type',39,'add_djangocontenttype'),(154,'Can change django content type',39,'change_djangocontenttype'),(155,'Can delete django content type',39,'delete_djangocontenttype'),(156,'Can view django content type',39,'view_djangocontenttype'),(157,'Can add django migrations',40,'add_djangomigrations'),(158,'Can change django migrations',40,'change_djangomigrations'),(159,'Can delete django migrations',40,'delete_djangomigrations'),(160,'Can view django migrations',40,'view_djangomigrations'),(161,'Can add django session',41,'add_djangosession'),(162,'Can change django session',41,'change_djangosession'),(163,'Can delete django session',41,'delete_djangosession'),(164,'Can view django session',41,'view_djangosession');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$1000000$kf8FoRjd2aJxFMfF3pfCcO$W6DdDeIHd57txwkP3EjqtLAXMVyhFjND/p8cDnm5oCM=','2025-03-30 19:31:57.125223',1,'admin','','','admin@tecmilenio.mx',1,1,'2025-03-30 19:31:51.443168'),(2,'pbkdf2_sha256$870000$BAbVXns8PHNRAEEsNitvbW$oja8cOM3DhIWPKP5FUbIN5obK5zGNuVFs8Vrlpdx2S8=',NULL,0,'jaime','','','jaime@tecmilenio.mx',0,1,'2025-03-30 21:13:44.322246');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carreras`
--

DROP TABLE IF EXISTS `carreras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carreras` (
  `IdCarreras` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) DEFAULT NULL,
  `Escuela` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IdCarreras`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carreras`
--

LOCK TABLES `carreras` WRITE;
/*!40000 ALTER TABLE `carreras` DISABLE KEYS */;
INSERT INTO `carreras` VALUES (1,'Ing de Software','Escuela de Ingeniería'),(2,'Bioquimica','Facultad de Química'),(3,'Lic. Pedagogía','Facultad de Educación'),(4,'Ing. Electricidad','Escuela de Ingeniería'),(5,'Ing. en Electronica','Escuela de Ingeniería'),(6,'Ing en Mecatronica','Escuela de Ingeniería');
/*!40000 ALTER TABLE `carreras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detarticulos`
--

DROP TABLE IF EXISTS `detarticulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detarticulos` (
  `IdArticulo` int NOT NULL,
  `IdInvestigador` int NOT NULL,
  `OrdenAutor` int DEFAULT NULL,
  PRIMARY KEY (`IdArticulo`,`IdInvestigador`) USING BTREE,
  KEY `fk_detarticulos_investigadores` (`IdInvestigador`),
  CONSTRAINT `fk_detarticulos_articulos` FOREIGN KEY (`IdArticulo`) REFERENCES `articulos` (`IdArticulo`),
  CONSTRAINT `fk_detarticulos_investigadores` FOREIGN KEY (`IdInvestigador`) REFERENCES `investigadores` (`IdInvestigador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detarticulos`
--

LOCK TABLES `detarticulos` WRITE;
/*!40000 ALTER TABLE `detarticulos` DISABLE KEYS */;
INSERT INTO `detarticulos` VALUES (1,1,1),(2,2,1),(3,1,1),(4,3,1),(5,1,1),(6,4,1),(7,2,1),(8,3,1),(9,5,1),(10,6,1),(11,7,1),(12,8,1),(13,9,1),(14,10,1),(15,2,1);
/*!40000 ALTER TABLE `detarticulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deteventos`
--

DROP TABLE IF EXISTS `deteventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deteventos` (
  `IdEvento` int NOT NULL,
  `IdInvestigador` int NOT NULL,
  `IdRolEvento` int DEFAULT NULL,
  PRIMARY KEY (`IdEvento`,`IdInvestigador`) USING BTREE,
  KEY `fk_deteventos_investigadores` (`IdInvestigador`),
  CONSTRAINT `fk_deteventos_eventos` FOREIGN KEY (`IdEvento`) REFERENCES `eventos` (`IdEvento`),
  CONSTRAINT `fk_deteventos_investigadores` FOREIGN KEY (`IdInvestigador`) REFERENCES `investigadores` (`IdInvestigador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deteventos`
--

LOCK TABLES `deteventos` WRITE;
/*!40000 ALTER TABLE `deteventos` DISABLE KEYS */;
INSERT INTO `deteventos` VALUES (1,1,1),(1,2,2),(1,3,2),(1,4,2),(1,5,2),(2,1,2),(2,2,1),(2,3,2),(2,4,2),(2,5,2),(3,1,2),(3,2,2),(3,3,1),(3,4,2),(3,5,2),(4,1,2),(4,2,2),(4,3,2),(4,4,1),(4,5,2),(5,1,2),(5,2,2),(5,3,2),(5,4,2),(5,5,1),(6,1,2),(6,2,2),(6,3,2),(6,4,2),(6,5,2),(7,1,2),(7,2,2),(7,3,2),(7,4,2),(7,5,2),(8,1,2),(8,2,2),(8,3,2),(8,4,2),(8,5,2),(9,1,2),(9,2,2),(9,3,2),(9,4,2),(9,5,2),(10,1,2),(10,2,2),(10,3,2),(10,4,2),(10,5,2),(11,1,2),(11,2,2),(11,3,2),(11,4,2),(11,5,2),(12,1,2),(12,2,2),(12,3,2),(12,4,2),(12,5,2),(13,1,2),(13,2,2),(13,3,2),(13,4,2),(13,5,2),(14,1,2),(14,2,2),(14,3,2),(14,4,2),(14,5,2),(15,1,2),(15,2,2),(15,3,2),(15,4,2),(15,5,2),(16,1,2),(16,2,2),(16,3,2),(16,4,2),(16,5,2),(17,1,2),(17,2,2),(17,3,2),(17,4,2),(17,5,2),(18,1,2),(18,2,2),(18,3,2),(18,4,2),(18,5,2),(19,1,2),(19,2,2),(19,3,2),(19,4,2),(19,5,2),(20,1,2),(20,2,2),(20,3,2),(20,4,2),(20,5,2);
/*!40000 ALTER TABLE `deteventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detherramientas`
--

DROP TABLE IF EXISTS `detherramientas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detherramientas` (
  `IdProyecto` int NOT NULL,
  `IdHerramienta` int NOT NULL,
  PRIMARY KEY (`IdProyecto`,`IdHerramienta`) USING BTREE,
  KEY `fk_detherramientas_herramienta` (`IdHerramienta`),
  CONSTRAINT `fk_detherramientas_herramienta` FOREIGN KEY (`IdHerramienta`) REFERENCES `herramientas` (`IdHerramientas`),
  CONSTRAINT `fk_detherramientas_proyectos` FOREIGN KEY (`IdProyecto`) REFERENCES `proyectos` (`IdProyecto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detherramientas`
--

LOCK TABLES `detherramientas` WRITE;
/*!40000 ALTER TABLE `detherramientas` DISABLE KEYS */;
INSERT INTO `detherramientas` VALUES (1,1),(2,1),(1,2),(2,2);
/*!40000 ALTER TABLE `detherramientas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detlineas`
--

DROP TABLE IF EXISTS `detlineas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detlineas` (
  `IdLinea` int NOT NULL,
  `IdInvestigador` int NOT NULL,
  PRIMARY KEY (`IdLinea`,`IdInvestigador`) USING BTREE,
  KEY `fk_detlineas_investigadores` (`IdInvestigador`),
  CONSTRAINT `fk_detlineas_investigadores` FOREIGN KEY (`IdInvestigador`) REFERENCES `investigadores` (`IdInvestigador`),
  CONSTRAINT `fk_detlineas_lineas` FOREIGN KEY (`IdLinea`) REFERENCES `lineas` (`IdLinea`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detlineas`
--

LOCK TABLES `detlineas` WRITE;
/*!40000 ALTER TABLE `detlineas` DISABLE KEYS */;
INSERT INTO `detlineas` VALUES (2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(1,2),(2,2),(3,2),(4,2),(5,2),(7,2),(1,3),(2,3),(3,3),(4,3),(5,3),(6,3),(1,4),(2,4),(3,4),(4,4),(5,4),(6,4),(7,4),(1,5),(2,5),(3,5),(4,5),(5,5),(6,5),(7,5),(1,6),(2,6),(3,6),(4,6),(5,6),(6,6),(7,6),(1,7),(2,7),(3,7),(4,7),(5,7),(6,7),(7,7),(1,8),(2,8),(3,8),(4,8),(5,8),(6,8),(7,8),(1,9),(2,9),(3,9),(4,9),(5,9),(6,9),(7,9),(1,10),(2,10),(3,10),(4,10),(5,10),(6,10),(7,10);
/*!40000 ALTER TABLE `detlineas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detproyectos`
--

DROP TABLE IF EXISTS `detproyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detproyectos` (
  `IdProyecto` int NOT NULL,
  `IdInvestigador` int NOT NULL,
  `OrdenImportancia` int DEFAULT NULL,
  PRIMARY KEY (`IdProyecto`,`IdInvestigador`) USING BTREE,
  KEY `fk_detproyectos_investigadores` (`IdInvestigador`),
  CONSTRAINT `fk_detproyectos_investigadores` FOREIGN KEY (`IdInvestigador`) REFERENCES `investigadores` (`IdInvestigador`),
  CONSTRAINT `fk_detproyectos_proyectos` FOREIGN KEY (`IdProyecto`) REFERENCES `proyectos` (`IdProyecto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detproyectos`
--

LOCK TABLES `detproyectos` WRITE;
/*!40000 ALTER TABLE `detproyectos` DISABLE KEYS */;
INSERT INTO `detproyectos` VALUES (1,1,1),(1,9,2),(2,2,1),(2,10,2),(3,3,1),(4,4,1),(5,5,1),(6,6,1),(7,7,1),(8,8,1),(9,1,2),(9,9,1),(10,2,2),(10,10,1);
/*!40000 ALTER TABLE `detproyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(7,'api','areas'),(8,'api','articulos'),(32,'api','authgroup'),(33,'api','authgrouppermissions'),(34,'api','authpermission'),(35,'api','authuser'),(36,'api','authusergroups'),(37,'api','authuseruserpermissions'),(9,'api','carreras'),(26,'api','detarticulos'),(27,'api','deteventos'),(28,'api','detherramientas'),(30,'api','detlineas'),(29,'api','detproyectos'),(38,'api','djangoadminlog'),(39,'api','djangocontenttype'),(40,'api','djangomigrations'),(41,'api','djangosession'),(13,'api','especialidad'),(14,'api','estudiantes'),(10,'api','eventos'),(15,'api','herramientas'),(16,'api','investigadores'),(17,'api','jefesarea'),(12,'api','lineas'),(18,'api','niveleducacion'),(19,'api','nivelsnii'),(11,'api','proyectos'),(20,'api','rolesevento'),(21,'api','snii'),(22,'api','tipodeeventos'),(23,'api','tipoestudiantes'),(24,'api','tipoherramientas'),(25,'api','unidades'),(31,'api','usuario'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-03-30 19:30:33.637804'),(2,'auth','0001_initial','2025-03-30 19:30:33.960670'),(3,'admin','0001_initial','2025-03-30 19:30:34.037794'),(4,'admin','0002_logentry_remove_auto_add','2025-03-30 19:30:34.044123'),(5,'admin','0003_logentry_add_action_flag_choices','2025-03-30 19:30:34.049827'),(6,'api','0001_initial','2025-03-30 19:30:42.527648'),(7,'contenttypes','0002_remove_content_type_name','2025-03-30 19:30:42.597604'),(8,'auth','0002_alter_permission_name_max_length','2025-03-30 19:30:42.637839'),(9,'auth','0003_alter_user_email_max_length','2025-03-30 19:30:42.653066'),(10,'auth','0004_alter_user_username_opts','2025-03-30 19:30:42.658577'),(11,'auth','0005_alter_user_last_login_null','2025-03-30 19:30:42.696834'),(12,'auth','0006_require_contenttypes_0002','2025-03-30 19:30:42.698889'),(13,'auth','0007_alter_validators_add_error_messages','2025-03-30 19:30:42.705167'),(14,'auth','0008_alter_user_username_max_length','2025-03-30 19:30:42.749186'),(15,'auth','0009_alter_user_last_name_max_length','2025-03-30 19:30:42.796370'),(16,'auth','0010_alter_group_name_max_length','2025-03-30 19:30:42.808927'),(17,'auth','0011_update_proxy_permissions','2025-03-30 19:30:42.820536'),(18,'auth','0012_alter_user_first_name_max_length','2025-03-30 19:30:42.862322'),(19,'sessions','0001_initial','2025-03-30 19:30:42.883549'),(20,'api','0002_usuario_role','2025-03-30 21:12:56.781890');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('08934e7i0dlhxsiy5ttgyvxbg8m9b8kw','.eJxVjDsOwjAQBe_iGllZ4_WHkp4zWJv1ggPIluKkQtwdIqWA9s3Me6lE61LS2mVOU1YnBerwu43ED6kbyHeqt6a51WWeRr0peqddX1qW53l3_w4K9fKtPRLn4MUdCTiyOGAk60MmI4QBnCDw1fhohG0QZPYeI7NAsDAMQb0_-O04EQ:1tyyNx:StlPdhfUm0M77rrTN6cHUv3isRQF18-x6J4qeoW_rEQ','2025-04-13 19:31:57.126727');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidad` (
  `IdEspecialidad` int NOT NULL AUTO_INCREMENT,
  `NombreEspecialidad` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IdEspecialidad`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidad`
--

LOCK TABLES `especialidad` WRITE;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad` VALUES (1,'Pedagogía'),(2,'Mecatronica'),(3,'Electronica'),(4,'Software'),(5,'Quimica');
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiantes`
--

DROP TABLE IF EXISTS `estudiantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiantes` (
  `IdEstudiante` int NOT NULL AUTO_INCREMENT,
  `IdTipoEstudiante` int DEFAULT NULL,
  `IdCarreras` int DEFAULT NULL,
  `IdInvestigador` int DEFAULT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `FechaInicio` varchar(100) DEFAULT NULL,
  `FechaTermino` varchar(100) DEFAULT NULL,
  `SueldoEstudiante` decimal(12,2) DEFAULT '0.00',
  `Progreso` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IdEstudiante`) USING BTREE,
  KEY `fk_estudiantes_tipoestudiante` (`IdTipoEstudiante`),
  KEY `fk_estudiantes_carreras` (`IdCarreras`),
  KEY `fk_estudiantes_investigadores` (`IdInvestigador`),
  CONSTRAINT `fk_estudiantes_carreras` FOREIGN KEY (`IdCarreras`) REFERENCES `carreras` (`IdCarreras`),
  CONSTRAINT `fk_estudiantes_investigadores` FOREIGN KEY (`IdInvestigador`) REFERENCES `investigadores` (`IdInvestigador`),
  CONSTRAINT `fk_estudiantes_tipoestudiante` FOREIGN KEY (`IdTipoEstudiante`) REFERENCES `tipoestudiantes` (`IdTipoEstudiante`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiantes`
--

LOCK TABLES `estudiantes` WRITE;
/*!40000 ALTER TABLE `estudiantes` DISABLE KEYS */;
INSERT INTO `estudiantes` VALUES (1,1,1,1,'Carlos','2025-02-24','2025-08-24',2300.00,'deserto'),(2,2,2,2,'Roberto','2025-02-24','2025-08-24',6200.00,NULL),(3,3,3,3,'Diego','2025-02-24','2025-08-24',2400.00,'egresado'),(4,4,4,4,'Carmen','2025-02-24','2025-08-24',7400.00,'deserto'),(5,2,5,5,'Gerardo','2025-02-24','2025-08-24',2100.00,'titulado'),(6,3,6,6,'Alberto','2025-02-24','2025-08-24',8100.00,'titulado'),(7,1,1,7,'Alicia','2025-02-24','2025-08-24',2100.00,'egresado'),(8,1,2,8,'Sandra','2025-02-24','2025-08-24',8000.00,NULL),(9,4,3,9,'Javier','2025-02-24','2025-08-24',2300.00,'titulado'),(10,1,4,10,'Rebeca','2025-02-24','2025-08-24',2300.00,'deserto');
/*!40000 ALTER TABLE `estudiantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos` (
  `IdEvento` int NOT NULL AUTO_INCREMENT,
  `IdTipoEvento` int DEFAULT NULL,
  `NombreEvento` varchar(200) DEFAULT NULL,
  `Descripcion` text,
  `FechaInicio` varchar(100) DEFAULT NULL,
  `FechaFin` varchar(100) DEFAULT NULL,
  `Lugar` varchar(200) DEFAULT NULL,
  `EmpresaInvita` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IdEvento`) USING BTREE,
  KEY `fk_eventos_idtipoevento` (`IdTipoEvento`),
  CONSTRAINT `fk_eventos_idtipoevento` FOREIGN KEY (`IdTipoEvento`) REFERENCES `tipodeeventos` (`IdTipoEvento`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES (1,1,'Tech Innovators Congress','Congreso sobre innovación en IA y blockchain.','2025-03-01','2025-03-03','San Francisco','Google'),(2,2,'Docker & Kubernetes Workshop','Taller práctico de Docker y Kubernetes.','2025-03-05','2025-03-06','Nueva York','Microsoft'),(3,3,'AI & ML Conference','Conferencia sobre inteligencia artificial y ML.','2025-03-10','2025-03-12','Boston','IBM'),(4,4,'Cloud Computing Diploma','Diplomado sobre tecnologías en la nube.','2025-03-15','2025-03-20','Seattle','Amazon'),(5,5,'Cybersecurity Talks','Charlas breves sobre ciberseguridad.','2025-03-22','2025-03-22','Austin','Cisco'),(6,1,'Blockchain Summit','Encuentro sobre blockchain en finanzas.','2025-04-01','2025-04-03','Chicago','Ripple'),(7,2,'DevOps Bootcamp','Taller intensivo de DevOps.','2025-04-05','2025-04-06','San José','Atlassian'),(8,3,'IoT Expo','Exposición sobre IoT y ciudades inteligentes.','2025-04-10','2025-04-12','Los Ángeles','Samsung'),(9,4,'Agile Diploma','Diplomado en metodologías ágiles.','2025-04-15','2025-04-20','Denver','Oracle'),(10,5,'Software Arch. Symposium','Simposio de arquitectura de software.','2025-04-22','2025-04-23','Miami','Salesforce'),(11,1,'Tech Leaders Congress','Congreso para líderes tecnológicos.','2025-05-01','2025-05-03','San Francisco','Google'),(12,2,'Full Stack Workshop','Taller de desarrollo full stack.','2025-05-05','2025-05-06','Nueva York','Facebook'),(13,3,'Data Science Conference','Conferencia sobre ciencia de datos.','2025-05-10','2025-05-12','Boston','IBM'),(14,4,'Mobile App Diploma','Diplomado en desarrollo de apps móviles.','2025-05-15','2025-05-20','Los Ángeles','Apple'),(15,5,'Emerging Tech Talks','Charlas sobre tecnologías emergentes.','2025-05-22','2025-05-22','Chicago','Intel'),(16,1,'Quantum Computing Congress','Congreso sobre computación cuántica.','2025-06-01','2025-06-03','San José','IBM'),(17,2,'AI Workshop','Taller intensivo de IA.','2025-06-05','2025-06-06','Seattle','Microsoft'),(18,3,'DevSecOps Conference','Conferencia sobre seguridad y DevOps.','2025-06-10','2025-06-12','Austin','Cisco'),(19,4,'IoT Solutions Diploma','Diplomado en soluciones IoT.','2025-06-15','2025-06-20','Denver','Samsung'),(20,5,'Software Testing Talks','Charlas breves sobre testing y QA.','2025-06-22','2025-06-22','Miami','Oracle');
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `herramientas`
--

DROP TABLE IF EXISTS `herramientas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `herramientas` (
  `IdHerramientas` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) DEFAULT NULL,
  `IdTipoHerramienta` int DEFAULT NULL,
  PRIMARY KEY (`IdHerramientas`) USING BTREE,
  KEY `fk_herramientas_tipoherramientas` (`IdTipoHerramienta`),
  CONSTRAINT `fk_herramientas_tipoherramientas` FOREIGN KEY (`IdTipoHerramienta`) REFERENCES `tipoherramientas` (`IdTipoHerramienta`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `herramientas`
--

LOCK TABLES `herramientas` WRITE;
/*!40000 ALTER TABLE `herramientas` DISABLE KEYS */;
INSERT INTO `herramientas` VALUES (1,'Computadora',1),(2,'Servidor',1),(3,'Python',2),(4,'Java',2),(5,'SQL',2);
/*!40000 ALTER TABLE `herramientas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investigadores`
--

DROP TABLE IF EXISTS `investigadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `investigadores` (
  `IdInvestigador` int NOT NULL AUTO_INCREMENT,
  `IdArea` int DEFAULT NULL,
  `IdNivelEdu` int DEFAULT NULL,
  `IdSNII` int DEFAULT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Correo` varchar(100) DEFAULT NULL,
  `Celular` varchar(20) DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT '1',
  `SueldoInvestigador` decimal(12,2) DEFAULT '0.00',
  PRIMARY KEY (`IdInvestigador`) USING BTREE,
  KEY `fk_investigadores_areas` (`IdArea`),
  KEY `fk_investigadores_niveleducacion` (`IdNivelEdu`),
  KEY `fk_investigadores_snii` (`IdSNII`),
  CONSTRAINT `fk_investigadores_areas` FOREIGN KEY (`IdArea`) REFERENCES `areas` (`IdArea`),
  CONSTRAINT `fk_investigadores_niveleducacion` FOREIGN KEY (`IdNivelEdu`) REFERENCES `niveleducacion` (`IdNivelEdu`),
  CONSTRAINT `fk_investigadores_snii` FOREIGN KEY (`IdSNII`) REFERENCES `snii` (`IdSNII`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investigadores`
--

LOCK TABLES `investigadores` WRITE;
/*!40000 ALTER TABLE `investigadores` DISABLE KEYS */;
INSERT INTO `investigadores` VALUES (1,1,1,2,'Juan','juan@hotmail.com','3312345678',1,200.00),(2,2,1,1,'Pedro','pedro@outlook.com','3323456789',1,150.00),(3,3,1,1,'Alicia','alicia@yahoo.com','3334567890',1,100.00),(4,4,1,1,'Noemi','noemi@live.com','3345678901',1,123.00),(5,5,1,1,'Alondra','alondra@gmail.com','3356789012',1,323.00),(6,6,1,1,'Fernando','fernando@msn.com','3367890123',1,321.00),(7,7,1,1,'Alejandro','alejandro@aol.com','3378901234',1,92.00),(8,8,1,1,'Katia','katia@icloud.com','3389012345',1,134.00),(9,1,1,1,'Brenda','brenda@zoho.com','3390123456',1,94.00),(10,2,1,1,'Luis','luis@protonmail.com','3301234567',1,362.00);
/*!40000 ALTER TABLE `investigadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jefesarea`
--

DROP TABLE IF EXISTS `jefesarea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jefesarea` (
  `IdJefeArea` int NOT NULL AUTO_INCREMENT,
  `IdArea` int DEFAULT NULL,
  `IdInvestigador` int DEFAULT NULL,
  `FechaInicio` varchar(100) DEFAULT NULL,
  `FechaFin` varchar(100) DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`IdJefeArea`) USING BTREE,
  KEY `fk_jefesarea_area` (`IdArea`),
  KEY `fk_jefesarea_investigadores` (`IdInvestigador`),
  CONSTRAINT `fk_jefesarea_area` FOREIGN KEY (`IdArea`) REFERENCES `areas` (`IdArea`),
  CONSTRAINT `fk_jefesarea_investigadores` FOREIGN KEY (`IdInvestigador`) REFERENCES `investigadores` (`IdInvestigador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jefesarea`
--

LOCK TABLES `jefesarea` WRITE;
/*!40000 ALTER TABLE `jefesarea` DISABLE KEYS */;
/*!40000 ALTER TABLE `jefesarea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lineas`
--

DROP TABLE IF EXISTS `lineas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lineas` (
  `IdLinea` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) DEFAULT NULL,
  `reconocido` tinyint(1) NOT NULL,
  PRIMARY KEY (`IdLinea`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lineas`
--

LOCK TABLES `lineas` WRITE;
/*!40000 ALTER TABLE `lineas` DISABLE KEYS */;
INSERT INTO `lineas` VALUES (1,'IA',1),(2,'Energía',0),(3,'Microrredes',1),(4,'Medio Ambiente',0),(5,'Desarrollo humano',0),(6,'Desarrollo de Software',1),(7,'Química de combustibles',0);
/*!40000 ALTER TABLE `lineas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `niveleducacion`
--

DROP TABLE IF EXISTS `niveleducacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `niveleducacion` (
  `IdNivelEdu` int NOT NULL AUTO_INCREMENT,
  `IdEspecialidad` int DEFAULT NULL,
  PRIMARY KEY (`IdNivelEdu`) USING BTREE,
  KEY `fk_niveleducacion_especialidad` (`IdEspecialidad`),
  CONSTRAINT `fk_niveleducacion_especialidad` FOREIGN KEY (`IdEspecialidad`) REFERENCES `especialidad` (`IdEspecialidad`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `niveleducacion`
--

LOCK TABLES `niveleducacion` WRITE;
/*!40000 ALTER TABLE `niveleducacion` DISABLE KEYS */;
INSERT INTO `niveleducacion` VALUES (1,1),(2,2),(3,3),(4,4),(5,5);
/*!40000 ALTER TABLE `niveleducacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nivelsnii`
--

DROP TABLE IF EXISTS `nivelsnii`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nivelsnii` (
  `IdNivelSNII` int NOT NULL AUTO_INCREMENT,
  `Nivel` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdNivelSNII`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nivelsnii`
--

LOCK TABLES `nivelsnii` WRITE;
/*!40000 ALTER TABLE `nivelsnii` DISABLE KEYS */;
INSERT INTO `nivelsnii` VALUES (1,'Candidato'),(2,'Nivel 1'),(3,'Nivel 2'),(4,'Nivel 3');
/*!40000 ALTER TABLE `nivelsnii` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos` (
  `IdProyecto` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(200) DEFAULT NULL,
  `IdLider` int DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `Explicacion` text,
  `FechaInicio` varchar(100) DEFAULT NULL,
  `FechaFin` varchar(100) DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT '1',
  `ImporteIngresos` decimal(12,2) DEFAULT '0.00',
  PRIMARY KEY (`IdProyecto`) USING BTREE,
  KEY `proyectos_investigadores_FK` (`IdLider`),
  CONSTRAINT `proyectos_investigadores_FK` FOREIGN KEY (`IdLider`) REFERENCES `investigadores` (`IdInvestigador`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (1,'Plataforma IoT Smart Cities',1,'Terminado','Plataforma IoT para ciudades inteligentes.','2025-01-01','2025-12-31',1,50000.00),(2,'Sistema de Gestión en la Nube',2,'En proceso','Sistema cloud para PYMES.','2025-01-05','2025-12-31',1,30000.00),(3,'App Móvil con Realidad Aumentada',3,'Terminado','App de RA para educación.','2025-01-10','2025-12-31',1,40000.00),(4,'Microservicios para E-commerce',4,'En proceso','Arquitectura de microservicios para e-commerce.','2025-01-15','2025-12-31',1,35000.00),(5,'Pruebas Automatizadas con IA',5,'En proceso','Automatización de pruebas usando IA.','2025-01-20','2025-12-31',1,20000.00),(6,'Big Data para Análisis Predictivo',6,'Terminado','Solución Big Data para predicción.','2025-01-25','2025-12-31',1,60000.00),(7,'Blockchain en Gestión de Contratos',7,'En proceso','Solución blockchain para contratos digitales.','2025-01-30','2025-12-31',1,45000.00),(8,'Seguridad en la Nube (DevSecOps)',8,'Terminado','Integración de DevSecOps en la nube.','2025-02-05','2025-12-31',1,55000.00),(9,'Optimización con Machine Learning',9,'En proceso','ML para optimizar procesos.','2025-02-10','2025-12-31',1,25000.00),(10,'Desarrollo de PWA',10,'Terminado','Aplicaciones web progresivas (PWA).','2025-02-15','2025-12-31',1,30000.00);
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolesevento`
--

DROP TABLE IF EXISTS `rolesevento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolesevento` (
  `IdRolEvento` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdRolEvento`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolesevento`
--

LOCK TABLES `rolesevento` WRITE;
/*!40000 ALTER TABLE `rolesevento` DISABLE KEYS */;
INSERT INTO `rolesevento` VALUES (1,'Ponente'),(2,'Invitado');
/*!40000 ALTER TABLE `rolesevento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `snii`
--

DROP TABLE IF EXISTS `snii`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `snii` (
  `IdSNII` int NOT NULL AUTO_INCREMENT,
  `IdNivelSNII` int DEFAULT NULL,
  `FechaAsignacion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IdSNII`) USING BTREE,
  KEY `fk_snii_nivelsnii` (`IdNivelSNII`),
  CONSTRAINT `fk_snii_nivelsnii` FOREIGN KEY (`IdNivelSNII`) REFERENCES `nivelsnii` (`IdNivelSNII`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `snii`
--

LOCK TABLES `snii` WRITE;
/*!40000 ALTER TABLE `snii` DISABLE KEYS */;
INSERT INTO `snii` VALUES (1,1,'2024-04-10'),(2,2,'2025-01-15'),(3,3,'2025-02-23'),(4,4,'2022-03-31');
/*!40000 ALTER TABLE `snii` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipodeeventos`
--

DROP TABLE IF EXISTS `tipodeeventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipodeeventos` (
  `IdTipoEvento` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdTipoEvento`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipodeeventos`
--

LOCK TABLES `tipodeeventos` WRITE;
/*!40000 ALTER TABLE `tipodeeventos` DISABLE KEYS */;
INSERT INTO `tipodeeventos` VALUES (1,'Congresos'),(2,'Talleres'),(3,'Conferencias'),(4,'Diplomados'),(5,'Charlas');
/*!40000 ALTER TABLE `tipodeeventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoestudiantes`
--

DROP TABLE IF EXISTS `tipoestudiantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoestudiantes` (
  `IdTipoEstudiante` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdTipoEstudiante`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoestudiantes`
--

LOCK TABLES `tipoestudiantes` WRITE;
/*!40000 ALTER TABLE `tipoestudiantes` DISABLE KEYS */;
INSERT INTO `tipoestudiantes` VALUES (1,'Practicante'),(2,'Servicio social'),(3,'Maestría'),(4,'Doctorado');
/*!40000 ALTER TABLE `tipoestudiantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoherramientas`
--

DROP TABLE IF EXISTS `tipoherramientas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoherramientas` (
  `IdTipoHerramienta` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdTipoHerramienta`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoherramientas`
--

LOCK TABLES `tipoherramientas` WRITE;
/*!40000 ALTER TABLE `tipoherramientas` DISABLE KEYS */;
INSERT INTO `tipoherramientas` VALUES (1,'Hardware'),(2,'Software');
/*!40000 ALTER TABLE `tipoherramientas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidades`
--

DROP TABLE IF EXISTS `unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades` (
  `IdUnidad` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IdUnidad`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidades`
--

LOCK TABLES `unidades` WRITE;
/*!40000 ALTER TABLE `unidades` DISABLE KEYS */;
INSERT INTO `unidades` VALUES (1,'Jalisco'),(2,'San Luis Potosí'),(3,'Estado de Mexico'),(4,'Tabasco'),(5,'Sonora');
/*!40000 ALTER TABLE `unidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'investigadores'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-27 22:20:02
