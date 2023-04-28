//TODO Fix issues with Firefox

const background: Background = new Background();

let result = [];
const tetrominoBag: Generator = Tetromino.bag();
for (const character of document.getElementsByTagName("name")[0].textContent!) {
    // result += `<pre class="titleLetter transition${character === " " ? ' titleSpace' : ' invisible'}">${character}</pre>`;
    let titleLetter = $(`<pre>${character}</pre>`)
        .addClass("titleLetter")
        .addClass("transition")
        .addClass(character === " " ? "titleSpace" : "invisible");
    titleLetter
        .on('mouseenter', () => { titleLetter.css("color", tetrominoBag.next().value.Color) })
        .on('mouseleave', () => { setTimeout(() => { titleLetter.css("color", "") }, 100) });
    result.push(titleLetter);
}
$("name").empty();
$("name").append(result);

setTimeout(() => {
    const titleLetterFallInterval = setInterval(async () => {
        let invisibleLetters = $(".titleLetter.invisible");

        if (invisibleLetters.length <= 0) {
            clearInterval(titleLetterFallInterval);
            await sleep(1350);
            await Math.floor(Math.random() * 2) == 0 ? flashLetters() : flashLetters2();
            await sleep(1000)
            Background.endStartAnimation();
            return;
        }

        invisibleLetters[Math.floor(Math.random() * invisibleLetters.length)].classList.remove("invisible");
    }, 300);
}, 1000)

async function flashLetters() {
    for (let i = 0; i < 4; i++) {
        turnOppositeColor();
        await sleep(100);
        turnNormal();
        await sleep(100);
    }

    function turnOppositeColor() {
        for (const letter of $(".titleLetter")) {
            letter.classList.add("flash");
        }
    }

    function turnNormal() {
        for (const letter of $(".titleLetter")) {
            letter.classList.remove("flash");
        }
    }
}

async function flashLetters2() {
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