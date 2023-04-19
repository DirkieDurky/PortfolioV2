function hexToRgba(hex: string, opacity: number = 100) {
    let charArray: string[];
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        charArray = hex.substring(1).split('');
        if (charArray.length === 3) {
            charArray = [charArray[0], charArray[0], charArray[1], charArray[1], charArray[2], charArray[2]];
        }
        let char: number = +('0x' + charArray.join(''));
        return 'rgba(' + [(char >> 16) & 255, (char >> 8) & 255, char & 255].join(',') + ',' + opacity / 100 + ')';
    }
    throw new Error('Bad Hex');
}

function invert(input: number, min: number, max: number) {
    let distance = input - min;
    return max - distance;
}

function shuffle(array: any[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function clamp(num: number, min: number, max: number) {
    return Math.min(Math.max(num, min), max);
}

function getKeyByValue(map: Map<any, any>, value: number): number {
    for (let item of map) {
        if (item[1] == value) return item[0];
    }
    throw new Error("Fuck you JS");
}