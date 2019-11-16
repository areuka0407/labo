-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 19-11-16 09:07
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

-- --------------------------------------------------------

--
-- 테이블 구조 `colorgroups`
--

CREATE TABLE `colorgroups` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `idx` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `colorgroups`
--

INSERT INTO `colorgroups` (`id`, `owner_id`, `name`, `idx`) VALUES
(1, 26, '기본', 0),
(2, 27, '기본', 0),
(3, 28, '기본', 0),
(4, 29, '기본', 0);

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
(5, 3, NULL, 'rgb(123,123,123)', 'rgb(123,123,123)', 'rgb(123,123,123)', 'rgb(123,123,123)', 'rgb(123,123,123)', 'AE03EE', 'AE03EE', 'AE03EE', 'AE03EE', 'AE03EE', 'a', 1, '2019-11-07 16:59:49'),
(6, 3, NULL, 'rgb(222,222,222)', 'rgb(222,222,222)', 'rgb(222,222,222)', 'rgb(123,123,123)', '123,132,255', '111111', '211111', '121111', '333213', 'ADADAD', 'I don\'t know', 1, '2019-11-07 17:00:38'),
(7, 3, NULL, 'rgb(222,222,222)', 'rgb(222,222,222)', 'rgb(222,222,222)', 'rgb(222,222,222)', 'rgb(123,123,123)', '111111', '211111', '121111', '112111', 'eeeeee', 'I don\'t know', 1, '2019-11-07 17:01:51'),
(8, 3, NULL, 'rgb(222,222,222)', 'rgb(222,222,222)', 'rgb(222,222,222)', 'rgb(222,222,222)', 'rgb(123,123,123)', '111111', '211111', '121111', '112111', 'aaaaaa', 'aa ek ak eo', 1, '2019-11-07 17:01:51'),
(9, 3, NULL, 'rgb(222,222,222)', 'rgb(222,222,222)', 'rgb(222,222,222)', 'rgb(222,222,222)', 'rgb(123,123,123)', '111111', '211111', '121111', '112111', 'a1d3ff', 'apple ppl', 1, '2019-11-07 17:01:51'),
(10, 14, NULL, 'rgb(254,248,147)', 'rgb(147,229,135)', 'rgb(58,254,192)', 'rgb(82,170,254)', 'rgb(128,84,254)', 'FEF893', '93E587', '3AFEC0', '52AAFE', '8054FE', '', 0, '2019-11-16 09:32:18');

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
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL,
  `good` text NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `password`, `y_m_d`, `gender`, `admin`, `id`, `good`, `image`) VALUES
('user', 'nam', '831c237928e6212bedaa4451a514ace3174562f6761f6a157a2fe5082b36e2fb', '0000-00-00', 'female', 0, 3, '7,8', NULL),
('tester', 'tester', '831c237928e6212bedaa4451a514ace3174562f6761f6a157a2fe5082b36e2fb', '0000-00-00', '', 0, 14, '5,6,9', NULL),
('5', 'asdf', 'd2e0a90b46d1163632ee571b3ccf1b674ba2c30e4b690159cc5f94e51c68fa50', '0000-00-00', '', 0, 26, '', NULL),
('ssfsdfe', 'dasgfd', '9a4ac2962d517239b1cf85743b47e54fc33bb5128a8568b3ceb413754f2e441b', '0000-00-00', '', 0, 27, '', NULL),
('teettt', 'dlfd', '2b6bd9c379fa362064406eddd70b32a408b89ece51fb29cc0f3d86f33605edc1', '0000-00-00', '', 0, 28, '', NULL),
('e', 'fljgfok', 'f6fc315971592ac7d4edd61cedfa73b7ad3e7c4b5d6795cedb390aa3136f7823', '0000-00-00', '', 0, 29, '', NULL);

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
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `colorgroups`
--
ALTER TABLE `colorgroups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 테이블의 AUTO_INCREMENT `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 테이블의 AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

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
