import {Position, Character} from "./character";
import {Grid} from "./grid";

let canvas, ctx;
const step = 80;
let char;
let grids;

window.onload = function () {
    canvas = document.querySelector("#map");
    ctx = canvas.getContext("2d");

    grids = new Grid();


    let pos = new Position(0, 0);
    char = new Character('hero', 3,20, null, null, null, pos);

    drawMap(ctx);

    requestAnimationFrame(drawChar);
// display map as an image, then draw/ refresh the characters when needed
};

// display map image
function drawMap(context) {

}

function drawChar() {
    ctx.save();

    ctx.fillRect(char.getPosition().getX(), char.getPosition().getY(), step, step);

    ctx.restore();
}

// handlers to move chars