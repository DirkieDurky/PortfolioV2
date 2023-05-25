const background: Background = new Background();

//Title letters

//Split them up into pieces
let result = [];
const tetrominoBag: Generator = Tetromino.bag();
for (const character of $("#name").text()) {
    let titleLetter = $(`<pre>${character}</pre>`)
        .addClass("titleLetter")
        .addClass(character === " " ? "titleSpace" : "invisible")
        .addClass(tetrominoBag.next().value.ColorClassName);
    result.push(titleLetter);
}
$("#name").empty();
$("#name").append(result);
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

if (window.sessionStorage.getItem("modalOpened") == null)
    window.sessionStorage.setItem("modalOpened", JSON.stringify(false));

updateScrollState();

//Disable scrolling when a modal is open
$(".experience-card").on("click", () => {
    window.sessionStorage.setItem("modalOpened", JSON.stringify(true));
    updateScrollState();
})

$(".modal-close-button, .modal-close").on("click", () => {
    window.sessionStorage.setItem("modalOpened", JSON.stringify(false));
    updateScrollState();
})

function updateScrollState() {
    if (window.sessionStorage.getItem("modalOpened") == null) return;
    const modalOpened = JSON.parse(window.sessionStorage.getItem("modalOpened")!);

    if (modalOpened) {
        $("body").addClass("stop-scrolling");
    } else {
        $("body").removeClass("stop-scrolling");
    }
}

//Remove icons when they don't fit
function updateImages() {
    //Tetris demo
    if ($(".experience-infocard").width()! < 833 || $(".experience-infocard").height()! < 570) {
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

//Close modal
//For if Javascript isn't available we use href to unfocus the modal and thus hide it. If Javascript is avaiable however, we don't need that
$(".modal-close").removeAttr("href");

function closeModal() {
    $(".modal").css("visibility", "hidden");
    $(".modal").css("opacity", "0");
}

function openModal(modalId: string) {
    $(`.modal#${modalId}`).css("visibility", "visible");
    $(`.modal#${modalId}`).css("opacity", "1");
}