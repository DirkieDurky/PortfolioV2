class Background {
    private static readonly background: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("background")!;
    private static readonly ctx: CanvasRenderingContext2D = Background.background.getContext("2d")!;

    public static canvasColumnCount: number;
    public static canvasRowCount: number;
    public static canvasWidth: number;
    public static canvasHeight: number;

    public static pieceFallInterval: number;
    public static pieceSpawnInterval: number;

    constructor() {
        const blockSize = 40;
        Background.canvasColumnCount = Math.ceil(window.innerWidth / blockSize);
        Background.canvasRowCount = Math.ceil(window.innerHeight / blockSize);

        Background.canvasWidth = Background.canvasColumnCount * blockSize;
        Background.canvasHeight = Background.canvasRowCount * blockSize;

        //TODO Iets leuks doen met de titel-letters op hover (eventueel iets met Tetris, bijvoorbeeld de letters de kleurtjes geven van tetris blokjes)

        let pieceSpawnIntervalTime: number = Background.calculatePieceSpawnInterval();
        const pieceFallIntervalTime: number = 200;

        Background.background.width = Background.canvasWidth;
        Background.background.height = Background.canvasHeight;
        Background.background.style.width = Background.canvasWidth + "px";
        Background.background.style.height = Background.canvasHeight + "px";

        Background.ctx.strokeStyle = "#7d7d7d";
        Background.ctx.lineWidth = 1;
        Background.ctx.stroke();

        Background.pieceFallInterval = setInterval(Tetromino.fallAll, pieceFallIntervalTime);
        Background.pieceSpawnInterval = setInterval(Tetromino.spawnPiece, pieceSpawnIntervalTime);

        Background.render();

        addEventListener("focus", () => {
            Background.pieceFallInterval = setInterval(Tetromino.fallAll, pieceFallIntervalTime);
            Background.pieceSpawnInterval = setInterval(Tetromino.spawnPiece, pieceSpawnIntervalTime);
            for (let tetromino of Tetromino.activeTetrominos) {
                tetromino.unpauseAction();
            }
        });

        addEventListener("blur", () => {
            clearInterval(Background.pieceFallInterval);
            clearInterval(Background.pieceSpawnInterval);
            for (let tetromino of Tetromino.activeTetrominos) {
                tetromino.pauseAction();
            }
        });

        addEventListener("resize", () => {
            Background.canvasColumnCount = Math.ceil(window.innerWidth / blockSize);
            Background.canvasRowCount = Math.ceil(window.innerHeight / blockSize);

            Background.canvasWidth = Background.canvasColumnCount * blockSize;
            Background.canvasHeight = Background.canvasRowCount * blockSize;

            Background.background.style.width = Background.canvasWidth + "px";
            Background.background.style.height = Background.canvasHeight + "px";

            Background.background.width = Background.canvasWidth;
            Background.background.height = Background.canvasHeight;

            Background.ctx.strokeStyle = "#7d7d7d";
            Background.ctx.lineWidth = 1;
            Background.ctx.stroke();

            pieceSpawnIntervalTime = Background.calculatePieceSpawnInterval();

            clearTimeout(Background.pieceSpawnInterval);
            Background.pieceSpawnInterval = setTimeout(Tetromino.spawnPiece, pieceSpawnIntervalTime);

            Background.render();
        });
    }

    private static drawBlock(x: number, y: number, color: string) {
        Background.ctx.fillStyle = hexToRgba(color);
        Background.ctx.fillRect((Background.canvasWidth / Background.canvasColumnCount) * (x - 1), (Background.canvasHeight / Background.canvasRowCount * (y - 1)), Background.canvasWidth / Background.canvasColumnCount, Background.canvasHeight / Background.canvasRowCount);
    }

    private static drawPiece(x: number, y: number, piece: TetrominoConstant, rotation: number) {
        let rotationInfo = piece.Rotations[rotation];

        for (let i = 0; i < rotationInfo.length; i++) {
            this.drawBlock(x + rotationInfo[i][0], y + rotationInfo[i][1], piece.Color);
        }
    }

    public static render() {
        Background.ctx.clearRect(0, 0, Background.canvasWidth, Background.canvasHeight);
        for (let piece of Tetromino.activeTetrominos) {
            this.drawPiece(piece.x, piece.y, piece.piece, piece.rotation);
        }
    }

    private static calculatePieceSpawnInterval() {
        //PieceSpawnInterval should be 1000 at 13 and 500 and 48 and everything in between (Clamped between 1000 and 250)
        const lowestColumnCount = 13;
        const intervalAtLowest = 900;
        const highestColumnCount = 48;
        const intervalAtHighest = 450;

        let pieceSpawnInterval = intervalAtLowest + (lowestColumnCount * ((intervalAtLowest - intervalAtHighest) / (highestColumnCount - lowestColumnCount))) - ((intervalAtLowest - intervalAtHighest) / (highestColumnCount - lowestColumnCount)) * Background.canvasColumnCount;
        return clamp(pieceSpawnInterval, 250, 1000);
    }
}