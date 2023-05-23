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
            this.pieceSpawnInterval = setInterval(Background.spawnPiece, this._pieceSpawnIntervalTime);
        }
    }

    constructor() {
        const blockSize = 40;
        Background.canvasColumnCount = Math.ceil(window.innerWidth / blockSize);
        Background.canvasRowCount = Math.ceil(window.innerHeight / blockSize);

        Background.canvasWidth = Background.canvasColumnCount * blockSize;
        Background.canvasHeight = Background.canvasRowCount * blockSize;

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
        Background.pieceSpawnInterval = setInterval(Background.spawnPiece, Background.pieceSpawnIntervalTime);

        Background.render();

        addEventListener("focus", () => {
            if (Background.startAnimationPlaying) return;
            if (Tetromino.pieceFallInterval == null) {
                Tetromino.pieceFallInterval = setInterval(Tetromino.fallAll, Tetromino.pieceFallIntervalTime);
            }
            if (Background.pieceSpawnInterval == null) {
                Background.pieceSpawnInterval = setInterval(Background.spawnPiece, Background.pieceSpawnIntervalTime);
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

        addEventListener("scroll", () => {
            Background.render();
        });
    }

    public static spawnPiece() {
        let x: number = -1;

        if (Tetromino.activeTetrominos.length > 0) {
            let scores: [xPos: number, score: number][] = [];
            for (let canvasX = 4; canvasX < Background.canvasColumnCount; canvasX++) {
                let distances: [xPos: number, distance: number][] = [];
                for (let i = 0; i < Tetromino.activeTetrominos.length; i++) {
                    distances.push([i, Math.abs(canvasX - Tetromino.activeTetrominos[i].x) + Tetromino.activeTetrominos[i].y]);
                }
                distances = distances.sort((a, b) => a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0);
                distances[0][1] *= 1000;
                if (distances.length > 1) distances[1][1] *= 500;
                if (distances.length > 2) distances[2][1] *= 200;

                let distanceSum = 0;
                for (let distance of distances) {
                    distanceSum += distance[1];
                }

                scores.push([canvasX, distanceSum]);
            }

            //Set x to the coordinate with the highest score
            let bestX = -1;
            let highestDistance = 0;
            for (let score of scores) {
                if (score[1] > highestDistance) { highestDistance = score[1]; bestX = score[0] };
            }

            x = bestX;
        } else {
            x = Math.floor(Math.random() * (Background.canvasColumnCount - 4)) + 4;
        }

        if (!xTooClose()) {
            Tetromino.activeTetrominos.push(new Tetromino(Tetromino.tetrominoBag.next().value, x, 0, Math.floor(Math.random() * 3)));
        }

        function xTooClose(): boolean {
            for (let tetromino of Tetromino.activeTetrominos) {
                if (tetromino.y + Math.abs(tetromino.x - x) < 10) {
                    return true;
                }
            }
            return false;
        }
    }

    private static updatePieceSpawnIntervalTime() {
        Background.pieceSpawnIntervalTime = Background.calculatePieceSpawnInterval();
    }

    private static drawBlock(x: number, y: number, color: string, opacity: number = 100) {
        Background.CTX.fillStyle = hexToRgba(color, opacity);
        Background.CTX.fillRect((Background.canvasWidth / Background.canvasColumnCount) * (x - 1), (Background.canvasHeight / Background.canvasRowCount * (y - 1)), Background.canvasWidth / Background.canvasColumnCount, Background.canvasHeight / Background.canvasRowCount);
    }

    private static drawPiece(x: number, y: number, piece: TetrominoConstant, rotation: number, opacity: number = 100) {
        let rotationInfo = piece.Rotations[rotation];

        for (let i = 0; i < rotationInfo.length; i++) {
            this.drawBlock(x + rotationInfo[i][0], y + rotationInfo[i][1], piece.Color, opacity);
        }
    }

    public static render() {
        let opacity = invert($(window).scrollTop()! / 8, 0, 100);

        if (opacity > 0) {
            if (Background.pieceSpawnInterval == null) Background.pieceSpawnInterval = setInterval(Background.spawnPiece, Background.pieceSpawnIntervalTime);
            if (Tetromino.pieceFallInterval == null) Tetromino.pieceFallInterval = setInterval(Tetromino.fallAll, Tetromino.pieceFallIntervalTime);
        } else {
            if (Background.pieceSpawnInterval != null) { clearInterval(Background.pieceSpawnInterval); Background.pieceSpawnInterval = null };
            if (Tetromino.pieceFallInterval != null) { clearInterval(Tetromino.pieceFallInterval); Tetromino.pieceFallInterval = null };
        }

        Background.CTX.clearRect(0, 0, Background.canvasWidth, Background.canvasHeight);
        for (let piece of Tetromino.activeTetrominos) {
            this.drawPiece(piece.x, piece.y, piece.piece, piece.rotation, opacity);
        }
    }

    private static calculatePieceSpawnInterval() {
        //PieceSpawnInterval should be intervalAtLowest at lowestColumnCount and intervalAtHighest and highestColumnCount and everything in between (Clamped between 1000 and 250)
        const lowestColumnCount = 13;
        const intervalAtLowest = 2200;
        const highestColumnCount = 48;
        const intervalAtHighest = 1800;

        let pieceSpawnInterval = intervalAtLowest + (lowestColumnCount * ((intervalAtLowest - intervalAtHighest) / (highestColumnCount - lowestColumnCount))) - ((intervalAtLowest - intervalAtHighest) / (highestColumnCount - lowestColumnCount)) * Background.canvasColumnCount;
        console.log(clamp(pieceSpawnInterval, 250, 9999))
        return clamp(pieceSpawnInterval, 250, 9999);
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