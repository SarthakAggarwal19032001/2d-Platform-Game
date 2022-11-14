import { Board } from "./board.js";
import { CONFIG } from "./config.js";

window.addEventListener("load", bindEvents);
window.addEventListener('keydown',keyPress);
let board;
function bindEvents(){
    const canvas = document.querySelector('#board');
    canvas.width = CONFIG.BOARD_WIDTH;
    canvas.height = CONFIG.BOARD_HEIGHT;
    const context = canvas.getContext('2d');
     board = new Board(context); 
}

export function keyPress(event){
    board.keyCapture(event);

}