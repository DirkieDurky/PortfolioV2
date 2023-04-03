const blockSize = 40;
let canvasColumnCount = Math.ceil(window.innerWidth / blockSize);
let canvasRowCount = Math.ceil(window.innerHeight / blockSize);

//This should be blockAmountWidth * blockSize and blockAmountHeight*blockSize instead of window.innerWidth/blockSize or window.innerHeight/blockSize because the formula could get a bit bigger than the screen (which is what we want)
let canvasWidth = canvasColumnCount * blockSize;
let canvasHeight = canvasRowCount * blockSize;

const background = document.getElementById("background");
const ctx = background.getContext("2d");

//TODO Iets leuks doen met de titel-letters op hover (eventueel iets met Tetris, bijvoorbeeld de letters de kleurtjes geven van tetris blokjes)

let pieceSpawnIntervalTime = calculatePieceSpawnInterval();

background.width = canvasWidth;
background.height = canvasHeight;
background.style.width = canvasWidth + "px";
background.style.height = canvasHeight + "px";

let lastXLocations = [];

ctx.strokeStyle = "#7d7d7d";
ctx.lineWidth = 1;
ctx.stroke();

const bagTetrominoes = bag();
let pieceSpawnInterval;
let pieceEffectInterval;
let pieceFallTimeout;
pieceFallInterval = setInterval(fallPieces,200);
pieceSpawnInterval = setInterval(spawnPiece, pieceSpawnIntervalTime);

function fallPieces() {
    for (let piece of Tetromino.activeTetrominos) {
        piece.fall();
    }
    //Remove pieces that are out of the screen
    Tetromino.activeTetrominos = Tetromino.activeTetrominos.filter(piece => piece.y < canvasRowCount + 4);

    lastXLocations.forEach(x=>x.distanceFallen++);

    render();
}

function spawnPiece() {
    //Prevent pieces from spawning too close to each other
    let x;
    let xTooClose = true;
    let consecutiveFailCount = 0;
    while (xTooClose) {
        x = Math.floor(Math.random() * (canvasColumnCount - 4)) + 4;
        
        if (consecutiveFailCount > 6) {
            return;
        }
        
        xTooClose = false;
        for (let location of lastXLocations) {
            if (Math.abs(location.location - x) < 5) {
                consecutiveFailCount++;
                xTooClose = true;
                break;
            }
        }
        lastXLocations = lastXLocations.filter(x=>x.distanceFallen < 4);
    }
    consecutiveFailCount = 0;
    lastXLocations.push({location: x, distanceFallen: 0});
    
    Tetromino.activeTetrominos.push(new Tetromino(x, 0, bagTetrominoes.next().value, Math.floor(Math.random() * 3)));
}

function drawBlock(x, y, color) {
    ctx.fillStyle = hexToRgba(color);
    ctx.fillRect((canvasWidth / canvasColumnCount) * (x - 1), (canvasHeight / canvasRowCount * (y - 1)), canvasWidth / canvasColumnCount, canvasHeight / canvasRowCount);
}

function drawPiece(x, y, piece, rotation) {
    // console.log(piece);
    let rotationInfo = piece.rotations[rotation];

    for (let i = 0; i < rotationInfo.length; i++) {
        drawBlock(x + rotationInfo[i][0], y + rotationInfo[i][1], piece.color);
    }
}

function render() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let piece of Tetromino.activeTetrominos) {
        drawPiece(piece.x, piece.y, piece.piece, piece.rotation);
    }
}

render();

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

function calculatePieceSpawnInterval(){
    //PieceSpawnInterval should be 1000 at 13 and 500 and 48 and everything in between (Clamped between 1000 and 250)
    const lowestColumnCount = 13;
    const intervalAtLowest = 900;
    const highestColumnCount = 48;
    const intervalAtHighest = 450;

    let pieceSpawnInterval = intervalAtLowest + (lowestColumnCount * ((intervalAtLowest-intervalAtHighest)/(highestColumnCount-lowestColumnCount))) - ((intervalAtLowest-intervalAtHighest)/(highestColumnCount-lowestColumnCount))*canvasColumnCount;
    return clamp(pieceSpawnInterval,250,1000);
}

addEventListener("focus",()=>{
    pieceFallInterval = setInterval(fallPieces,150);
    pieceSpawnInterval = setInterval(spawnPiece, pieceSpawnIntervalTime);
});

addEventListener("blur",()=>{
    clearInterval(pieceFallInterval);
    clearInterval(pieceSpawnInterval);
});

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

    pieceSpawnIntervalTime = calculatePieceSpawnInterval();

    clearTimeout(pieceSpawnInterval);
    pieceSpawnInterval = setTimeout(spawnPiece, pieceSpawnIntervalTime);

    render();
});