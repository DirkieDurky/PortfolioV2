class Background {
    private static readonly BACKGROUND: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("background")!;
    private static readonly CTX: CanvasRenderingContext2D = Background.BACKGROUND.getContext("2d")!;

    public static canvasColumnCount: number;
    public static canvasRowCount: number;
    public static canvasWidth: number;
    public static canvasHeight: number;

    public static startAnimationPlaying: boolean = true;
    public static pieceSpawnInterval: number | null;

    private static _pieceSpawnIntervalTime: number;

    public static get pieceSpawnIntervalTime() {
        return this._pieceSpawnIntervalTime;
    }

    public static set pieceSpawnIntervalTime(time: number) {
        this._pieceSpawnIntervalTime = time;
        if (this.pieceSpawnInterval != null) {
            clearInterval(this.pieceSpawnInterval);
            this.pieceSpawnInterval = setInterval(Tetromino.spawnPiece, this._pieceSpawnIntervalTime);
        }
    }

    constructor() {
        const blockSize = 40;
        Background.canvasColumnCount = Math.ceil(window.innerWidth / blockSize);
        Background.canvasRowCount = Math.ceil(window.innerHeight / blockSize);

        Background.canvasWidth = Background.canvasColumnCount * blockSize;
        Background.canvasHeight = Background.canvasRowCount * blockSize;

        //TODO Iets leuks doen met de titel-letters op hover (eventueel iets met Tetris, bijvoorbeeld de letters de kleurtjes geven van tetris blokjes)

        Background.BACKGROUND.width = Background.canvasWidth;
        Background.BACKGROUND.height = Background.canvasHeight;
        Background.BACKGROUND.style.width = Background.canvasWidth + "px";
        Background.BACKGROUND.style.height = Background.canvasHeight + "px";

        Background.CTX.strokeStyle = "#7d7d7d";
        Background.CTX.lineWidth = 1;
        Background.CTX.stroke();

        Background.pieceSpawnIntervalTime = Background.calculatePieceSpawnInterval() / 8 * 3;

        Tetromino.pieceFallInterval = setInterval(Tetromino.fallAll, Tetromino.pieceFallIntervalTime);
        (Background.pieceSpawnIntervalTime)
        Background.pieceSpawnInterval = setInterval(Tetromino.spawnPiece, Background.pieceSpawnIntervalTime);

        Background.render();

        addEventListener("focus", () => {
            if (Background.startAnimationPlaying) return;
            if (Tetromino.pieceFallInterval == null) {
                Tetromino.pieceFallInterval = setInterval(Tetromino.fallAll, Tetromino.pieceFallIntervalTime);
            }
            if (Background.pieceSpawnInterval == null) {
                Background.pieceSpawnInterval = setInterval(Tetromino.spawnPiece, Background.pieceSpawnIntervalTime);
            }

            // for (let tetromino of Tetromino.activeTetrominos) {
            //     tetromino.unpauseAction();
            // }
        });

        addEventListener("blur", () => {
            if (Background.startAnimationPlaying) return;
            if (Tetromino.pieceFallInterval != null) {
                clearInterval(Tetromino.pieceFallInterval);
                Tetromino.pieceFallInterval = null;
            }
            if (Background.pieceSpawnInterval != null) {
                clearInterval(Background.pieceSpawnInterval);
                Background.pieceSpawnInterval = null;
            }

            for (let tetromino of Tetromino.activeTetrominos) {
                tetromino.pauseAction();
            }
        });

        let updatePieceSpawnIntervalTimeTimeout: number;
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

            clearTimeout(updatePieceSpawnIntervalTimeTimeout);
            updatePieceSpawnIntervalTimeTimeout = setTimeout(Background.updatePieceSpawnIntervalTime, 100);

            Background.render();
        });
    }

    private static updatePieceSpawnIntervalTime() {
        Background.pieceSpawnIntervalTime = Background.calculatePieceSpawnInterval();
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
        //PieceSpawnInterval should be intervalAtLowest at lowestColumnCount and intervalAtHighest and highestColumnCount and everything in between (Clamped between 1000 and 250)
        const lowestColumnCount = 13;
        const intervalAtLowest = 2200;
        const highestColumnCount = 48;
        const intervalAtHighest = 1500;

        let pieceSpawnInterval = intervalAtLowest + (lowestColumnCount * ((intervalAtLowest - intervalAtHighest) / (highestColumnCount - lowestColumnCount))) - ((intervalAtLowest - intervalAtHighest) / (highestColumnCount - lowestColumnCount)) * Background.canvasColumnCount;
        return clamp(pieceSpawnInterval, 250, 1000);
    }

    public static async endStartAnimation() {
        Background.startAnimationPlaying = false;

        Background.pieceSpawnIntervalTime = Background.calculatePieceSpawnInterval();

        while (Tetromino.pieceFallIntervalTime < 400) {
            Tetromino.pieceFallIntervalTime = Tetromino.pieceFallIntervalTime + 10;
            await sleep(Tetromino.pieceFallIntervalTime * 2);
        }
    }
}