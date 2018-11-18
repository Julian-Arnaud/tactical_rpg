let mapCanva, mapCtx;
let infosCanva, infosCtx;
const step = 80;
let _activeChar;
let iLeft, iRight, iUp, iDown;
const map = [
    [1, 1, 1, 1, 1, 2, 2, 1, 1, 1],
    [2, 2, 2, 1, 1, 1, 1, 0, 0, 1],
    [2, 2, 1, 1, 1, 1, 0, 0, 1, 1],
    [2, 2, 2, 1, 1, 1, 1, 0, 0, 2],
    [2, 2, 1, 1, 1, 2, 1, 0, 2, 2],
    [2, 1, 1, 1, 2, 2, 1, 1, 2, 1],
    [1, 1, 1, 0, 0, 1, 2, 2, 1, 1],
    [1, 1, 1, 0, 0, 1, 2, 2, 1, 1],
    [1, 2, 2, 1, 1, 2, 2, 1, 2, 1],
    [1, 2, 2, 1, 1, 0, 1, 2, 1, 1]
];

const charPos = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0,-1,-1, 0],
    [0, 0, 0, 0, 0, 0,-1,-1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0,-1,-1, 0],
    [0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0,-1,-1, 0, 0, 0, 0, 0],
    [0, 0, 0,-1,-1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0,-1, 0, 0, 0, 0]
];

window.onload = function () {
    mapCanva = document.querySelector("#map");
    mapCtx = mapCanva.getContext("2d");

    infosCanva = document.querySelector("#charInfo");
    infosCtx = infosCanva.getContext("2d");

    iLeft = new Image();
    iRight = new Image();
    iUp = new Image();
    iDown = new Image();
    iLeft.src = "../assets/left.png";
    iRight.src = "../assets/right.png";
    iUp.src = "../assets/up.png";
    iDown.src = "../assets/down.png";

    let char = new Character("Test", 4);
    _activeChar = new ActiveChar(char);

    drawActiveInfo(_activeChar);
    window.requestAnimationFrame(drawActiveChar);
};

function drawActiveInfo(aChar) {
    infosCtx.save();
    infosCtx.fillText(aChar.getActive().getName(), 0, 10);
    infosCtx.fillText(aChar.getActive().getMoves(), 0, 20);
    infosCtx.restore();
}

function drawActiveChar() {
    mapCtx.save();
    mapCtx.clearRect(0, 0, 800, 800);
    if(_activeChar.kLeft === true) _activeChar.getActive().cLeft();
    if(_activeChar.kRight === true) _activeChar.getActive().cRight();
    if(_activeChar.kUp === true) _activeChar.getActive().cUp();
    if(_activeChar.kDown === true) _activeChar.getActive().cDown();

    if(_activeChar.getActive().orientation === "LEFT") {
        mapCtx.drawImage(iLeft, _activeChar.getActive().getX(), _activeChar.getActive().getY());
    }
    if(_activeChar.getActive().orientation === "RIGHT") {
        mapCtx.drawImage(iRight, _activeChar.getActive().getX(), _activeChar.getActive().getY());
    }
    if(_activeChar.getActive().orientation === "UP") {
        mapCtx.drawImage(iUp, _activeChar.getActive().getX(), _activeChar.getActive().getY());
    }
    if(_activeChar.getActive().orientation === "DOWN") {
        mapCtx.drawImage(iDown, _activeChar.getActive().getX(), _activeChar.getActive().getY());
    }
    //mapCtx.strokeRect(_activeChar.getActive().getX(), _activeChar.getActive().getY(), step, step);
    mapCtx.restore();
    window.requestAnimationFrame(drawActiveChar);
}

document.onkeydown = function (event) {
    if(event.key === "ArrowUp") {
        _activeChar.kUp = true;
    }
    if(event.key === "ArrowDown") {
        _activeChar.kDown = true;
    }
    if(event.key === "ArrowLeft") {
        _activeChar.kLeft = true;
    }
    if(event.key === "ArrowRight") {
        _activeChar.kRight = true;
    }
};

document.onkeyup = function (event) {
    if(event.key === "ArrowUp") {
        _activeChar.kUp = false;
    }
    if(event.key === "ArrowDown") {
        _activeChar.kDown = false;
    }
    if(event.key === "ArrowLeft") {
        _activeChar.kLeft = false;
    }
    if(event.key === "ArrowRight") {
        _activeChar.kRight = false;
    }
};

class ActiveChar {
    constructor(char) {
        this.active = char;
        this.kUp = false;
        this.kDown = false;
        this.kLeft = false;
        this.kRight = false;
    }

    getActive() {
        return this.active;
    }
}

class Character {
    constructor(name, moves) {
        this.name = name;
        this.moves = moves;
        this.rX = this.rY = 0;
        this.x = this.y = 0;
        this.orientation = "DOWN";
    }

    getName() {
        return this.name;
    }

    getMoves() {
        return this.moves;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    cLeft() {
        if(this.x > 0) {
            if(charPos[this.rY][this.rX-1] !== -1) {
                this.x -= step;
                this.rX -= 1;
                this.orientation = "LEFT";
            }
        } else {
            this.x = 0;
        }
    }

    cRight() {
        if(this.x < 720) {
            if(charPos[this.rY][this.rX+1] !== -1) {
                this.x += step;
                this.rX += 1;
                this.orientation = "RIGHT";
            }
        } else {
            this.x = 720;
        }
    }

    cUp() {
        if(this.y > 0) {
            if(charPos[this.rY-1][this.rX] !== -1) {
                this.y -= step;
                this.rY -= 1;
                this.orientation = "UP";
            }
        } else {
            this.y = 0;
        }
    }

    cDown() {
        if(this.y < 720) {
            if(charPos[this.rY+1][this.rX] !== -1) {
                this.y += step;
                this.rY += 1;
                this.orientation = "DOWN";
            }
        } else {
            this.y = 720;
        }
    }
}
