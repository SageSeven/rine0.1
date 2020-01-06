create database if not exists rine character set utf8;
use rine;
create table if not exists `user`
	(
		`id` int unsigned auto_increment,
		`name` varchar(100) not null unique,
		`password` varchar(100) not null,
		`key_n` varchar(2048) not null,
		`key_e` varchar(100) not null,
		primary key(`id`)
	);
create table if not exists `msg`
	(
		`srcid` int unsigned,
		`dstid` int unsigned,
		`text` longtext not null,
		`time` datetime default CURRENT_TIMESTAMP
	);