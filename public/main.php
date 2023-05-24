<!--
TODO:
Make H1's clickable
Add English
Actually use SCSS lol
-->
<!DOCTYPE html>
<html lang="nl">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dirk is Developer</title>
    <link rel="icon" href="assets/df.svg">

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
    <noscript>
        <div id="noscript">Aha! Het lijkt erop alsof je Javascript uit hebt staan. Dat is geen probleem, maar mijn website werkt nog net iets beter als je het aan zet ;)</div>
    </noscript>
    <canvas id="background"></canvas>
    <section id="title" class="no-select">
        <div id="name">Dirk Freijters</div>
        <span id="undertitle">Enthausiast en nieuwsgierig programmeur!</span>
    </section>
    <section id="about-me">
        <h1>Over mij</h1>
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
                    Hierna ben ik van plan een HBO-diploma te halen bij <a id="avans" href="https://www.avans.nl/" target="_blank">Avans
                        Hogeschool</a> in Den Bosch.
                </p>
            </div>
            <div class="column" id="about-me-image">
                <img id="profile-picture" src="assets/profile-picture.jpg" alt="Profielfoto" />
            </div>
        </div>
    </section>
    <section id="experience">
        <h1>Mijn ervaring</h1>
        <div class="experience-flex">
            <a class="experience-card no-select no-line" href="#tetris" alt="Tetris Playground">
                <div class="background-box"></div>
                <img src="assets/tetris-playground.png">
                <div class="slide-box-container">
                    <img src="assets/folder.svg" class="slide-box"></img>
                </div>
                </img>
            </a>
            <a class="experience-card no-select no-line" href="#fyn" alt="FYN b.v.">
                <div class="background-box"></div>
                <img src="assets/fyn-software.svg">
                <div class="slide-box-container">
                    <img src="assets/folder.svg" class="slide-box"></img>
                </div>
                </img>
            </a>
        </div>

        <div id="tetris" class="modal">
            <a class="modal-close" href="#close"></a>
            <div class="experience-infocard">
                <h2>Tetris</h2>
                <a href="#close" class="modal-close-button no-line no-select">
                    <img src="assets/xmark.svg" class="experience-close-icon" alt="close-icon">
                </a>
                <div class="container">
                    <div class="column experience-text-column">
                        <p class="experience-text">
                            In mijn vrije tijd speel ik graag Tetris. Daarom leek het me leuk om een website te
                            maken voor
                            mezelf om Tetris te oefenen. Ik heb de website zo gemaakt dat ik de regels van het spel
                            gemakkelijk tot in detail aan kan passen, zodat ik ook in specifieke omstandigheden kan
                            oefenen.
                        </p>
                    </div>
                    <div class="column" id="tetris-demo-column">
                        <div id="tetris-iframe-container">
                            <iframe id="tetris-iframe" src="https://tetris.dirkdev.com/"></iframe>
                        </div>
                    </div>
                </div>
                <div class="experience-links-container">
                    <a href="https://github.com/DirkieDurky/Tetris" class="experience-link no-line" target="_blank" title="Dit project is open source! Klik om naar de Github repository te gaan">
                        <img id="github-logo" class="experience-icon" src="assets/github.svg">
                    </a>
                    <a href="https://tetris.dirkdev.com/" class="experience-link no-line" target="_blank" title="Dit project staat online! Klik om naar de website te gaan">
                        <img id="website-icon" class="experience-icon" src="assets/website.svg">
                    </a>
                </div>
            </div>
        </div>
        <div id="fyn" class="modal">
            <a class="modal-close" href="#close"></a>
            <div class="experience-infocard">
                <h2>FYN</h2>
                <a href="#close" class="modal-close-button no-line no-select">
                    <img src="assets/xmark.svg" class="experience-close-icon" alt="close-icon">
                </a>
                <div class="container">
                    <div class="column experience-text-column" id="fyn-software-text-column">
                        <p class="experience-text">
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
                <div class="experience-links-container">
                    <a href="https://fyn.nl/" class="experience-link no-line" target="_blank" title="Klik om naar de website van FYN software te gaan">
                        <img id="website-icon" class="experience-icon" src="assets/website.svg">
                    </a>
                </div>
            </div>
        </div>
    </section>
    <section id="contact">
        <h1>Contact</h1>
        <div id="contact-icon-container">
            <div class="container">
                <div class="column">
                    <a class="no-line contact-link" href="https://discord.com/channels/@me/155367988328005632" target="_blank" tabindex="0">
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
    <div id="links-container">
        <a id="discord-link" class="me-link no-line" href="https://discord.com/channels/@me/155367988328005632" target="_blank" alt="Message me on Discord" tabindex="0">
            <img src="assets/discord.svg" alt="Discord logo" class="me-link-icon">
        </a>
        <a id="linkedin-link" class="me-link no-line" href="https://www.linkedin.com/in/dirk-freijters-5a8a43152" target="_blank" alt="My LinkedIn profile" tabindex="0">
            <img src="assets/linkedin.svg" alt="LinkedIn logo" class="me-link-icon">
        </a>
        <a id="github-link" class="me-link no-line" href="https://github.com/DirkieDurky" target="_blank" alt="My Github profile" tabindex="0">
            <img src="assets/github.svg" alt="Github logo" class="me-link-icon">
        </a>
    </div>
</body>

</html>