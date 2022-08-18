-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: test
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `tb_alarm`
--

DROP TABLE IF EXISTS `tb_alarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_alarm` (
  `ala_id` bigint NOT NULL AUTO_INCREMENT,
  `ala_content` varchar(100) NOT NULL,
  `ala_dtype` varchar(31) DEFAULT NULL,
  `ala_send_time` datetime(6) NOT NULL,
  `ala_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ala_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_alarm`
--

LOCK TABLES `tb_alarm` WRITE;
/*!40000 ALTER TABLE `tb_alarm` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_alarm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_calendar`
--

DROP TABLE IF EXISTS `tb_calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_calendar` (
  `cal_id` bigint NOT NULL AUTO_INCREMENT,
  `cal_date` date NOT NULL,
  `cal_save_folder` varchar(100) NOT NULL,
  `cal_save_name` varchar(100) NOT NULL,
  `usr_id` bigint NOT NULL,
  PRIMARY KEY (`cal_id`),
  UNIQUE KEY `UK_ho375mhwr1qfhctba6m0n9vlg` (`cal_save_name`),
  KEY `FK31ur2mw7dp5gmb01ymki26yiw` (`usr_id`),
  CONSTRAINT `FK31ur2mw7dp5gmb01ymki26yiw` FOREIGN KEY (`usr_id`) REFERENCES `tb_user` (`usr_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_calendar`
--

LOCK TABLES `tb_calendar` WRITE;
/*!40000 ALTER TABLE `tb_calendar` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_chat_message`
--

DROP TABLE IF EXISTS `tb_chat_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_chat_message` (
  `crm_id` bigint NOT NULL AUTO_INCREMENT,
  `crm_message` varchar(255) DEFAULT NULL,
  `crm_send_date` varchar(255) DEFAULT NULL,
  `chr_id` bigint DEFAULT NULL,
  `usr_id` bigint DEFAULT NULL,
  PRIMARY KEY (`crm_id`),
  KEY `FKsidk0yfuvqq401au53611nvvy` (`chr_id`),
  KEY `FKr5qg89hlnbvqim8u2f58skh3v` (`usr_id`),
  CONSTRAINT `FKr5qg89hlnbvqim8u2f58skh3v` FOREIGN KEY (`usr_id`) REFERENCES `tb_user` (`usr_id`) ON DELETE CASCADE,
  CONSTRAINT `FKsidk0yfuvqq401au53611nvvy` FOREIGN KEY (`chr_id`) REFERENCES `tb_chat_room` (`chr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_chat_message`
--

LOCK TABLES `tb_chat_message` WRITE;
/*!40000 ALTER TABLE `tb_chat_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_chat_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_chat_room`
--

DROP TABLE IF EXISTS `tb_chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_chat_room` (
  `chr_id` bigint NOT NULL AUTO_INCREMENT,
  `chr_from_user` varchar(255) DEFAULT NULL,
  `chr_last_send_message` varchar(255) DEFAULT NULL,
  `chr_last_send_time` varchar(255) DEFAULT NULL,
  `chr_to_user` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`chr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_chat_room`
--

LOCK TABLES `tb_chat_room` WRITE;
/*!40000 ALTER TABLE `tb_chat_room` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_comment`
--

DROP TABLE IF EXISTS `tb_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_comment` (
  `com_id` bigint NOT NULL AUTO_INCREMENT,
  `com_content` varchar(300) NOT NULL,
  `com_regist_time` datetime(6) NOT NULL,
  `com_recomment_id` bigint DEFAULT NULL,
  `pos_id` bigint DEFAULT NULL,
  `usr_id` bigint NOT NULL,
  PRIMARY KEY (`com_id`),
  KEY `FK9ljpykv8vsvk505iwcefm2igq` (`com_recomment_id`),
  KEY `FK404gt4yafgkqd3x0lapfr63io` (`pos_id`),
  KEY `FKa73tj25eci2l271lbxbg2u6g0` (`usr_id`),
  CONSTRAINT `FK404gt4yafgkqd3x0lapfr63io` FOREIGN KEY (`pos_id`) REFERENCES `tb_post` (`pos_id`) ON DELETE CASCADE,
  CONSTRAINT `FK9ljpykv8vsvk505iwcefm2igq` FOREIGN KEY (`com_recomment_id`) REFERENCES `tb_comment` (`com_id`) ON DELETE CASCADE,
  CONSTRAINT `FKa73tj25eci2l271lbxbg2u6g0` FOREIGN KEY (`usr_id`) REFERENCES `tb_user` (`usr_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_comment`
--

LOCK TABLES `tb_comment` WRITE;
/*!40000 ALTER TABLE `tb_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_custom_mission`
--

DROP TABLE IF EXISTS `tb_custom_mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_custom_mission` (
  `cum_id` bigint NOT NULL AUTO_INCREMENT,
  `cum_category` int NOT NULL,
  `cum_content` varchar(200) NOT NULL,
  `cum_title` varchar(50) NOT NULL,
  `usr_id` bigint NOT NULL,
  PRIMARY KEY (`cum_id`),
  KEY `FK1suof55101h8k6yw2l7pgxi8v` (`usr_id`),
  CONSTRAINT `FK1suof55101h8k6yw2l7pgxi8v` FOREIGN KEY (`usr_id`) REFERENCES `tb_user` (`usr_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_custom_mission`
--

LOCK TABLES `tb_custom_mission` WRITE;
/*!40000 ALTER TABLE `tb_custom_mission` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_custom_mission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_daily_mission`
--

DROP TABLE IF EXISTS `tb_daily_mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_daily_mission` (
  `dam_id` bigint NOT NULL AUTO_INCREMENT,
  `dam_achieve_flag` bit(1) NOT NULL DEFAULT b'0',
  `cum_id` bigint DEFAULT NULL,
  `mis_id` bigint DEFAULT NULL,
  `usr_id` bigint NOT NULL,
  PRIMARY KEY (`dam_id`),
  KEY `FKd97aet0qmdfj6ocf9s30jpsgw` (`cum_id`),
  KEY `FKpqgegy8ra9jdk2rrfqkh58kwm` (`mis_id`),
  KEY `FK6v5bshskoabhk8ragwk9cpl38` (`usr_id`),
  CONSTRAINT `FK6v5bshskoabhk8ragwk9cpl38` FOREIGN KEY (`usr_id`) REFERENCES `tb_user` (`usr_id`) ON DELETE CASCADE,
  CONSTRAINT `FKd97aet0qmdfj6ocf9s30jpsgw` FOREIGN KEY (`cum_id`) REFERENCES `tb_custom_mission` (`cum_id`) ON DELETE CASCADE,
  CONSTRAINT `FKpqgegy8ra9jdk2rrfqkh58kwm` FOREIGN KEY (`mis_id`) REFERENCES `tb_mission` (`mis_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_daily_mission`
--

LOCK TABLES `tb_daily_mission` WRITE;
/*!40000 ALTER TABLE `tb_daily_mission` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_daily_mission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_favorite_mission`
--

DROP TABLE IF EXISTS `tb_favorite_mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_favorite_mission` (
  `fam_id` bigint NOT NULL AUTO_INCREMENT,
  `cum_id` bigint DEFAULT NULL,
  `mis_id` bigint DEFAULT NULL,
  `usr_id` bigint NOT NULL,
  PRIMARY KEY (`fam_id`),
  KEY `FKb34ks4jp3tb2pt3d6mrekpr2e` (`cum_id`),
  KEY `FKkgi0ukea8c8uerla3cu2p1pi` (`mis_id`),
  KEY `FK9m6vpklimu8gredyxy236jc4k` (`usr_id`),
  CONSTRAINT `FK9m6vpklimu8gredyxy236jc4k` FOREIGN KEY (`usr_id`) REFERENCES `tb_user` (`usr_id`) ON DELETE CASCADE,
  CONSTRAINT `FKb34ks4jp3tb2pt3d6mrekpr2e` FOREIGN KEY (`cum_id`) REFERENCES `tb_custom_mission` (`cum_id`) ON DELETE CASCADE,
  CONSTRAINT `FKkgi0ukea8c8uerla3cu2p1pi` FOREIGN KEY (`mis_id`) REFERENCES `tb_mission` (`mis_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_favorite_mission`
--

LOCK TABLES `tb_favorite_mission` WRITE;
/*!40000 ALTER TABLE `tb_favorite_mission` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_favorite_mission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_favorite_post`
--

DROP TABLE IF EXISTS `tb_favorite_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_favorite_post` (
  `fap_id` bigint NOT NULL AUTO_INCREMENT,
  `pos_id` bigint NOT NULL,
  `usr_id` bigint NOT NULL,
  PRIMARY KEY (`fap_id`),
  KEY `FKjj07od2tbprg2ns9y2q1kr9ol` (`pos_id`),
  KEY `FKh99dumbtlckki3mdvxajqybkp` (`usr_id`),
  CONSTRAINT `FKh99dumbtlckki3mdvxajqybkp` FOREIGN KEY (`usr_id`) REFERENCES `tb_user` (`usr_id`) ON DELETE CASCADE,
  CONSTRAINT `FKjj07od2tbprg2ns9y2q1kr9ol` FOREIGN KEY (`pos_id`) REFERENCES `tb_post` (`pos_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_favorite_post`
--

LOCK TABLES `tb_favorite_post` WRITE;
/*!40000 ALTER TABLE `tb_favorite_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_favorite_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_friend`
--

DROP TABLE IF EXISTS `tb_friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_friend` (
  `fri_id` bigint NOT NULL AUTO_INCREMENT,
  `usr_from_id` bigint NOT NULL,
  `usr_to_id` bigint NOT NULL,
  PRIMARY KEY (`fri_id`),
  KEY `FKlf1bus40yka5fmdxbhc0ny4ll` (`usr_from_id`),
  KEY `FKqvpgi6n5ps4l8w3nde29p2ehr` (`usr_to_id`),
  CONSTRAINT `FKlf1bus40yka5fmdxbhc0ny4ll` FOREIGN KEY (`usr_from_id`) REFERENCES `tb_user` (`usr_id`) ON DELETE CASCADE,
  CONSTRAINT `FKqvpgi6n5ps4l8w3nde29p2ehr` FOREIGN KEY (`usr_to_id`) REFERENCES `tb_user` (`usr_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_friend`
--

LOCK TABLES `tb_friend` WRITE;
/*!40000 ALTER TABLE `tb_friend` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_item`
--

DROP TABLE IF EXISTS `tb_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_item` (
  `ite_id` bigint NOT NULL AUTO_INCREMENT,
  `ite_category` int NOT NULL,
  `ite_left` int NOT NULL,
  `ite_top` int NOT NULL,
  `usr_id` bigint NOT NULL,
  PRIMARY KEY (`ite_id`),
  KEY `FKfa3pdc0hm44anahfjl1cdj7cb` (`usr_id`),
  CONSTRAINT `FKfa3pdc0hm44anahfjl1cdj7cb` FOREIGN KEY (`usr_id`) REFERENCES `tb_user` (`usr_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_item`
--

LOCK TABLES `tb_item` WRITE;
/*!40000 ALTER TABLE `tb_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_item_img`
--

DROP TABLE IF EXISTS `tb_item_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_item_img` (
  `ite_id` bigint NOT NULL,
  `iti_save_folder` varchar(100) NOT NULL,
  `iti_save_name` varchar(200) NOT NULL,
  `iti_url` varchar(200) NOT NULL,
  PRIMARY KEY (`ite_id`),
  UNIQUE KEY `UK_msg3p85pd0cybyi1sme6j83yf` (`iti_save_name`),
  CONSTRAINT `FKobbm53rs5i9aq2m1hb4je6m8g` FOREIGN KEY (`ite_id`) REFERENCES `tb_item` (`ite_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_item_img`
--

LOCK TABLES `tb_item_img` WRITE;
/*!40000 ALTER TABLE `tb_item_img` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_item_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_mission`
--

DROP TABLE IF EXISTS `tb_mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_mission` (
  `mis_id` bigint NOT NULL AUTO_INCREMENT,
  `mis_category` int NOT NULL,
  `mis_content` varchar(200) NOT NULL,
  `mis_outside_flag` int DEFAULT NULL,
  `mis_quest_flag` bit(1) NOT NULL,
  `mis_sunny_flag` int DEFAULT NULL,
  `mis_temperature_flag` int DEFAULT NULL,
  `mis_title` varchar(50) NOT NULL,
  PRIMARY KEY (`mis_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_mission`
--

LOCK TABLES `tb_mission` WRITE;
/*!40000 ALTER TABLE `tb_mission` DISABLE KEYS */;
INSERT INTO `tb_mission` VALUES (1,1,'',3,_binary '\0',1,7,'플라스틱 방앗간 프로젝트 참여하기'),(2,1,'',1,_binary '',1,2,'쓰레기 줍기'),(3,1,'',1,_binary '',1,2,'플로깅 하기'),(4,1,'',3,_binary '',1,7,'리필 스테이션 숍 이용해보기'),(5,1,'',2,_binary '\0',3,7,'실내에 화초를 놓기'),(6,1,'',2,_binary '\0',3,7,'배달 음식 시킬 때 일회용품 받지 않기'),(7,1,'',2,_binary '\0',3,7,'물을 채운 물병을 변기 수조에 넣기'),(8,1,'',3,_binary '\0',3,7,'밥 먹을 때 음식 남기지 않기'),(9,1,'',1,_binary '\0',1,2,'자가용 대신 대중교통 이용하기'),(10,1,'',3,_binary '\0',3,7,'일회용 빨대 사용하지 않기'),(11,1,'',3,_binary '\0',1,7,'낮 시간에 형광등 끄기'),(12,1,'',1,_binary '',1,2,'가까운 거리는 걷거나 자전거 이용하기'),(13,1,'',3,_binary '\0',3,7,'한 끼 채식하기'),(14,1,'',3,_binary '\0',3,7,'종이 영수증보다 전자 영수증 활용하기'),(15,1,'',3,_binary '',1,7,'제로 웨이스트 매장 둘러보기'),(16,1,'',3,_binary '\0',3,7,'탄소포인트제에 동참하기'),(17,1,'',2,_binary '\0',3,7,'요리할 때 냄비나 팬의 뚜껑을 덮기'),(18,1,'',1,_binary '\0',1,2,'나무심기'),(19,2,'',3,_binary '',3,7,'카페에서 일회용 컵 대신에 텀블러 사용하기'),(20,2,'',3,_binary '',3,7,'마트갈 때 일회용 비닐봉투 대신에 에코백/장바구니 사용하기'),(21,2,'',2,_binary '\0',3,7,'이면지 사용하기'),(22,2,'',2,_binary '\0',3,7,'물티슈 대신 행주 사용하기'),(23,2,'',2,_binary '\0',1,7,'세탁망 사용하기'),(24,2,'',2,_binary '\0',3,7,'양치할 때 양치컵 사용하기'),(25,2,'',2,_binary '\0',3,4,'에어컨 대신 선풍기/부채 사용하기'),(26,2,'',2,_binary '\0',3,7,'플라스틱 용기 대신 유리 용기 사용하기'),(27,2,'',2,_binary '\0',3,7,'삼베나 수세미로 만든 천연 소재의 샤워 볼 사용하기'),(28,2,'',2,_binary '\0',3,7,'쌀뜨물 활용하기'),(29,3,'',2,_binary '\0',3,4,'에어컨 온도 올리기'),(30,3,'',2,_binary '\0',3,1,'난방 온도 낮추기'),(31,3,'',1,_binary '\0',3,7,'방 비울 때 불 끄기'),(32,3,'',1,_binary '\0',3,7,'방 비울 때 콘센트 뽑기'),(33,3,'',1,_binary '\0',3,7,'방 비울 때 난방/에어컨 끄기'),(34,3,'',2,_binary '\0',1,7,'빨래의 양이 꽉 찼을 때 세탁하기'),(35,3,'',2,_binary '\0',3,7,'전자제품 완충되면 충전선 뽑아놓기'),(36,3,'',2,_binary '\0',1,7,'전자 건조기 대신 빨랫대 이용하기'),(37,3,'',2,_binary '\0',3,7,'인쇄할 때 1/2로 줄여서 인쇄하기'),(38,3,'',2,_binary '\0',3,7,'식기세척기 사용해 물 사용 줄이기'),(39,3,'',2,_binary '\0',3,7,'가전제품 및 전기용품은 미 사용시 코드를 빼두기'),(40,3,'',2,_binary '\0',3,7,'샤워 할 때 멍 안때리기'),(41,3,'',2,_binary '\0',1,7,'세탁기 사용시 저온수 사용하기'),(42,4,'',NULL,_binary '\0',NULL,NULL,'액체 샴푸 대신 고체 샴푸 구매하기'),(43,4,'',NULL,_binary '\0',NULL,NULL,'생분해 인증 마크 제품 구매하기'),(44,4,'',NULL,_binary '\0',NULL,NULL,'LED 조명으로 교체하기'),(45,4,'',NULL,_binary '\0',NULL,NULL,'친환경 세제 구매하기'),(46,4,'',NULL,_binary '\0',NULL,NULL,'충전식 건전지 사용하기'),(47,4,'',NULL,_binary '',NULL,NULL,'지역 농산물, 유기농 제품 구매하기'),(48,4,'',NULL,_binary '\0',NULL,NULL,'종이 타올 대신에 면 타올 구매하기'),(49,4,'',NULL,_binary '\0',NULL,NULL,'80-100% 재활용 종이로 만들어진 종이 제품 사용하기'),(50,4,'',NULL,_binary '\0',NULL,NULL,'노후된 경유차를 친환경 전기차로 바꾸기'),(51,4,'',NULL,_binary '\0',NULL,NULL,'플라스틱 용기가 없는 리필 상품 구입하기'),(52,4,'',NULL,_binary '\0',NULL,NULL,'새 상품 대신 중고 물품 구매하기'),(53,4,'',NULL,_binary '\0',NULL,NULL,'대나무 칫솔 구매하기'),(54,5,'',1,_binary '\0',1,7,'다 쓴 플라스틱 병 라벨 떼서 분리수거하기'),(55,5,'',1,_binary '\0',1,7,'의약 폐기물 주변 약국에 설치된 의약품 분리수거함에 배출하기'),(56,5,'',2,_binary '\0',3,7,'다 쓴 페트병으로 화분 만들기'),(57,5,'',2,_binary '\0',3,7,'입지 않는 옷 리폼하기'),(58,5,'',1,_binary '',1,7,'입지 않는 옷 기부하기 (아름다운 가게)'),(59,5,'',2,_binary '\0',3,7,'DIY 하기');
/*!40000 ALTER TABLE `tb_mission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_notice`
--

DROP TABLE IF EXISTS `tb_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_notice` (
  `not_id` bigint NOT NULL AUTO_INCREMENT,
  `not_content` varchar(1000) NOT NULL,
  `not_hit` int NOT NULL,
  `not_modify_flag` bit(1) NOT NULL,
  `not_regist_time` varchar(255) NOT NULL,
  `not_title` varchar(100) NOT NULL,
  `not_urgent_flag` bit(1) NOT NULL,
  `usr_id` bigint NOT NULL,
  PRIMARY KEY (`not_id`),
  KEY `FKeeouascmegenj87ig2tvunewl` (`usr_id`),
  CONSTRAINT `FKeeouascmegenj87ig2tvunewl` FOREIGN KEY (`usr_id`) REFERENCES `tb_user` (`usr_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_notice`
--

LOCK TABLES `tb_notice` WRITE;
/*!40000 ALTER TABLE `tb_notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_post`
--

DROP TABLE IF EXISTS `tb_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_post` (
  `DTYPE` varchar(31) NOT NULL,
  `pos_id` bigint NOT NULL AUTO_INCREMENT,
  `pos_category` int NOT NULL,
  `pos_comment_flag` bit(1) NOT NULL DEFAULT b'1',
  `pos_content` varchar(1000) DEFAULT NULL,
  `pos_public_flag` bit(1) NOT NULL DEFAULT b'1',
  `pos_regist_time` datetime(6) NOT NULL,
  `pos_report` bit(1) NOT NULL DEFAULT b'0',
  `cum_id` bigint DEFAULT NULL,
  `mis_id` bigint DEFAULT NULL,
  `usr_id` bigint NOT NULL,
  `que_id` bigint DEFAULT NULL,
  PRIMARY KEY (`pos_id`),
  KEY `FKh0opciubosif895vgyq1jodxc` (`cum_id`),
  KEY `FKrfhu3bt23rcxuq50upf4rncic` (`mis_id`),
  KEY `FKfrew3vev7vle7lh4c8e7p2cq1` (`usr_id`),
  KEY `FKq4qiwf5p64ngtybqisfjt6f80` (`que_id`),
  CONSTRAINT `FKfrew3vev7vle7lh4c8e7p2cq1` FOREIGN KEY (`usr_id`) REFERENCES `tb_user` (`usr_id`) ON DELETE CASCADE,
  CONSTRAINT `FKh0opciubosif895vgyq1jodxc` FOREIGN KEY (`cum_id`) REFERENCES `tb_custom_mission` (`cum_id`) ON DELETE CASCADE,
  CONSTRAINT `FKq4qiwf5p64ngtybqisfjt6f80` FOREIGN KEY (`que_id`) REFERENCES `tb_quest` (`que_id`) ON DELETE CASCADE,
  CONSTRAINT `FKrfhu3bt23rcxuq50upf4rncic` FOREIGN KEY (`mis_id`) REFERENCES `tb_mission` (`mis_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_post`
--

LOCK TABLES `tb_post` WRITE;
/*!40000 ALTER TABLE `tb_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_post_img`
--

DROP TABLE IF EXISTS `tb_post_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_post_img` (
  `pos_id` bigint NOT NULL,
  `poi_original_name` varchar(200) NOT NULL,
  `poi_save_folder` varchar(100) NOT NULL,
  `poi_save_name` varchar(100) NOT NULL,
  PRIMARY KEY (`pos_id`),
  UNIQUE KEY `UK_5ry92h6bvgp5cyh1c3eiwufbr` (`poi_save_name`),
  CONSTRAINT `FKo5kh7aof2adsv9fh8usqloyda` FOREIGN KEY (`pos_id`) REFERENCES `tb_post` (`pos_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_post_img`
--

LOCK TABLES `tb_post_img` WRITE;
/*!40000 ALTER TABLE `tb_post_img` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_post_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_profile_img`
--

DROP TABLE IF EXISTS `tb_profile_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_profile_img` (
  `usr_id` bigint NOT NULL,
  `pri_original_name` varchar(200) DEFAULT NULL,
  `pri_save_folder` varchar(500) DEFAULT NULL,
  `pri_save_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`usr_id`),
  UNIQUE KEY `UK_kre2v86yto2tbfbrmg1p2qgac` (`pri_save_name`),
  CONSTRAINT `FK1cyyxnbqdsggnbolsyf9c5awq` FOREIGN KEY (`usr_id`) REFERENCES `tb_user` (`usr_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_profile_img`
--

LOCK TABLES `tb_profile_img` WRITE;
/*!40000 ALTER TABLE `tb_profile_img` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_profile_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_quest`
--

DROP TABLE IF EXISTS `tb_quest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_quest` (
  `que_id` bigint NOT NULL AUTO_INCREMENT,
  `que_achieve_count` int NOT NULL,
  `que_achieve_flag` bit(1) NOT NULL DEFAULT b'0',
  `que_content` varchar(255) NOT NULL,
  `que_finish_flag` bit(1) NOT NULL DEFAULT b'0',
  `que_finish_time` datetime(6) NOT NULL,
  `que_lat` varchar(50) NOT NULL,
  `que_lng` varchar(50) NOT NULL,
  `que_participant_count` int NOT NULL DEFAULT '0',
  `mis_id` bigint NOT NULL,
  `usr_id` bigint NOT NULL,
  PRIMARY KEY (`que_id`),
  KEY `FKeqw2wgw702mf29uk37wlwwolk` (`mis_id`),
  KEY `FKi0g1q8loficlt28i9wl0ksgn5` (`usr_id`),
  CONSTRAINT `FKeqw2wgw702mf29uk37wlwwolk` FOREIGN KEY (`mis_id`) REFERENCES `tb_mission` (`mis_id`) ON DELETE CASCADE,
  CONSTRAINT `FKi0g1q8loficlt28i9wl0ksgn5` FOREIGN KEY (`usr_id`) REFERENCES `tb_user` (`usr_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_quest`
--

LOCK TABLES `tb_quest` WRITE;
/*!40000 ALTER TABLE `tb_quest` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_quest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_report`
--

DROP TABLE IF EXISTS `tb_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_report` (
  `DTYPE` varchar(31) NOT NULL,
  `rep_id` bigint NOT NULL AUTO_INCREMENT,
  `rep_content` varchar(255) DEFAULT NULL,
  `pos_id` bigint DEFAULT NULL,
  `ret_id` bigint NOT NULL,
  `usr_id` bigint NOT NULL,
  `com_id` bigint DEFAULT NULL,
  PRIMARY KEY (`rep_id`),
  KEY `FK72ufvbddjq6ecijqbjiuuiulp` (`pos_id`),
  KEY `FKlgfo5fqq9n212mcrc8o4t2y21` (`ret_id`),
  KEY `FKk27k2g1kfm6l0340rqn96xx0n` (`usr_id`),
  KEY `FKj2ctw0ndm89stc2273wym850p` (`com_id`),
  CONSTRAINT `FK72ufvbddjq6ecijqbjiuuiulp` FOREIGN KEY (`pos_id`) REFERENCES `tb_post` (`pos_id`) ON DELETE CASCADE,
  CONSTRAINT `FKj2ctw0ndm89stc2273wym850p` FOREIGN KEY (`com_id`) REFERENCES `tb_comment` (`com_id`) ON DELETE CASCADE,
  CONSTRAINT `FKk27k2g1kfm6l0340rqn96xx0n` FOREIGN KEY (`usr_id`) REFERENCES `tb_user` (`usr_id`) ON DELETE CASCADE,
  CONSTRAINT `FKlgfo5fqq9n212mcrc8o4t2y21` FOREIGN KEY (`ret_id`) REFERENCES `tb_report_type` (`ret_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_report`
--

LOCK TABLES `tb_report` WRITE;
/*!40000 ALTER TABLE `tb_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_report_type`
--

DROP TABLE IF EXISTS `tb_report_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_report_type` (
  `ret_id` bigint NOT NULL AUTO_INCREMENT,
  `ret_type` varchar(30) NOT NULL,
  PRIMARY KEY (`ret_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_report_type`
--

LOCK TABLES `tb_report_type` WRITE;
/*!40000 ALTER TABLE `tb_report_type` DISABLE KEYS */;
INSERT INTO `tb_report_type` VALUES (1,'욕설'),(2,'음란물'),(3,'허위인증'),(4,'광고'),(5,'기타');
/*!40000 ALTER TABLE `tb_report_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_statistic`
--

DROP TABLE IF EXISTS `tb_statistic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_statistic` (
  `usr_id` bigint NOT NULL,
  `sta_category_1` bigint NOT NULL DEFAULT '0',
  `sta_category_2` bigint NOT NULL DEFAULT '0',
  `sta_category_3` bigint NOT NULL DEFAULT '0',
  `sta_category_4` bigint NOT NULL DEFAULT '0',
  `sta_category_5` bigint NOT NULL DEFAULT '0',
  `sta_category_6` bigint NOT NULL DEFAULT '0',
  `sta_quest_count` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`usr_id`),
  CONSTRAINT `FKk9ysd958juaqhkpmm7gy627w7` FOREIGN KEY (`usr_id`) REFERENCES `tb_user` (`usr_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_statistic`
--

LOCK TABLES `tb_statistic` WRITE;
/*!40000 ALTER TABLE `tb_statistic` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_statistic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_trending`
--

DROP TABLE IF EXISTS `tb_trending`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_trending` (
  `mis_id` bigint NOT NULL,
  `tre_count` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`mis_id`),
  CONSTRAINT `FKkk47hwtol3e493oa7w1725wxx` FOREIGN KEY (`mis_id`) REFERENCES `tb_mission` (`mis_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_trending`
--

LOCK TABLES `tb_trending` WRITE;
/*!40000 ALTER TABLE `tb_trending` DISABLE KEYS */;
INSERT INTO `tb_trending` VALUES (1,0),(2,0),(3,0),(4,0),(5,0),(6,0),(7,0),(8,0),(9,0),(10,0),(11,0),(12,0),(13,0),(14,0),(15,0),(16,0),(17,0),(18,0),(19,0),(20,0),(21,0),(22,0),(23,0),(24,0),(25,0),(26,0),(27,0),(28,0),(29,0),(30,0),(31,0),(32,0),(33,0),(34,0),(35,0),(36,0),(37,0),(38,0),(39,0),(40,0),(41,0),(42,0),(43,0),(44,0),(45,0),(46,0),(47,0),(48,0),(49,0),(50,0),(51,0),(52,0),(53,0),(54,0),(55,0),(56,0),(57,0),(58,0),(59,0);
/*!40000 ALTER TABLE `tb_trending` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user` (
  `usr_id` bigint NOT NULL AUTO_INCREMENT,
  `usr_email` varchar(100) NOT NULL,
  `usr_name` varchar(24) DEFAULT NULL,
  `usr_password` varchar(500) DEFAULT NULL,
  `usr_refreshToken` varchar(255) DEFAULT NULL,
  `usr_social_type` int NOT NULL,
  PRIMARY KEY (`usr_id`),
  UNIQUE KEY `UK_qhs0idhvf861yygxerb4enxpy` (`usr_email`),
  UNIQUE KEY `UK_fgb3i2dgqdttyncuvvyqmlco4` (`usr_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user_setting`
--

DROP TABLE IF EXISTS `tb_user_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user_setting` (
  `usr_id` bigint NOT NULL,
  `uss_chat_alarm_flag` bit(1) NOT NULL DEFAULT b'1',
  `uss_comment_alarm_flag` bit(1) NOT NULL DEFAULT b'1',
  `uss_darkmode_flag` bit(1) NOT NULL DEFAULT b'0',
  `uss_public_flag` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`usr_id`),
  CONSTRAINT `FKerugn8eajteg1tia69bh7tpdy` FOREIGN KEY (`usr_id`) REFERENCES `tb_user` (`usr_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user_setting`
--

LOCK TABLES `tb_user_setting` WRITE;
/*!40000 ALTER TABLE `tb_user_setting` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_user_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `User_usr_id` bigint NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  KEY `FKaitudssbsdq62m8xmepv9eqyc` (`User_usr_id`),
  CONSTRAINT `FKaitudssbsdq62m8xmepv9eqyc` FOREIGN KEY (`User_usr_id`) REFERENCES `tb_user` (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-17 23:06:24
