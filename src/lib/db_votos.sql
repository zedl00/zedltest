
#
# Structure for table "colegios"
#

DROP TABLE IF EXISTS `colegios`;
CREATE TABLE `colegios` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `colegio` varchar(50) NOT NULL DEFAULT '0',
  `direccion` varchar(65) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "colegios"
#


#
# Structure for table "mesas"
#

DROP TABLE IF EXISTS `mesas`;
CREATE TABLE `mesas` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `mesa` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "mesas"
#


#
# Structure for table "sessions"
#

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

#
# Data for table "sessions"
#

INSERT INTO `sessions` VALUES ('sCZB3pVFy-LcYZ_uptrnqv3UtnrX_1AN',1588182990,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');

#
# Structure for table "users"
#

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL DEFAULT '',
  `password` varchar(60) NOT NULL DEFAULT '',
  `fullname` varchar(100) NOT NULL DEFAULT '',
  `nivel` varchar(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

#
# Data for table "users"
#

INSERT INTO `users` VALUES (1,'nestor','$2a$10$f.aQ5d29sOrotI569RJise9v9hgBSsgB0ANdNRUKhNF//WB0oSYGW','Nestor Valdez','1'),(2,'user','$2a$10$K/z9wrNYFUYknTW5ekKzAuPZrmydaWzvzgDlVwdJHPSPtpiUcJpmy','Administrador','0');

#
# Structure for table "votantes"
#

DROP TABLE IF EXISTS `votantes`;
CREATE TABLE `votantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) NOT NULL DEFAULT '',
  `apellido` varchar(25) NOT NULL DEFAULT '',
  `cedula` varchar(11) NOT NULL DEFAULT '',
  `celular` varchar(10) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT '',
  `direccion` varchar(65) DEFAULT NULL,
  `colegio_id` int(11) DEFAULT '0',
  `mesa_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `comentario` text,
  `fecha_creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_colegio` (`colegio_id`),
  KEY `fk_mesa` (`mesa_id`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "votantes"
#

INSERT INTO `votantes` VALUES (7,'Nestor','Valdez M.','01200690764','8297304930','8297304930','Manzana A No. 21, Res. del Este',NULL,NULL,2,'Tremendo Tipo.!','2020-04-03 16:12:07'),(8,'Glenibel','Mejia','01200336393','8296017977','8095974909','Manzana A No. 21',NULL,NULL,1,'Votante FP','2020-04-03 16:33:13'),(10,'Jonathan','Valdez','00148979239','8496334930','8095974909','Santo Domingo',NULL,NULL,2,'El tipo.','2020-04-03 16:39:57');
