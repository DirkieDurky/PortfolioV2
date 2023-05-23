<!DOCTYPE html>
<html lang="nl">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dirk is Developer</title>
    <link href="build/style.css" rel="stylesheet">
    <link href="build/title.css" rel="stylesheet">
    <link href="build/about-me.css" rel="stylesheet">
    <link href="build/experience.css" rel="stylesheet">
    <link href="build/contact.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script defer src="build/utils.js"></script>
    <script defer src="build/tetrominoConstant.js"></script>
    <script defer src="build/tetromino.js"></script>
    <script defer src="build/background.js"></script>
    <script defer src="build/main.js"></script>
</head>

<body>
    <canvas id="background"></canvas>
    <section id="title" class="no-select">
        <name>Dirk Freijters</name>
        <span id="undertitle">Enthausiast en nieuwsgierig programmeur!</span>
    </section>
    <section id="about-me">
        <div class="container">
            <div class="column" id="about-me-text">
                <p>
                    Hoi, ik ben Dirk!<br>
                    Ik vind het leuk om applicaties te bouwen!<br>
                    <br>
                    Dat begon toen ik op mijn 10e
                    <a id="scratch" href="https://scratch.mit.edu" target="_blank">Scratch</a>
                    ontdekte.
                    Een
                    platform voor kinderen om te
                    leren
                    programmeren. Aan de hand van Scratch ontdekte ik hoe leuk programmeren is.<br>
                    Sindsdien heb ik altijd al van games gehouden waarin je iets kon programmeren.<br>
                    <br>
                    Om die reden heb ik in 2021 besloten een studie tot Software Developer te volgen aan het
                    <a id="kw1c" href="https://www.kw1c.nl/" target="_blank">Koning Willem 1 College</a> waar ik
                    momenteel mijn eindstage aan het afronden ben.<br>
                    <br>
                    Hierna ben ik van plan een HBO-diploma te halen bij <a id="avans" href="https://www.avans.nl/"
                        target="_blank">Avans
                        Hogeschool</a> in Den Bosch.
                </p>
            </div>
            <div class="column">
                <img id="profile-picture" src="assets/profile-picture.jpg" alt="Profielfoto" />
            </div>
        </div>
    </section>
    <section id="experience">
        <h1>Mijn ervaring</h1>
        <a class="experience-card no-select no-line" href="#tetris" alt="Tetris Playground">
            <div class="background-box"></div>
            <img src="assets/tetris-playground.png">
            <div class="slide-box-container">
                <div class="slide-box"></div>
            </div>
            </img>
        </a>
        <a class="experience-card no-select no-line" href="#fyn" alt="FYN b.v.">
            <div class="background-box"></div>
            <img src="assets/fyn-software.svg">
            <div class="slide-box-container">
                <div class="slide-box"></div>
            </div>
            </img>
        </a>
        <div id="tetris" class="overlay">
            <a class="cancel" href="#experience"></a>
            <div class="experience-infocard">
                <h2>Tetris</h2>
                <a class="close no-select" href="#experience">×</a>
                <div class="container">
                    <div class="column">
                        <p>
                            In mijn vrije tijd speel ik graag Tetris. Daarom leek het me leuk om een website te
                            maken voor
                            mezelf om Tetris te oefenen. Ik heb de website zo gemaakt dat ik de regels van het spel
                            gemakkelijk tot in detail aan kan passen, zodat ik ook in specifieke omstandigheden kan
                            oefenen.
                        </p>
                    </div>
                    <div class="column">
                        <div id="tetris-iframe-container">
                            <iframe id="tetris-iframe" src="https://tetris.dirkdev.com/"></iframe>
                        </div>
                    </div>
                </div>
                <div id="link-container">
                    <div class="experience-icon-wrapper">
                        <a href="https://github.com/DirkieDurky/Tetris" class="experience-link no-line" target="_blank"
                            title="Dit project is open source! Klik om naar de Github repository te gaan">
                            <img id="github-logo" class="experience-icon" src="assets/github-logo.svg">
                        </a>
                        <a href="https://tetris.dirkdev.com/" class="experience-link no-line" target="_blank"
                            title="Dit project staat online! Klik om naar de website te gaan">
                            <img id="website-icon" class="experience-icon" src="assets/website-icon.svg">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div id="fyn" class="overlay">
            <a class="cancel" href="#experience"></a>
            <div class="experience-infocard">
                <h2>FYN</h2>
                <a class="close no-select" href="#experience">×</a>
                <div class="container">
                    <div class="column" id="fyn-software-text-column">
                        <p>
                            Ik heb bij FYN Software 2 keer een half jaar stage mogen lopen. FYN Software stelt zich
                            op als een soort externe ICT-partner voor bedrijven, maar daar naast is het voornaamste
                            product dat ze voor die bedrijven maken FYN Software. Een Retail-pakket met daarin alles
                            wat een ondernemer in de Retail nodig heeft. Ze noemen hun product expres een
                            Retail-pakket in plaats van een ERP-pakket omdat hun software nog veel meer kan dan een
                            typisch ERP-pakket. Ik heb bij FYN Software meegeholpen om het Retail-pakket nóg beter te maken.
                        </p>
                    </div>
                    <div class="column" id="fyn-software-column">
                        <a id="fyn-software-link" class="no-line" href="https://fyn.nl/" target="_blank">
                            <img id="fyn-software-logo" src="assets/fyn-software.svg" alt="FYN Software logo">
                        </a>
                    </div>
                </div>
                <div id="link-container">
                    <div class="experience-icon-wrapper">
                        <a href="https://fyn.nl/" class="experience-link no-line" target="_blank"
                            title="Klik om naar de website van FYN software te gaan">
                            <img id="website-icon" class="experience-icon" src="assets/website-icon.svg">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="contact">
        <h1>Contact</h1>
        <div id="contact-icon-container">
            <div class="container">
                <div class="column">
                    <a class="no-line contact-link" href="https://discord.com/channels/@me/155367988328005632"
                        target="_blank" tabindex="0">
                        <img src="assets/discord.svg" alt="Discord logo" class="contact-icon">
                    </a>
                </div>
                <div class="column">
                    <a class="no-line contact-link" href="mailto:dirk@freijters.nl" target="_blank" tabindex="0">
                        <img src="assets/email.svg" alt="Email icon" class="contact-icon">
                    </a>
                </div>
            </div>
        </div>
    </section>
</body>

</html>