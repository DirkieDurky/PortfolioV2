<?php

switch ($_SERVER['PATH_INFO'][0] ?? "") {
    case "nl": require_once("languages/dutch.php");
    case "en": require_once("languages/english.php");
    default: require_once("languages/dutch.php");
}

require_once("main.php");
