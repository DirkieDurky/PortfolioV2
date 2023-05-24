const background: Background = new Background();

//Title letters

//Split them up into pieces
let result = [];
const tetrominoBag: Generator = Tetromino.bag();
for (const character of document.getElementsByTagName("name")[0].textContent!) {
    let titleLetter = $(`<pre>${character}</pre>`)
        .addClass("titleLetter")
        .addClass(character === " " ? "titleSpace" : "invisible")
        .addClass(tetrominoBag.next().value.ColorClassName);
    titleLetter
        .on('mouseenter', () => { titleLetter.addClass("hovered") })
        .on('mouseleave', () => {
            setTimeout(() => {
                titleLetter.removeClass("hovered");
            }, 50)
        });
    result.push(titleLetter);
}
$("name").empty();
$("name").append(result);
$("#undertitle").addClass("invisible");

//Make them fall one by one
setTimeout(() => {
    const titleLetterFallInterval = setInterval(async () => {
        let invisibleLetters = $(".titleLetter.invisible");

        if (invisibleLetters.length <= 0) {
            clearInterval(titleLetterFallInterval);
            await sleep(1350);
            $("#undertitle").addClass("transition");
            $("#undertitle").removeClass("invisible");
            await flashLetters()
            await sleep(1000)
            Background.endStartAnimation();
            return;
        }

        invisibleLetters[Math.floor(Math.random() * invisibleLetters.length)].classList.remove("invisible");
    }, 300);
}, 1000)

async function flashLetters() {
    for (let letter of $(".titleLetter")) {
        flashLetter(letter);
        await sleep(50);
    }

    async function flashLetter(letter: HTMLElement) {
        letter.classList.add("flash");
        await sleep(200);
        letter.classList.remove("flash");
    }
}

//Disable scrolling when a experience-infocard is open
$(".experience-card").on("click", () => {
    $("body").addClass("stop-scrolling");
})

$(".cancel, .close").on("click", () => {
    $("body").removeClass("stop-scrolling");
})

//Remove icons when it doesn't fit
function updateImages() {
    //Tetris demo
    if ($(".experience-infocard").width()! < 833) {
        $("#tetris-demo-column").css("display", "none");
    } else {
        $("#tetris-demo-column").css("display", "block");
    }

    //FYN logo
    if ($(".experience-infocard").width()! < 700) {
        $("#fyn-software-column").css("display", "none");
    } else {
        $("#fyn-software-column").css("display", "block");
    }

    //Profile picture
    if ($(window).width()! < 850) {
        $("#about-me-image").css("display", "none");
    } else {
        $("#about-me-image").css("display", "block");
    }
}

updateImages();
addEventListener("resize", () => {
    updateImages();
});