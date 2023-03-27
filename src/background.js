const blockSize = 40;
let canvasColumnCount = Math.ceil(window.innerWidth / blockSize);
let canvasRowCount = Math.ceil(window.innerHeight / blockSize);

//This should be blockAmountWidth * blockSize and blockAmountHeight*blockSize instead of window.innerWidth/blockSize or window.innerHeight/blockSize because the formula could get a bit bigger than the screen (which is what we want)
let canvasWidth = canvasColumnCount * blockSize;
let canvasHeight = canvasRowCount * blockSize;

const background = document.getElementById("background");
const ctx = background.getContext("2d");

//PieceSpawnInterval should be 2000 at 13 and 500 and 48 and everything in between

//TODO Iets leuks doen met de titel-letters op hover (eventueel iets met Tetris, bijvoorbeeld de letters de kleurtjes geven van tetris blokjes)

//TODO Deze dingen vanaf 0 hoger laten worden (ofzo)
const lowestColumnCount = 13;
const intervalAtLowest = 1000;
const highestColumnCount = 48;
const intervalAtHighest = 500;

let pieceSpawnInterval = intervalAtLowest + (lowestColumnCount * ((intervalAtLowest-intervalAtHighest)/(highestColumnCount-lowestColumnCount))) - ((intervalAtLowest-intervalAtHighest)/(highestColumnCount-lowestColumnCount))*canvasColumnCount;

console.log(pieceSpawnInterval);

background.width = canvasWidth;
background.height = canvasHeight;
background.style.width = canvasWidth + "px";
background.style.height = canvasHeight + "px";

let activePieces = [];
let lastXLocations = [];

ctx.strokeStyle = "#7d7d7d";
ctx.lineWidth = 1;
ctx.stroke();

const bagTetrominoes = bag();
let blockSpawnInterval;
spawnPieces();
//TODO dynamisch maken hoeveel er vallen op basis van de schermgrootte

function spawnPieces() {
    //Prevent pieces from spawning too close to each other
    let x;
    let xTooClose = true;
    let consecutiveFailCount = 0;
    while (xTooClose) {
        x = Math.floor(Math.random() * canvasColumnCount);
        
        if (consecutiveFailCount >= 3) return;
        
        xTooClose = false;
        for (let location of lastXLocations) {
            if (Math.abs(location.location - x) < 5) {
                consecutiveFailCount++;
                // console.log("Too close!");
                xTooClose = true;
                break;
            }
        }
        lastXLocations = lastXLocations.filter(x=>x.distanceFallen < 4);
    }
    consecutiveFailCount = 0;
    lastXLocations.push({location: x, distanceFallen: 0});

    // console.log(Math.max(4,canvasRowCount/100*40));

    activePieces.push({ x: x, y: 0, piece: bagTetrominoes.next().value, rotation: Math.floor(Math.random() * 3) })
    blockSpawnInterval = setTimeout(spawnPieces, pieceSpawnInterval);
}

function drawBlock(x, y, color) {
    ctx.fillStyle = hexToRgbA(color);
    ctx.fillRect((canvasWidth / canvasColumnCount) * (x - 1), (canvasHeight / canvasRowCount * (y - 1)), canvasWidth / canvasColumnCount, canvasHeight / canvasRowCount);
}

function drawPiece(x, y, piece, rotation) {
    let rotationInfo = piece.rotations[rotation];

    for (let i = 0; i < rotationInfo.length; i++) {
        drawBlock(x + rotationInfo[i][0], y + rotationInfo[i][1], piece.color);
    }
}

function render() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let piece of activePieces) {
        drawPiece(piece.x, piece.y, piece.piece, piece.rotation);
    }
}

render();
setInterval(() => {
    for (let piece of activePieces) {
        piece.y++;

        if (Math.floor(Math.random() * 7) == 0) {
            piece.rotation = (piece.rotation + 1) % 4;
            // switch (Math.floor(Math.random() * 3)){
            //     case 0: piece.x--;
            //     case 1: piece.x++;
            //     case 2: {
            //         piece.rotation = (piece.rotation+1)%4;
            //     }
            // }
        }
    }
    //Remove pieces that are out of the screen
    activePieces = activePieces.filter(piece => piece.y < canvasRowCount + 4);
    lastXLocations.forEach(x=>x.distanceFallen++);

    render();
}, 175);

addEventListener("resize", () => {
    canvasColumnCount = Math.ceil(window.innerWidth / blockSize);
    canvasRowCount = Math.ceil(window.innerHeight / blockSize);

    canvasWidth = canvasColumnCount * blockSize;
    canvasHeight = canvasRowCount * blockSize;

    totalWidth = canvasColumnCount * blockSize;
    totalHeight = canvasRowCount * blockSize;

    background.style.width = totalWidth + "px";
    background.style.height = totalHeight + "px";

    background.width = totalWidth;
    background.height = totalHeight;

    ctx.strokeStyle = "#7d7d7d";
    ctx.lineWidth = 1;
    ctx.stroke();

    pieceSpawnInterval = intervalAtLowest + (lowestColumnCount * ((intervalAtLowest-intervalAtHighest)/(highestColumnCount-lowestColumnCount))) - ((intervalAtLowest-intervalAtHighest)/(highestColumnCount-lowestColumnCount))*canvasColumnCount
    
    console.log(pieceSpawnInterval);

    clearTimeout(blockSpawnInterval);
    blockSpawnInterval = setTimeout(spawnPieces, pieceSpawnInterval);

    render();
});

function* bag() {
    let bag = [];
    let lastPieces = [];
    while (true) {
        if (bag.length < 1) {
            tetrominoes.forEach(tetromino => bag.push(tetromino));
            shuffle(bag);
            for (let delayPiece of lastPieces) {
                let indexOf = bag.indexOf(delayPiece);
                if (indexOf < 3) {
                    bag.splice(indexOf, 1);
                    bag.push(delayPiece);
                }
            }
            lastPieces = bag.slice(Math.max(bag.length - 3, 0));
        }
        let piece = bag[0];
        bag.splice(bag.indexOf(piece), 1);
        yield piece;
    }
}