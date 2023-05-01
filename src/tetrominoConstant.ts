class TetrominoConstant {
    public Name: string;
    public Color: string;
    public ColorClassName: string;
    public Rotations: number[][][];

    constructor(name: string, color: string, colorClassName: string, rotations: number[][][]) {
        this.Name = name;
        this.Color = color;
        this.ColorClassName = colorClassName;
        this.Rotations = rotations;
    }
}

let TetrominoConstants: TetrominoConstant[] = [];

TetrominoConstants.push(new TetrominoConstant("I", "#2b87ab", "i-color",
    [
        [[-1, 0], [-1, -1], [-1, -2], [-1, -3]],
        [[-2, -2], [-1, -2], [0, -2], [1, -2]],
        [[0, 0], [0, -1], [0, -2], [0, -3]],
        [[-2, -1], [-1, -1], [0, -1], [1, -1]],
    ]));

TetrominoConstants.push(new TetrominoConstant("L", "#ba652e", "l-color",
    [
        [[-1, 0], [-1, -1], [-1, -2], [-2, -2]],
        [[-2, -1], [-1, -1], [0, -1], [0, -2]],
        [[-1, 0], [0, 0], [-1, -1], [-1, -2]],
        [[-2, 0], [-2, -1], [-1, -1], [0, -1]],
    ]));

TetrominoConstants.push(new TetrominoConstant("J", "#4152a3", "j-color",
    [
        [[-2, 0], [-1, 0], [-1, -1], [-1, -2]],
        [[-2, -1], [-1, -1], [0, -1], [-2, -2]],
        [[-1, 0], [-1, -1], [-1, -2], [0, -2]],
        [[0, 0], [-2, -1], [-1, -1], [0, -1]],
    ]));

TetrominoConstants.push(new TetrominoConstant("T", "#96417c", "t-color",
    [
        [[-1, 0], [-2, -1], [-1, -1], [-1, -2]],
        [[-2, -1], [-1, -1], [0, -1], [-1, -2]],
        [[-1, 0], [-1, -1], [0, -1], [-1, -2]],
        [[-1, 0], [-2, -1], [-1, -1], [0, -1]],
    ]));

TetrominoConstants.push(new TetrominoConstant("S", "#5a9641", "s-color",
    [
        [[-1, 0], [-2, -1], [-1, -1], [-2, -2]],
        [[-2, -1], [-1, -1], [-1, -2], [0, -2]],
        [[0, 0], [-1, -1], [0, -1], [-1, -2]],
        [[-2, 0], [-1, 0], [-1, -1], [0, -1]],
    ]));

TetrominoConstants.push(new TetrominoConstant("Z", "#b1324b", "z-color",
    [
        [[-2, 0], [-2, -1], [-1, -1], [-1, -2]],
        [[-1, -1], [0, -1], [-2, -2], [-1, -2]],
        [[-1, 0], [-1, -1], [0, -1], [0, -2]],
        [[-1, 0], [0, 0], [-2, -1], [-1, -1]],
    ]));

TetrominoConstants.push(new TetrominoConstant("O", "#bd9343", "o-color",
    [
        [[-1, 0], [0, 0], [-1, -1], [0, -1]],
        [[-1, 0], [0, 0], [-1, -1], [0, -1]],
        [[-1, 0], [0, 0], [-1, -1], [0, -1]],
        [[-1, 0], [0, 0], [-1, -1], [0, -1]],
    ]));