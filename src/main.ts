const background: Background = new Background();
let result = "";
for (const character of document.getElementsByTagName("name")[0].textContent!) {
    result += `<span class="titleLetter ${character === " " ? 'titleSpace' : ''}">${character}</span>`;
}