class Tetromino {
    static activeTetrominos = [];
    actionSequence = [];
    actionStartIndex;
    constructor(x, y, piece, rotation) {
        this.x = x;
        this.y = y;
        this.piece = piece;
        this.rotation = rotation;

        for (let i=0;i<Math.floor(Math.random()*3);i++){
            this.actionSequence.push(Actions.Rotate);
        }
        const moveDirection = Math.floor(Math.random()*2) == 0 ? Actions.MoveLeft : Actions.MoveRight
        for (let i=0;i<Math.floor(Math.random()*5);i++){
            this.actionSequence.push(moveDirection);
        }
        shuffle(this.actionSequence);
        this.actionStartIndex = Math.floor(Math.random() * (canvasRowCount * .75) + canvasRowCount * .25);
    }

    fall() {
        this.y++;
        render();

        if (this.y > this.actionStartIndex) {
            const actionInterval = setInterval(()=>{
                if (this.actionSequence.length < 1) {
                    clearInterval(actionInterval);
                    return;
                }
                switch (this.actionSequence.pop()){
                    case Actions.MoveLeft: {
                        this.moveLeft();
                        break;
                    }
                    case Actions.MoveRight: {
                        this.moveRight();
                        break;
                    }
                    case Actions.Rotate: {
                        this.rotate();
                        break;
                    }
                }
                render();
            },250);
        }
    }

    moveLeft() {
        if (!this.checkSafe(this.x-1,this.y)) return
        this.lastTickAction = Actions.MoveLeft;
        this.x--;
    }

    moveRight() {
        if (!this.checkSafe(this.x+1,this.y)) return
        this.lastTickAction = Actions.MoveRight;
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

    rotate() {
        this.rotation = (this.rotation + 1) % 4;
    }
}

const Actions = {
    Rotate: 0,
    MoveLeft: 1,
    MoveRight: 2
}