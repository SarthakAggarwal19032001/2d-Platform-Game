import { Board } from "./board.js";
import { Sprite } from "./sprite.js";
import { CONFIG } from "./config.js";

export class Bullet extends Sprite{
    constructor(x,y){
        super(x,y,30,30,'./assets/images/stone.png');
        this.speed = 15;
    }
    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        this.move();
        if(this.outOfScreen()==true){
            console.log("Out of Screen ", Board.bullets.length);
            Board.bullets.shift();
            console.log('After Delete ',Board.bullets.length);
        }
    }
    move(){
        this.x = this.x + this.speed;
    }

    outOfScreen(){
        if((this.x)>CONFIG.BOARD_WIDTH){
            return true;
        }
        return false;
    }

}