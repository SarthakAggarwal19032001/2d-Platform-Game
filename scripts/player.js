import { CONFIG } from "./config.js";
import { Sprite } from "./sprite.js";

export class Player extends Sprite{
    constructor(){
        super(10, 0, 120,120,'./assets/images/player.gif'); // Calling a Parent class Constructor
        this.y = CONFIG.FLOOR - this.h;
        this.speed = 10;
        this.force = 0;
        this.isJump = false;
    }

    jump(){
        if(!this.isJump){
        this.isJump = true;
        this.force = -20;
        this.y = this.y + this.force;
        }
    }
    fall(){
        if(this.y + this.h >=CONFIG.FLOOR){
            this.y = CONFIG.FLOOR - this.h;
            this.isJump = false;
            return ;
        }
        this.y = this.y + this.force;
        this.force = this.force + CONFIG.GRAVITY;
    }

    outOfScreen(){
        if(this.x>CONFIG.BOARD_WIDTH){
            return true;
        }
        return false;
    }
    move(){
        this.x = this.x + this.speed;
    }
    draw(ctx){
        
            ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        
    }
}