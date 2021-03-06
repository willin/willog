<?php defined('BASEPATH') OR exit('No direct script access allowed');
include_once('functions.php');?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=10,IE=9,IE=8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <link rel="shorcut icon" href="<?=$opt['cdn_url']?>favicon.ico" type="image/x-ico" />
    <link rel="stylesheet" href="<?=$opt['cdn_url']?>themes/<?=$opt['site_theme']?>/style.css">
    <meta name="keywords" content="<?= $opt['site_key'][$cur_lang] ?>">
    <meta name="description" content="<?= $opt['site_desc'][$cur_lang] ?>">
    <title><?= isset($title)?$title.' - ':'' ?> <?=$site_name?> - <?=$opt['site_desc'][$cur_lang]?></title>
    <script type="text/javascript" src="//code.jquery.com/jquery.min.js"></script>
    <script>var base_url="<?=base_url()?>",lang_url="<?=$base_url?>";window.jQuery || document.write(unescape('%3Cscript src="<?=$opt['cdn_url']?>themes/<?=$opt['site_theme']?>/js/jquery.min.js"%3E%3C/script%3E'))</script>
    <script type="text/javascript" src="<?=$opt['cdn_url']?>themes/<?=$opt['site_theme']?>/js/default.min.js"></script>
</head>
<body class="<?=is_mobile()?'mobile':'desktop'?>">
<div class="wrapper">
    <header>
        <h2><?=$opt['site_desc'][$cur_lang]?></h2>
        <h1><a href="<?=$base_url?>"><?=$site_name?></a></h1>
        <h2 class="bottom"><?=create_geolocation('31.96713', '118.78143', $lang['distance'])?><?=$lang['desc']?></h2>
    </header>
    <main id="main">
        <div id="content">
