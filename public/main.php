<!DOCTYPE html>
<html lang="<?= $lang ?>">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?></title>
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
        <div id="noscript"><?= $noScriptMessage ?></div>
    </noscript>
    <canvas id="background"></canvas>
    <section id="title" class="no-select">
        <div id="name"><?= $name ?></div>
        <span id="undertitle"><?= $undertitle ?></span>
    </section>
    <section id="about-me">
        <h1>Over mij</h1>
        <div class="container">
            <div class="column" id="about-me-text">
                <p>
                    <?= $aboutMeText ?>
                </p>
            </div>
            <div class="column" id="about-me-image">
                <img id="profile-picture" src="assets/profile-picture.jpg" alt="<?= $profilePicture ?>" />
            </div>
        </div>
    </section>
    <section id="experience">
        <h1><?= $myExperience ?></h1>
        <div class="experience-flex">
            <a class="experience-card no-select" onclick="openModal('tetris')" href="#tetris" alt="<?= $tetrisPlayground ?>">
                <div class="background-box"></div>
                <img src="assets/tetris-playground.png">
                <div class="slide-box-container">
                    <img src="assets/folder.svg" class="slide-box"></img>
                </div>
                </img>
            </a>
            <a class="experience-card no-select" onclick="openModal('fyn')" href="#fyn" alt="<?= $fynLLC ?>">
                <div class="background-box"></div>
                <img src="assets/fyn-software.svg">
                <div class="slide-box-container">
                    <img src="assets/folder.svg" class="slide-box"></img>
                </div>
                </img>
            </a>
        </div>

        <div id="tetris" class="modal">
            <a class="modal-close" onclick="closeModal()" href="#close"></a>
            <div class="experience-infocard">
                <h2><?= $tetris ?></h2>
                <a class="modal-close-button no-select" onclick="closeModal()" href="#close" title="<?= $closeWindow ?>">
                    <img src="assets/xmark.svg" class="experience-close-icon" alt="<?= $xIcon ?>">
                </a>
                <div class="container">
                    <div class="column experience-text-column">
                        <?= $tetrisText ?>
                    </div>
                    <div class="column" id="tetris-demo-column">
                        <div id="tetris-iframe-container">
                            <iframe id="tetris-iframe" src="https://tetris.dirkdev.com/demo"></iframe>
                        </div>
                    </div>
                </div>
                <div class="experience-links-container">
                    <a href="https://github.com/DirkieDurky/Tetris" class="experience-link" target="_blank" title="<?= $githubLink ?>">
                        <img id="github-logo" class="experience-icon" src="assets/github.svg" alt="<?= $githubLogo ?>">
                    </a>
                    <a href="https://tetris.dirkdev.com/" class="experience-link" target="_blank" title="<?= $websiteLink ?>">
                        <img id="website-icon" class="experience-icon" src="assets/website.svg" alt="<?= $websiteIcon ?>">
                    </a>
                </div>
            </div>
        </div>
        <div id="fyn" class="modal">
            <a class="modal-close" onclick="closeModal()" href="#close"></a>
            <div class="experience-infocard">
                <h2><?= $fyn ?></h2>
                <a class="modal-close-button no-select" onclick="closeModal()" href="#close" title="<?= $closeWindow ?>">
                    <img src="assets/xmark.svg" class="experience-close-icon" alt="<?= $xIcon ?>">
                </a>
                <div class="container">
                    <div class="column experience-text-column" id="fyn-software-text-column">
                        <?= $fynText ?>
                    </div>
                    <div class="column" id="fyn-software-column">
                        <a id="fyn-software-link" href="https://fyn.nl/" target="_blank" title="<?= $websiteLink ?>">
                            <img id="fyn-software-logo" src="assets/fyn-software.svg" alt="FYN Software logo">
                        </a>
                    </div>
                </div>
                <div class="experience-links-container">
                    <a href="https://fyn.nl/" class="experience-link" target="_blank" title="Klik om naar de website van FYN software te gaan">
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
                    <a class="contact-link" href="https://discord.com/channels/@me/155367988328005632" target="_blank" tabindex="0">
                        <img src="assets/discord.svg" alt="Discord logo" class="contact-icon">
                    </a>
                </div>
                <div class="column">
                    <a class="contact-link" href="mailto:dirk@freijters.nl" target="_blank" tabindex="0">
                        <img src="assets/email.svg" alt="Email icon" class="contact-icon">
                    </a>
                </div>
            </div>
        </div>
    </section>
    <div id="links-container">
        <a id="discord-link" class="me-link" href="https://discord.com/channels/@me/155367988328005632" target="_blank" alt="Message me on Discord" tabindex="0">
            <img src="assets/discord.svg" alt="Discord logo" class="me-link-icon">
        </a>
        <a id="linkedin-link" class="me-link" href="https://www.linkedin.com/in/dirk-freijters-5a8a43152" target="_blank" alt="My LinkedIn profile" tabindex="0">
            <img src="assets/linkedin.svg" alt="LinkedIn logo" class="me-link-icon">
        </a>
        <a id="github-link" class="me-link" href="https://github.com/DirkieDurky" target="_blank" alt="My Github profile" tabindex="0">
            <img src="assets/github.svg" alt="Github logo" class="me-link-icon">
        </a>
    </div>
</body>

</html>