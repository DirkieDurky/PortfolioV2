<?php
$lang = "nl";

$title = "Dirks Portfolio";

$noScriptMessage = "Aha! Het lijkt erop alsof je Javascript uit hebt staan. Dat is geen probleem, maar mijn website werkt nog net iets beter met Javascript ;)";

$name = "Dirk Freijters";
$undertitle = "Enthausiast en nieuwsgierig programmeur!";

ob_start();
?>
<p>
    Hoi, ik ben Dirk!<br>
    Ik vind het leuk om applicaties te bouwen!<br>
    <br>
    Dat begon toen ik op mijn 10e
    <a id='scratch' href='https://scratch.mit.edu' target='_blank'>Scratch</a>
    ontdekte.
    Een
    platform voor kinderen om te
    leren
    programmeren. Aan de hand van Scratch ontdekte ik hoe leuk programmeren is.<br>
    Sindsdien heb ik altijd al van games gehouden waarin je iets kon programmeren.<br>
    <br>
    Om die reden heb ik in 2020 besloten een studie tot Software Developer te volgen aan het
    <a id='kw1c' href='https://www.kw1c.nl/' target='_blank'>Koning Willem 1 College</a> waar ik
    momenteel mijn eindstage aan het afronden ben.<br><br> Momenteel studeer ik Software Ontwikkeling ik op <a id='avans' href='https://www.avans.nl/' target='_blank'>Avans Hogeschool</a> in Den Bosch wat me erg goed bevalt!
</p>
<?php
$aboutMeText = ob_get_clean();
$profilePicture = "Profielfoto";

$myExperience = "Mijn ervaring";
$tetrisPlayground = "Tetris Playground";
$fynLLC = "FYN b.v.";

$tetris = "Tetris";
$closeWindow = "Venster sluiten";
$xIcon = "x icoon";
ob_start();
?>
<p class="experience-text">
    In mijn vrije tijd speel ik graag Tetris. Daarom leek het me leuk om een website te
    maken voor
    mezelf om Tetris te oefenen. Ik heb de website zo gemaakt dat ik de regels van het spel
    gemakkelijk tot in detail aan kan passen, zodat ik ook in specifieke omstandigheden kan
    oefenen.
</p>
<?php
$tetrisText = ob_get_clean();
$githubLink = "Dit project is open source! Klik om naar de Github repository te gaan";
$githubLogo = "Github logo";
$websiteLink = "Dit project staat online! Klik om naar de website te gaan";
$websiteIcon = "Website icoon";

$fyn = "FYN";
ob_start();
?>
<p class="experience-text">
    Ik heb bij FYN Software 2 keer een half jaar stage mogen lopen. FYN Software stelt zich
    op als een soort externe ICT-partner voor bedrijven, maar daar naast is het voornaamste
    product dat ze voor die bedrijven maken FYN Software. Een Retail-pakket met daarin alles
    wat een ondernemer in de Retail nodig heeft. Ze noemen hun product expres een
    Retail-pakket in plaats van een ERP-pakket omdat hun software nog veel meer kan dan een
    typisch ERP-pakket. Ik heb bij FYN Software meegeholpen om het Retail-pakket nóg beter te maken.
</p>
<?php
$fynText = ob_get_clean();
?>
