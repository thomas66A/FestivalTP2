-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:8889
-- Généré le :  Jeu 05 Octobre 2017 à 09:00
-- Version du serveur :  5.6.35
-- Version de PHP :  7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `festival`
--

-- --------------------------------------------------------

--
-- Structure de la table `festival`
--

CREATE TABLE `festival` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `dateDebut` date NOT NULL,
  `dateFin` date NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `festival`
--

INSERT INTO `festival` (`id`, `title`, `type`, `dateDebut`, `dateFin`, `lat`, `lng`) VALUES
(26, 'HellFest', 'metal', '2017-10-01', '2017-10-10', 42.54397489736546, 3.0423760414123535),
(27, 'Clasiqua', 'classique', '2017-10-03', '2017-10-17', 42.54397489736546, 3.0423760414123535),
(29, 'Jazzy', 'jazz', '2017-10-12', '2017-10-23', 42.59151063198149, 2.9737114906311035),
(30, 'OldJazz', 'jazz', '2017-10-01', '2017-10-03', 42.62890689563345, 2.7416253089904785),
(31, 'Rock50', 'rock', '2017-10-01', '2017-10-02', 42.58443313755392, 2.6166558265686035),
(32, 'PopFest', 'pop', '2017-10-04', '2017-10-24', 42.45284793716158, 2.6180291175842285),
(33, 'lyrika', 'lyrique', '2017-10-04', '2017-10-18', 42.69051116998238, 2.8597283363342285),
(34, 'Rock90', 'rock', '2017-10-10', '2017-10-30', 42.69051116998238, 2.6894402503967285),
(35, 'RockAroudRheClock', 'rock', '2017-10-04', '2017-10-17', 42.78129125156276, 3.0231499671936035),
(36, 'Liryks', 'lyrique', '2017-10-12', '2017-10-17', 42.523735938643064, 2.8185296058654785),
(37, 'WhiteMetal', 'metal', '2017-10-04', '2017-10-12', 42.51260171573666, 2.1208977699279785),
(38, 'RockMagnon', 'rock', '2017-10-13', '2017-10-21', 42.81353658623225, 2.7347588539123535),
(39, 'La Pradeenne', 'classique', '2017-10-01', '2017-10-04', 42.60667398549726, 2.4189019203186035);

-- --------------------------------------------------------

--
-- Structure de la table `mesFestivals`
--

CREATE TABLE `mesFestivals` (
  `id` int(11) NOT NULL,
  `festivalId` int(11) NOT NULL,
  `nameId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `mesFestivals`
--

INSERT INTO `mesFestivals` (`id`, `festivalId`, `nameId`) VALUES
(22, 27, 26),
(23, 35, 26),
(24, 37, 26),
(25, 39, 26);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `festivalId` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `name`, `admin`, `festivalId`, `password`) VALUES
(1, 'admin', 1, '', '21232f297a57a5a743894a0e4a801fc3'),
(26, 'thomas', 0, '', 'f71dbe52628a3f83a77ab494817525c6');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `festival`
--
ALTER TABLE `festival`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `mesFestivals`
--
ALTER TABLE `mesFestivals`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `festival`
--
ALTER TABLE `festival`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT pour la table `mesFestivals`
--
ALTER TABLE `mesFestivals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;