import { CONFIG } from "./config.js";
import { Sprite } from "./sprite.js";

export class Enemy extends Sprite{
    constructor(){
        super(200, 50, 70,90,'./assets/images/spider.png');
        this.speed = 5;
        this.isDead = false;
    }
    move(){
        this.y = this.y + this.speed;
        this.fall();
        this.outOfScreen();
    }

    fall(){
        if(this.isDead){
            this.speed = 20;
           
        }
    }

    outOfScreen(){
        
        if(!this.isDead && this.y>CONFIG.BOARD_HEIGHT){
            this.y = 0;
        }
    }

    draw(ctx, isGameOn){
            ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        if(isGameOn){
        this.move();
        }
    }

}