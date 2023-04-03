class Tetromino {
    static activeTetrominos = [];
    hasRotated = false;
    ticksSinceRotate;
    ticksSinceMove;
    ticksSinceAction;
    lastTickAction;
    constructor(x, y, piece, rotation) {
        this.x = x;
        this.y = y;
        this.piece = piece;
        this.rotation = rotation;
    }

    fall() {
        this.y++;
        render();
    }

    doEffect() {
        if ((this.lastTickAction == Actions.MovedLeft || this.lastTickAction == Actions.MovedRight) && Math.floor(Math.random() * 2) != 0) {
            switch (this.lastTickAction) {
                case Actions.MovedLeft: {
                    this.moveLeft();
                    break;
                }
                case Actions.MovedRight: {
                    this.moveRight();
                    break;
                }
            }
        } else if ((this.ticksSinceAction == undefined || this.ticksSinceAction > 5) && Math.floor(Math.random() * 6) == 0) {
            switch (Math.floor(Math.random() * 3)) {
                case 0: {
                    this.moveLeft();
                    break;
                }
                case 1: {
                    this.moveRight();
                    break;
                }
                case 2: {
                    if (this.hasRotated) break;
                    this.lastTickAction = Actions.Rotated;
                    this.rotation = (this.rotation + 1) % 4;
                    this.hasRotated = true;
                    break;
                }
            }
        }

        if (this.lastTickAction != undefined) {
            this.ticksSinceAction = 0;
        } else {
            this.ticksSinceAction++;
        }

        render();
    }

    moveLeft() {
        if (!this.checkSafe(this.x-1,this.y)) return
        this.lastTickAction = Actions.MovedLeft;
        this.x--;
    }

    moveRight() {
        if (!this.checkSafe(this.x+1,this.y)) return
        this.lastTickAction = Actions.MovedRight;
        this.x++;
    }

    checkSafe(x, y){
        //Check if there are any other tetrominos in the way of where I want to go
        const tetrominosFound = Tetromino.activeTetrominos.filter(t=>
            t.x <= x + 4 &&
            t.x >= x - 4 &&
            t.y <= y + 4 &&
            t.y >= y - 4);
        //This should be 2 because we don't want to include ourselves
        return tetrominosFound.length < 2;
    }
}

const Actions = {
    Rotated: 0,
    MovedLeft: 1,
    MovedRight: 2
}