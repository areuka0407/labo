-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 19-11-10 14:54
-- 서버 버전: 10.3.16-MariaDB
-- PHP 버전: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `labo`
--
CREATE DATABASE IF NOT EXISTS `labo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `labo`;

-- --------------------------------------------------------

--
-- 테이블 구조 `color`
--

CREATE TABLE `color` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `rgb1` text NOT NULL,
  `rgb2` text NOT NULL,
  `rgb3` text NOT NULL,
  `rgb4` text NOT NULL,
  `rgb5` text NOT NULL,
  `hex1` char(6) NOT NULL,
  `hex2` char(6) NOT NULL,
  `hex3` char(6) NOT NULL,
  `hex4` char(6) NOT NULL,
  `hex5` char(6) NOT NULL,
  `tag` varchar(209) NOT NULL,
  `good` int(11) NOT NULL,
  `day` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 테이블 구조 `users`
--

CREATE TABLE `users` (
  `user_id` varchar(50) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `password` text NOT NULL,
  `y_m_d` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `id` int(11) NOT NULL,
  `good` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `color`
--
ALTER TABLE `color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 테이블의 AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
