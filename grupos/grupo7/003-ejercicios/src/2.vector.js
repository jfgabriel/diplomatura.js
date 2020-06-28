export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    sumar(vector) {
        return {
            x: vector.x + this.x,
            y: vector.y + this.y
        }
    }

}