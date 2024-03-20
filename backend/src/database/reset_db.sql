USE rucores;
SET FOREIGN_KEY_CHECKS = 0;
drop table if exists availability;
drop table if exists booking;
drop table if exists facility;
drop table if exists user;
drop table if exists session;
drop table if exists user_managed_facilities;
drop table if exists log_entity;
drop table if exists transaction;
SET FOREIGN_KEY_CHECKS = 1;
drop table if exists user_managed_facilities_facility;
set innodb_lock_wait_timeout=50;
