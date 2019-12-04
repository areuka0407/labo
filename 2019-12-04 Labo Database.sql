-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 19-12-04 05:45
-- 서버 버전: 10.1.30-MariaDB
-- PHP 버전: 7.2.2

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
CREATE DATABASE IF NOT EXISTS `labo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `labo`;

-- --------------------------------------------------------

--
-- 테이블 구조 `colorgroups`
--

CREATE TABLE `colorgroups` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idx` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 테이블의 덤프 데이터 `colorgroups`
--

INSERT INTO `colorgroups` (`id`, `owner_id`, `name`, `idx`) VALUES
(2, 21, '포스터', 1),
(15, 21, '웹 레이아웃', 2),
(16, 22, '기본', 0),
(18, 21, '모바일', 3),
(19, 21, '일러스트', 5),
(20, 23, '기본', 0);

-- --------------------------------------------------------

--
-- 테이블 구조 `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
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
  `day` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `colors`
--

INSERT INTO `colors` (`id`, `user_id`, `group_id`, `rgb1`, `rgb2`, `rgb3`, `rgb4`, `rgb5`, `hex1`, `hex2`, `hex3`, `hex4`, `hex5`, `tag`, `good`, `day`) VALUES
(38, 21, 2, 'rgb(254,234,126)', 'rgb(254,239,190)', 'rgb(254,215,127)', 'rgb(254,229,190)', 'rgb(254,194,126)', 'FEEA7E', 'FEEFBE', 'FED77F', 'FEE5BE', 'FEC27E', '', 1, '2019-11-18 19:29:13'),
(39, 21, 2, 'rgb(254,253,194)', 'rgb(252,254,252)', 'rgb(254,245,195)', 'rgb(253,253,253)', 'rgb(254,237,194)', 'FEFDC2', 'FCFEFC', 'FEF5C3', 'FDFDFD', 'FEEDC2', '#바닐라', 1, '2019-11-18 19:55:46'),
(40, 21, 2, 'rgb(125,206,254)', 'rgb(188,243,254)', 'rgb(124,254,253)', 'rgb(188,254,242)', 'rgb(124,254,208)', '7DCEFE', 'BCF3FE', '7CFEFD', 'BCFEF2', '7CFED0', '#민트 #청록', 0, '2019-11-18 20:20:36'),
(41, 21, 2, 'rgb(254,156,152)', 'rgb(254,180,198)', 'rgb(254,150,210)', 'rgb(89,63,88)', 'rgb(111,70,118)', 'FE9C98', 'FEB4C6', 'FE96D2', '593F58', '6F4676', '#몽블랑 #마카롱', 1, '2019-11-18 20:20:53'),
(42, 21, 2, 'rgb(89,254,30)', 'rgb(156,254,58)', 'rgb(196,254,29)', 'rgb(88,89,20)', 'rgb(118,112,14)', '59FE1E', '9CFE3A', 'C4FE1D', '585914', '76700E', '#라임 #숲속', 0, '2019-11-18 20:21:04'),
(43, 21, 2, 'rgb(228,243,254)', 'rgb(245,251,254)', 'rgb(229,250,254)', 'rgb(86,89,89)', 'rgb(106,118,116)', 'E4F3FE', 'F5FBFE', 'E5FAFE', '565959', '6A7674', '#모던 #흑백', 1, '2019-11-18 20:21:16'),
(44, 21, 2, 'rgb(189,240,254)', 'rgb(254,234,199)', 'rgb(254,229,186)', 'rgb(242,245,254)', 'rgb(183,195,254)', 'BDF0FE', 'FEEAC7', 'FEE5BA', 'F2F5FE', 'B7C3FE', '#바닐라', 0, '2019-11-20 17:28:07'),
(47, 21, 2, 'rgb(238,254,204)', 'rgb(225,254,152)', 'rgb(198,254,56)', 'rgb(197,254,51)', 'rgb(184,254,0)', 'EEFECC', 'E1FE98', 'C6FE38', 'C5FE33', 'B8FE00', '#단색 #라임', 0, '2019-11-20 20:56:26'),
(48, 21, 2, 'rgb(254,211,204)', 'rgb(254,166,153)', 'rgb(254,140,123)', 'rgb(254,78,51)', 'rgb(254,35,2)', 'FED3CC', 'FEA699', 'FE8C7B', 'FE4E33', 'FE2302', '#벚꽃 #열정 #불타는 #단색', 1, '2019-11-20 21:24:51'),
(49, 21, 2, 'rgb(254,204,240)', 'rgb(210,252,254)', 'rgb(0,243,254)', 'rgb(254,246,191)', 'rgb(254,222,1)', 'FECCF0', 'D2FCFE', '00F3FE', 'FEF6BF', 'FEDE01', '', 0, '2019-11-22 18:41:19'),
(51, 21, 2, 'rgb(52,52,120)', 'rgb(118,127,179)', 'rgb(24,35,56)', 'rgb(109,138,167)', 'rgb(55,104,127)', '343478', '767FB3', '182338', '6D8AA7', '37687F', '#차가운 #어두운', 0, '2019-11-22 19:40:21'),
(52, 21, 18, 'rgb(254,243,204)', 'rgb(254,230,154)', 'rgb(254,210,70)', 'rgb(254,206,52)', 'rgb(254,194,1)', 'FEF3CC', 'FEE69A', 'FED246', 'FECE34', 'FEC201', '#새로운 #캐주얼', 0, '2019-11-22 19:52:54'),
(54, 21, 15, 'rgb(72,68,84)', 'rgb(26,24,42)', 'rgb(249,249,254)', 'rgb(227,234,254)', 'rgb(236,243,253)', '484454', '1A182A', 'F9F9FE', 'E3EAFE', 'ECF3FD', '#모던 #웹_레이아웃', 0, '2019-11-23 10:32:31'),
(57, 21, 2, 'rgb(254,114,3)', 'rgb(254,125,58)', 'rgb(254,63,3)', 'rgb(254,85,58)', 'rgb(254,14,2)', 'FE7203', 'FE7D3A', 'FE3F03', 'FE553A', 'FE0E02', '#열정', 0, '2019-11-23 11:58:29'),
(61, 21, 2, 'rgb(254,107,51)', 'rgb(254,133,108)', 'rgb(254,67,51)', 'rgb(254,108,116)', 'rgb(254,52,130)', 'FE6B33', 'FE856C', 'FE4333', 'FE6C74', 'FE3482', '#열정', 0, '2019-11-23 12:03:32'),
(62, 21, 2, 'rgb(254,180,2)', 'rgb(254,181,58)', 'rgb(254,139,1)', 'rgb(254,147,58)', 'rgb(254,92,1)', 'FEB402', 'FEB53A', 'FE8B01', 'FE933A', 'FE5C01', '#열정 #연한', 0, '2019-11-23 12:06:07'),
(63, 21, 15, 'rgb(120,35,8)', 'rgb(235,155,129)', 'rgb(247,83,57)', 'rgb(254,235,229)', 'rgb(43,27,38)', '782308', 'EB9B81', 'F75339', 'FEEBE5', '2B1B26', '#밝은 #장미 #코스모스', 0, '2019-12-04 13:39:55');

-- --------------------------------------------------------

--
-- 테이블 구조 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `password` text NOT NULL,
  `y_m_d` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `good` text NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `users`
--

INSERT INTO `users` (`id`, `user_id`, `user_name`, `password`, `y_m_d`, `gender`, `admin`, `good`, `image`) VALUES
(21, 'areuka0407', '김민재', 'ab5596bdc10538c6e22a0f00db02ca8c9e28cc446b78f51efa4e6ac399d7fa18', '2000-12-31', 'male', 0, '38,39,48,46,45,43,41', 'Khv9oqxXalw2v3iKAC3y.jpg'),
(22, 'areuka0102', '김민재', 'bc0632694cfac282cdff027ff1e05683bcf0537504bc6d4fd06ec18823f2dee3', '0000-00-00', '', 0, '', NULL),
(23, 'labo', '김라보', 'ab5596bdc10538c6e22a0f00db02ca8c9e28cc446b78f51efa4e6ac399d7fa18', '0000-00-00', '', 0, '', NULL);

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `colorgroups`
--
ALTER TABLE `colorgroups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- 테이블의 인덱스 `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `group_id` (`group_id`);

--
-- 테이블의 인덱스 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `user_id_2` (`user_id`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `colorgroups`
--
ALTER TABLE `colorgroups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 테이블의 AUTO_INCREMENT `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- 테이블의 AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `colorgroups`
--
ALTER TABLE `colorgroups`
  ADD CONSTRAINT `colorgroups_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 테이블의 제약사항 `colors`
--
ALTER TABLE `colors`
  ADD CONSTRAINT `colors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `colors_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `colorgroups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
