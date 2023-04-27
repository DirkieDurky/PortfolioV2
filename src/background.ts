class Background {
    private static readonly BACKGROUND: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("background")!;
    private static readonly CTX: CanvasRenderingContext2D = Background.BACKGROUND.getContext("2d")!;

    public static canvasColumnCount: number;
    public static canvasRowCount: number;
    public static canvasWidth: number;
    public static canvasHeight: number;

    public static startAnimationPlaying: boolean = true;

    public static pieceFallInterval: number | null;
    public static pieceSpawnInterval: number | null;

    private static _pieceFallIntervalTime: number = 75;

    public static get pieceFallIntervalTime() {
        return this._pieceFallIntervalTime;
    }

    public static set pieceFallIntervalTime(time: number) {
        this._pieceFallIntervalTime = time;
        if (this.pieceFallInterval != null) {
            clearInterval(this.pieceFallInterval);
            this.pieceFallInterval = setInterval(Tetromino.fallAll, this._pieceFallIntervalTime);
        }
    }

    constructor() {
        const blockSize = 40;
        Background.canvasColumnCount = Math.ceil(window.innerWidth / blockSize);
        Background.canvasRowCount = Math.ceil(window.innerHeight / blockSize);

        Background.canvasWidth = Background.canvasColumnCount * blockSize;
        Background.canvasHeight = Background.canvasRowCount * blockSize;

        //TODO Iets leuks doen met de titel-letters op hover (eventueel iets met Tetris, bijvoorbeeld de letters de kleurtjes geven van tetris blokjes)

        let pieceSpawnIntervalTime: number = Background.calculatePieceSpawnInterval();

        Background.BACKGROUND.width = Background.canvasWidth;
        Background.BACKGROUND.height = Background.canvasHeight;
        Background.BACKGROUND.style.width = Background.canvasWidth + "px";
        Background.BACKGROUND.style.height = Background.canvasHeight + "px";

        Background.CTX.strokeStyle = "#7d7d7d";
        Background.CTX.lineWidth = 1;
        Background.CTX.stroke();

        Background.pieceFallInterval = setInterval(Tetromino.fallAll, Background.pieceFallIntervalTime);
        Background.pieceSpawnInterval = setInterval(Tetromino.spawnPiece, pieceSpawnIntervalTime);

        Background.render();

        addEventListener("focus", () => {
            if (Background.startAnimationPlaying) return;
            if (Background.pieceFallInterval == null) {
                Background.pieceFallInterval = setInterval(Tetromino.fallAll, Background.pieceFallIntervalTime);
            }
            if (Background.pieceSpawnInterval == null) {
                Background.pieceSpawnInterval = setInterval(Tetromino.spawnPiece, pieceSpawnIntervalTime);
            }

            // for (let tetromino of Tetromino.activeTetrominos) {
            //     tetromino.unpauseAction();
            // }
        });

        addEventListener("blur", () => {
            if (Background.startAnimationPlaying) return;
            if (Background.pieceFallInterval != null) {
                clearInterval(Background.pieceFallInterval);
                Background.pieceFallInterval = null;
            }
            if (Background.pieceSpawnInterval != null) {
                clearInterval(Background.pieceSpawnInterval);
                Background.pieceSpawnInterval = null;
            }

            for (let tetromino of Tetromino.activeTetrominos) {
                tetromino.pauseAction();
            }
        });

        addEventListener("resize", () => {
            Background.canvasColumnCount = Math.ceil(window.innerWidth / blockSize);
            Background.canvasRowCount = Math.ceil(window.innerHeight / blockSize);

            Background.canvasWidth = Background.canvasColumnCount * blockSize;
            Background.canvasHeight = Background.canvasRowCount * blockSize;

            Background.BACKGROUND.style.width = Background.canvasWidth + "px";
            Background.BACKGROUND.style.height = Background.canvasHeight + "px";

            Background.BACKGROUND.width = Background.canvasWidth;
            Background.BACKGROUND.height = Background.canvasHeight;

            Background.CTX.strokeStyle = "#7d7d7d";
            Background.CTX.lineWidth = 1;
            Background.CTX.stroke();

            pieceSpawnIntervalTime = Background.calculatePieceSpawnInterval();

            if (Background.pieceSpawnInterval != null) {
                clearTimeout(Background.pieceSpawnInterval);
                Background.pieceSpawnInterval = setTimeout(Tetromino.spawnPiece, pieceSpawnIntervalTime);
            }

            Background.render();
        });
    }

    private static drawBlock(x: number, y: number, color: string) {
        Background.CTX.fillStyle = hexToRgba(color);
        Background.CTX.fillRect((Background.canvasWidth / Background.canvasColumnCount) * (x - 1), (Background.canvasHeight / Background.canvasRowCount * (y - 1)), Background.canvasWidth / Background.canvasColumnCount, Background.canvasHeight / Background.canvasRowCount);
    }

    private static drawPiece(x: number, y: number, piece: TetrominoConstant, rotation: number) {
        let rotationInfo = piece.Rotations[rotation];

        for (let i = 0; i < rotationInfo.length; i++) {
            this.drawBlock(x + rotationInfo[i][0], y + rotationInfo[i][1], piece.Color);
        }
    }

    public static render() {
        Background.CTX.clearRect(0, 0, Background.canvasWidth, Background.canvasHeight);
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

    public static async endStartAnimation() {
        Background.startAnimationPlaying = false;
        while (Background.pieceFallIntervalTime < 200) {
            Background.pieceFallIntervalTime += 10;
            await sleep(Background.pieceFallIntervalTime);
        }
    }
}