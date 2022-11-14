import { Bullet } from "./bullet.js";
import { CONFIG } from "./config.js";
import { Enemy } from "./enemy.js";
import { Player } from "./player.js";
import { keyPress } from "./game-engine.js";

export class Board{
    static bullets = []; // Bind with class
    constructor(ctx){
        this.ctx  = ctx;
        this.image = new Image();
        this.image.src = './assets/images/bg2.jpg';
       
        this.player = new Player();
        this.enemies = this.loadEnemies();
        //this.enemy = new Enemy();
        this.interval = undefined;
        this.gameLoop();
        this.gameMessage = "";
        this.isGameOn = true;
        //this.bullets = [];
    }

    isCollide(firstObject , secondObject){
        let distanceX = Math.abs(firstObject.x - secondObject.x);
        let distanceY = Math.abs(firstObject.y - secondObject.y);
        let maxWidth = Math.max(firstObject.w, secondObject.w);
        let maxHeight = Math.max(firstObject.h, secondObject.h);
        return distanceX<=maxWidth-40 && distanceY <= maxHeight-20;
    }

    stopGame(){
        window.removeEventListener('keydown', keyPress);
        clearInterval(this.interval);
        let count = 1;
        const anim = setInterval(()=>{
            if(count>8){
                clearInterval(anim);
            }
            this.ctx.fillStyle = 'red';
            this.ctx.font = '50px serif';
            console.log('Count ', count);
            if(count%2!=0){
                this.gameMessage = "GAME OVER...";
            }
            else{
                this.gameMessage = "";
            }
            count++;
            this.draw();
            //this.ctx.fillText(this.gameMessage, CONFIG.BOARD_WIDTH/2, CONFIG.BOARD_HEIGHT/2);
        }, 400);
    }

    collisionBulletAndEnemy(){
        for(let bullet of Board.bullets){
            for(let enemy of this.enemies){
                if(this.isCollide(bullet, enemy)){
                    enemy.isDead = true;
                }
            }
        }
    }

    collision(){
        for(let enemy of this.enemies){
            if(this.isCollide(this.player, enemy)){
                this.gameMessage = "GAME OVER";
                this.isGameOn = false;
                return ;
            }
        }
    }

    gameOver(){
            this.gameMessage = "GAME WIN....";
    }

    drawMessage(){
        
        if(this.gameMessage.length>0){
        this.ctx.font = '60px serif';
        this.ctx.fillStyle="red";
        this.ctx.fillText(this.gameMessage, CONFIG.BOARD_WIDTH/2-200, CONFIG.BOARD_HEIGHT/2-200);
        }
    }

    fireBullets(){
            let bullet = new Bullet((this.player.x + this.player.w-50), (this.player.y + this.player.h/2-10));
            Board.bullets.push(bullet);
    }

     drawBullets(){
        for(let bullet of Board.bullets){
            bullet.draw(this.ctx);
        }
     }

    keyCapture(event){
            console.log('Key Event ', event.keyCode);
            if(event.keyCode == CONFIG.RIGHT_ARROW){
                this.player.move();
                if(this.player.outOfScreen()){
                    this.gameOver();
                }
            }
            else if(event.keyCode == CONFIG.SPACE){
                this.fireBullets();

            }
            else if (event.keyCode == CONFIG.ENTER_KEY){
                this.player.jump();
            }
    }

    loadEnemies(){
        const GAP = 200;
        let currentX = 50;
        let speed = 5;
        const enemies = [];
        let lastX = 0;
        for(let i = 0; i<CONFIG.MAX_ENEMY; i++){
            let enemy = new Enemy();
            enemy.x = lastX + currentX + GAP;
            lastX = enemy.x;
            enemy.speed = speed;
            speed = speed + 2;
            enemies.push(enemy);
            
        }
        return enemies;
    }

    gameLoop(){
        this.interval = setInterval(()=>{
            this.draw();
            this.player.fall();
            this.collision();
            if(!this.isGameOn){
                this.draw();
            this.stopGame();
            }
            this.collisionBulletAndEnemy();
           
            //console.log('Game Loop');
        },50);
    }

    // Player and enemy both will be draw on Board.



    draw(){
       
            //console.log('What is this ',this);
            this.ctx.clearRect(0,0,CONFIG.BOARD_WIDTH, CONFIG.BOARD_HEIGHT);
            this.ctx.drawImage(this.image, 0, 0);
            this.player.draw(this.ctx);
            this.drawEnemies();
            this.drawBullets();
            this.drawMessage();

            
            //this.enemy.draw(this.ctx);
        
        
    }

    drawEnemies(){
        for(let enemy of this.enemies){
            enemy.draw(this.ctx, this.isGameOn);
        }
    }
}
