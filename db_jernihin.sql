-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 01 Des 2025 pada 15.03
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_jernihin`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_jadwal_pembersihan`
--

CREATE TABLE `tb_jadwal_pembersihan` (
  `id` int(11) NOT NULL,
  `jam` varchar(10) NOT NULL,
  `tipe_pengulangan` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_jadwal_pembersihan`
--

INSERT INTO `tb_jadwal_pembersihan` (`id`, `jam`, `tipe_pengulangan`) VALUES
(1, '17:00', 'Mingguan');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_kontrol_manual`
--

CREATE TABLE `tb_kontrol_manual` (
  `id` int(11) NOT NULL,
  `status_manual` tinyint(1) DEFAULT 0,
  `diperbarui_pada` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_kontrol_manual`
--

INSERT INTO `tb_kontrol_manual` (`id`, `status_manual`, `diperbarui_pada`) VALUES
(1, 0, '2025-11-26 00:13:40');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_nilai_ntu`
--

CREATE TABLE `tb_nilai_ntu` (
  `id` int(11) NOT NULL,
  `ntu` float NOT NULL,
  `kondisi_air` varchar(50) DEFAULT NULL,
  `waktu` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_nilai_ntu`
--

INSERT INTO `tb_nilai_ntu` (`id`, `ntu`, `kondisi_air`, `waktu`) VALUES
(1, 90, 'keruh', '2025-11-23 16:14:23'),
(2, 1034, 'Sangat Keruh', '2025-11-23 17:53:20'),
(3, 859, 'Sangat Keruh', '2025-11-23 18:54:38'),
(4, 999, 'Sangat Keruh', '2025-11-23 18:58:41');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_pengguna`
--

CREATE TABLE `tb_pengguna` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'user',
  `dibuat_pada` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_pengguna`
--

INSERT INTO `tb_pengguna` (`id`, `nama`, `username`, `password`, `role`, `dibuat_pada`) VALUES
(1, 'Administrator', 'admin', '$2b$10$INGIMHQp7g3VqnkpuUEQd.eC/7AsfJ4ZTOENfR2wnHohkYUC69GA.', 'admin', '2025-11-23 14:53:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_riwayat_pembersihan`
--

CREATE TABLE `tb_riwayat_pembersihan` (
  `id` int(11) NOT NULL,
  `jam` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `status` varchar(50) NOT NULL,
  `waktu` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_riwayat_pembersihan`
--

INSERT INTO `tb_riwayat_pembersihan` (`id`, `jam`, `tanggal`, `status`, `waktu`) VALUES
(1, '08:00', '2025-11-23', '1', '2025-11-23 16:15:04'),
(2, '08:00', '2025-11-25', '1', '2025-11-25 16:47:38');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_status_pembersihan`
--

CREATE TABLE `tb_status_pembersihan` (
  `id` int(11) NOT NULL,
  `sedang_membersihkan` tinyint(1) DEFAULT 0,
  `waktu_mulai` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_status_pembersihan`
--

INSERT INTO `tb_status_pembersihan` (`id`, `sedang_membersihkan`, `waktu_mulai`) VALUES
(1, 0, '2025-11-23 23:51:05');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tb_jadwal_pembersihan`
--
ALTER TABLE `tb_jadwal_pembersihan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_kontrol_manual`
--
ALTER TABLE `tb_kontrol_manual`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_nilai_ntu`
--
ALTER TABLE `tb_nilai_ntu`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_pengguna`
--
ALTER TABLE `tb_pengguna`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indeks untuk tabel `tb_riwayat_pembersihan`
--
ALTER TABLE `tb_riwayat_pembersihan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_status_pembersihan`
--
ALTER TABLE `tb_status_pembersihan`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `tb_nilai_ntu`
--
ALTER TABLE `tb_nilai_ntu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `tb_pengguna`
--
ALTER TABLE `tb_pengguna`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `tb_riwayat_pembersihan`
--
ALTER TABLE `tb_riwayat_pembersihan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
