-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  localhost
-- Généré le :  Dim 23 Octobre 2016 à 02:17
-- Version du serveur :  5.6.28
-- Version de PHP :  7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `bwork_alphaWeb`
--

-- --------------------------------------------------------

--
-- Structure de la table `Day`
--

CREATE TABLE `Day` (
  `id` int(10) NOT NULL,
  `minNormal` int(10) NOT NULL,
  `minSup` int(10) NOT NULL,
  `minRecup` int(10) NOT NULL,
  `day` int(5) NOT NULL,
  `month` int(5) NOT NULL,
  `year` int(10) NOT NULL,
  `beginMorning` int(10) NOT NULL,
  `endMorning` int(10) NOT NULL,
  `beginAfternoon` int(10) NOT NULL,
  `endAfternoon` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `Day`
--
ALTER TABLE `Day`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `Day`
--
ALTER TABLE `Day`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;