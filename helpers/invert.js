function invert(input, min, max) {
    let distance = input - min;
    return max - distance;
}