class TetrominoConstant {
    public Name: string;
    public Color: string;
    public Rotations: number[][][];

    constructor(name: string, color: string, rotations: number[][][]) {
        this.Name = name;
        this.Color = color;
        this.Rotations = rotations;
    }
}

let TetrominoConstants: TetrominoConstant[] = [];

TetrominoConstants.push(new TetrominoConstant("I", "#009ad6",
    [
        [[-1, 0], [-1, -1], [-1, -2], [-1, -3]],
        [[-2, -2], [-1, -2], [0, -2], [1, -2]],
        [[0, 0], [0, -1], [0, -2], [0, -3]],
        [[-2, -1], [-1, -1], [0, -1], [1, -1]],
    ]));

TetrominoConstants.push(new TetrominoConstant("L", "#e85b00",
    [
        [[-1, 0], [-1, -1], [-1, -2], [-2, -2]],
        [[-2, -1], [-1, -1], [0, -1], [0, -2]],
        [[-1, 0], [0, 0], [-1, -1], [-1, -2]],
        [[-2, 0], [-2, -1], [-1, -1], [0, -1]],
    ]));

TetrominoConstants.push(new TetrominoConstant("J", "#213cc3",
    [
        [[-2, 0], [-1, 0], [-1, -1], [-1, -2]],
        [[-2, -1], [-1, -1], [0, -1], [-2, -2]],
        [[-1, 0], [-1, -1], [-1, -2], [0, -2]],
        [[0, 0], [-2, -1], [-1, -1], [0, -1]],
    ]));

TetrominoConstants.push(new TetrominoConstant("T", "#b32487",
    [
        [[-1, 0], [-2, -1], [-1, -1], [-1, -2]],
        [[-2, -1], [-1, -1], [0, -1], [-1, -2]],
        [[-1, 0], [-1, -1], [0, -1], [-1, -2]],
        [[-1, 0], [-2, -1], [-1, -1], [0, -1]],
    ]));

TetrominoConstants.push(new TetrominoConstant("S", "#4fb225",
    [
        [[-1, 0], [-2, -1], [-1, -1], [-2, -2]],
        [[-2, -1], [-1, -1], [-1, -2], [0, -2]],
        [[0, 0], [-1, -1], [0, -1], [-1, -2]],
        [[-2, 0], [-1, 0], [-1, -1], [0, -1]],
    ]));

TetrominoConstants.push(new TetrominoConstant("Z", "#dc0732",
    [
        [[-2, 0], [-2, -1], [-1, -1], [-1, -2]],
        [[-1, -1], [0, -1], [-2, -2], [-1, -2]],
        [[-1, 0], [-1, -1], [0, -1], [0, -2]],
        [[-1, 0], [0, 0], [-2, -1], [-1, -1]],
    ]));

TetrominoConstants.push(new TetrominoConstant("O", "#e6a01a",
    [
        [[-1, 0], [0, 0], [-1, -1], [0, -1]],
        [[-1, 0], [0, 0], [-1, -1], [0, -1]],
        [[-1, 0], [0, 0], [-1, -1], [0, -1]],
        [[-1, 0], [0, 0], [-1, -1], [0, -1]],
    ]));