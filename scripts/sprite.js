export class Sprite{
    constructor(x, y, w, h, src){
        this.x = x;
        this.h = h;
        this.w = w;
        this.y = y;
        this.speed = 2;
        this.image = new Image();
        this.image.src = src;

       
    }
}