//TODO Fix issues with Firefox

const background: Background = new Background();

let result = "";
for (const character of document.getElementsByTagName("name")[0].textContent!) {
    result += `<pre class="titleLetter transition${character === " " ? ' titleSpace' : ' invisible'}">${character}</pre>`;
}
$("name").empty();
$("name").append(result);

// for (const letter of $(".titleLetter")) {
//     letter.classList.add("transition");
// }

setTimeout(() => {
    const titleLetterFallInterval = setInterval(() => {
        let invisibleLetters = $(".titleLetter.invisible");

        if (invisibleLetters.length == 0) {
            clearInterval(titleLetterFallInterval);
            setTimeout(Background.endStartAnimation, 1000)
            return;
        }
        invisibleLetters[Math.floor(Math.random() * invisibleLetters.length)].classList.remove("invisible");
    }, 300);
}, 1000)