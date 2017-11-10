-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` varchar(20) NOT NULL,
  `balance` bigint(20) DEFAULT NULL,
  `backtest` char(1) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='账户';
-- ----------------------------
-- Table structure for candlestick
-- ----------------------------
DROP TABLE IF EXISTS `candlestick`;
CREATE TABLE `candlestick` (
  `symbol` varchar(20) NOT NULL,
  `date` varchar(10) NOT NULL,
  `unit` varchar(3) NOT NULL,
  `close` float DEFAULT NULL,
  `open` float DEFAULT NULL,
  `high` float DEFAULT NULL,
  `low` float DEFAULT NULL,
  `volume` bigint(50) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`symbol`,`date`,`unit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='K线数据';
-- ----------------------------
-- Table structure for dde
-- ----------------------------
DROP TABLE IF EXISTS `dde`;
CREATE TABLE `dde` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `date` varchar(10) NOT NULL,
  `service` varchar(10) NOT NULL,
  `topic` varchar(20) NOT NULL,
  `item` varchar(50) NOT NULL,
  `text` varchar(50) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`date`,`service`,`topic`,`item`)
) ENGINE=InnoDB AUTO_INCREMENT=297380 DEFAULT CHARSET=utf8 COMMENT='DDE实时数据';
-- ----------------------------
-- Table structure for exchange
-- ----------------------------
DROP TABLE IF EXISTS `exchange`;
CREATE TABLE `exchange` (
  `code` varchar(20) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `shortname` varchar(10) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='交易所';
-- ----------------------------
-- Table structure for industry
-- ----------------------------
DROP TABLE IF EXISTS `industry`;
CREATE TABLE `industry` (
  `code` varchar(20) NOT NULL,
  `exchange` varchar(20) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `jp_name` varchar(20) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='行业';
-- ----------------------------
-- Table structure for market
-- ----------------------------
DROP TABLE IF EXISTS `market`;
CREATE TABLE `market` (
  `code` varchar(20) NOT NULL,
  `exchange` varchar(20) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`code`,`exchange`),
  KEY `exchange` (`exchange`),
  CONSTRAINT `market_ibfk_1` FOREIGN KEY (`exchange`) REFERENCES `exchange` (`code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='交易市场';
-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `no` varchar(20) NOT NULL,
  `account` varchar(20) DEFAULT NULL,
  `symbol` varchar(20) DEFAULT NULL,
  `side` char(4) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `quantity` int(10) DEFAULT NULL,
  `state` char(2) DEFAULT NULL,
  `backtest` char(1) DEFAULT NULL,
  `mocktime` varchar(20) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单';
-- ----------------------------
-- Table structure for position
-- ----------------------------
DROP TABLE IF EXISTS `position`;
CREATE TABLE `position` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(255) DEFAULT NULL,
  `symbol` varchar(20) DEFAULT NULL,
  `side` char(4) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `quantity` int(10) DEFAULT NULL,
  `pnl` int(20) DEFAULT NULL,
  `backtest` char(1) DEFAULT NULL,
  `mocktime` varchar(20) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `position_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='持仓';
-- ----------------------------
-- Table structure for sector
-- ----------------------------
DROP TABLE IF EXISTS `sector`;
CREATE TABLE `sector` (
  `code` varchar(50) NOT NULL,
  `exchange` varchar(20) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `jp_name` varchar(20) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`code`,`exchange`),
  UNIQUE KEY `sector_code_exchange` (`code`,`exchange`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='板块';
-- ----------------------------
-- Table structure for signal
-- ----------------------------
DROP TABLE IF EXISTS `signal`;
CREATE TABLE `signal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `symbol` varchar(20) DEFAULT NULL,
  `timeframe` varchar(10) DEFAULT NULL,
  `side` char(4) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `notes` varchar(10) DEFAULT NULL,
  `backtest` char(1) DEFAULT NULL,
  `mocktime` varchar(20) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='信号';
-- ----------------------------
-- Table structure for symbol_info
-- ----------------------------
DROP TABLE IF EXISTS `symbol_info`;
CREATE TABLE `symbol_info` (
  `symbol` varchar(20) NOT NULL,
  `exchange` varchar(20) NOT NULL,
  `market` varchar(20) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `sector` varchar(50) DEFAULT NULL,
  `industry` varchar(20) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`symbol`,`exchange`,`market`),
  KEY `exchange` (`exchange`),
  KEY `industry` (`industry`),
  CONSTRAINT `symbol_info_ibfk_1` FOREIGN KEY (`exchange`) REFERENCES `exchange` (`code`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `symbol_info_ibfk_2` FOREIGN KEY (`industry`) REFERENCES `industry` (`code`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品';
-- ----------------------------
-- Table structure for symbol_type
-- ----------------------------
DROP TABLE IF EXISTS `symbol_type`;
CREATE TABLE `symbol_type` (
  `type` varchar(20) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `jp_name` varchar(20) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品类型';
-- ----------------------------
-- Table structure for tick
-- ----------------------------
DROP TABLE IF EXISTS `tick`;
CREATE TABLE `tick` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `exchange` varchar(20) DEFAULT NULL,
  `market` varchar(20) DEFAULT NULL,
  `symbol` varchar(20) DEFAULT NULL,
  `date` varchar(10) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `volume` bigint(50) DEFAULT NULL,
  `turnover` bigint(50) DEFAULT NULL,
  `over_vol` bigint(50) DEFAULT NULL,
  `under_vol` bigint(50) DEFAULT NULL,
  `bid` float DEFAULT NULL,
  `bid_vol` float DEFAULT NULL,
  `ask` float DEFAULT NULL,
  `ask_vol` float DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='逐笔数据';
-- ----------------------------
-- Table structure for transaction
-- ----------------------------
DROP TABLE IF EXISTS `transaction`;
CREATE TABLE `transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(255) DEFAULT NULL,
  `order` varchar(20) DEFAULT NULL,
  `symbol` varchar(20) DEFAULT NULL,
  `side` char(4) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `quantity` int(10) DEFAULT NULL,
  `backtest` char(1) DEFAULT NULL,
  `mocktime` varchar(20) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='交易记录';
