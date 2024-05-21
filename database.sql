CREATE DATABASE fisiorely_db;

USE fisiorely_db;

CREATE TABLE tbl_usuario(
	cveUsuario SMALLINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(250),
    apellidos VARCHAR(600),
    username VARCHAR(150),
    password VARCHAR(800),
    fechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tbl_usuario SET nombre = 'admin', apellidos = 'admin', username = 'admin', password = '$2a$10$0FwbyPi3NeN3.vpHuPR7KOFyBiOemZQiE1YmgmztpZmiw7YRZU.oi';

SELECT * FROM tbl_usuario;
