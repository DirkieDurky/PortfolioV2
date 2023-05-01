const background: Background = new Background();

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