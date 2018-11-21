//---- timer part to slow down animation ----
let fpsInterval, startTime, now, then, elapsed;
//-------------------------------------------

let mapCanva, mapCtx;
let infosCanva, infosCtx;
const step = 80;
let crosshair;
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

let charPos = [
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

    crosshair = new CrossHair(0, 0, 4);

    let classWarrior = new Classe("Warrior", 14, 12, 4, 7, new Weapon("Sword", 10), new Armor("Buckle", 6));
    let hero = new Character("Adol", classWarrior);
    _activeChar = hero;

    drawActiveInfo(_activeChar);
    fpsInterval = 1000 / 15;
    then = Date.now();
    startTime = then;
    drawActiveChar();
    //window.requestAnimationFrame(drawActiveChar);
};

function drawActiveInfo(aChar) {
    infosCtx.save();
    infosCtx.fillStyle = "white";
    infosCtx.font = "36px";
    // char name & class
    infosCtx.fillText(aChar.getName(), 55, 33);
    infosCtx.fillText(aChar.getClasse().getClassName(), 55, 65);
    // char caracs
    infosCtx.fillText(aChar.getClasse().getStrength(), 55, 133);
    infosCtx.fillText(aChar.getClasse().getConstitution(), 55, 170);
    infosCtx.fillText(aChar.getClasse().getMoves(), 159, 133);
    infosCtx.fillText(aChar.getClasse().getLuck(), 159, 170);
    // char stuff
    infosCtx.fillText(aChar.getClasse().getWeapon().getWName(), 55, 240);
    infosCtx.fillText(aChar.getClasse().getWeapon().getWValue(), 159, 240);
    infosCtx.fillText(aChar.getClasse().getArmor().getAName(), 55, 277);
    infosCtx.fillText(aChar.getClasse().getArmor().getAValue(), 159, 277);

    infosCtx.restore();
}

function drawActiveChar() {
    window.requestAnimationFrame(drawActiveChar);
    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        mapCtx.save();
        mapCtx.clearRect(0, 0, 800, 800);
        if(crosshair.kLeft === true) {
            crosshair._left();
            //_activeChar.cLeft();
        }
        if(crosshair.kRight === true) {
            crosshair._right();
            //_activeChar.cRight();
        }
        if(crosshair.kUp === true) {
            crosshair._up();
            //_activeChar.cUp();
        }
        if(crosshair.kDown === true) {
            crosshair._down();
            //_activeChar.cDown();
        }

        if(crosshair.kMove === true) {
            crosshair.moveActive(_activeChar);
        }
        if(crosshair.kReset === true) {
            crosshair.resetPos();
        }

        if(_activeChar.orientation === "LEFT") {
            mapCtx.drawImage(iLeft, _activeChar.getX()*80, _activeChar.getY()*80);
        }
        if(_activeChar.orientation === "RIGHT") {
            mapCtx.drawImage(iRight, _activeChar.getX()*80, _activeChar.getY()*80);
        }
        if(_activeChar.orientation === "UP") {
            mapCtx.drawImage(iUp, _activeChar.getX()*80, _activeChar.getY()*80);
        }
        if(_activeChar.orientation === "DOWN") {
            mapCtx.drawImage(iDown, _activeChar.getX()*80, _activeChar.getY()*80);
        }
        mapCtx.strokeRect(crosshair.x * 80, crosshair.y *80, step, step);
        mapCtx.restore();

    }
}

document.onkeydown = function (event) {
    console.log(event);
    if(event.key === "ArrowUp") {
        crosshair.kUp = true;
    }
    if(event.key === "ArrowDown") {
        crosshair.kDown = true;
    }
    if(event.key === "ArrowLeft") {
        crosshair.kLeft = true;
    }
    if(event.key === "ArrowRight") {
        crosshair.kRight = true;
    }
    if(event.key === "q") {
        crosshair.kMove = true;
    }
    if(event.key === "d") {
        crosshair.kReset = true;
    }
};

document.onkeyup = function (event) {
    if(event.key === "ArrowUp") {
        crosshair.kUp = false;
    }
    if(event.key === "ArrowDown") {
        crosshair.kDown = false;
    }
    if(event.key === "ArrowLeft") {
        crosshair.kLeft = false;
    }
    if(event.key === "ArrowRight") {
        crosshair.kRight = false;
    }
    if(event.key === "q") {
        crosshair.kMove = false;
    }
    if(event.key === "d") {
        crosshair.kReset = false;
    }
};

class Character {
    constructor(name, c) {
        this.name = name;
        this.classe = c;
        this.x = this.y = 0;
        this.orientation = "DOWN";
        this.played = false;
    }

    getClasse() {
        return this.classe;
    }

    getName() {
        return this.name;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setX(nX) {
        this.x = nX;
    }

    setY(nY) {
        this.y = nY;
    }

    playOrReset() {
        this.played = !this.played;
    }

    cLeft() {
        if(this.x > 0) {
            if(charPos[this.y][this.x-1] !== -1) {
                this.x--;
                this.orientation = "LEFT";
            }
        } else {
            this.x = 0;
        }
    }

    cRight() {
        if(this.x < 9) {
            if(charPos[this.y][this.x+1] !== -1) {
                this.x++;
                this.orientation = "RIGHT";
            }
        } else {
            this.x = 9;
        }
    }

    cUp() {
        if(this.y > 0) {
            if(charPos[this.y-1][this.x] !== -1) {
                this.y--;
                this.orientation = "UP";
            }
        } else {
            this.y = 0;
        }
    }

    cDown() {
        if(this.y < 9) {
            if(charPos[this.y+1][this.x] !== -1) {
                this.y++;
                this.orientation = "DOWN";
            }
        } else {
            this.y = 9;
        }
    }
}

class Classe {
    constructor(name, str, con, mov, lck, weap, armor) {
        this.className = name;
        this.strength = str;
        this.constitution = con;
        //this.movesMax = mov;
        this.moves = mov;
        this.luck = lck;
        this.weapon = weap;
        this.armor = armor;
    }

    getClassName() {
        return this.className;
    }

    getStrength() {
        return this.strength;
    }

    getConstitution() {
        return this.constitution;
    }

    getMoves() {
        return this.moves;
    }

    getLuck() {
        return this.luck;
    }

    getWeapon() {
        return this.weapon;
    }

    getArmor() {
        return this.armor;
    }
}

class Weapon {
    constructor(n, val) {
        this.wName = n;
        this.wValue = val;
    }

    getWName() {
        return this.wName;
    }

    getWValue() {
        return this.wValue;
    }
}

class Armor {
    constructor(n, val) {
        this.aName = n;
        this.aValue = val;
    }

    getAName() {
        return this.aName;
    }

    getAValue() {
        return this.aValue;
    }
}

class CrossHair {
    constructor(aCharX, aCharY, moves) {
        this.x = aCharX;
        this.y = aCharY;
        this.rangeMax = this.range = moves;
        this.kUp = false;
        this.kDown = false;
        this.kLeft = false;
        this.kRight = false;
        this.kMove = false;
        this.kReset = false;
    }

    _right() {
        if(this.range > 0) {
            if (this.x < 9) {
                this.x++;
                this.range--;
            }
            else {
                this.x = 9;
            }
        }
    }

    _left() {
        if(this.range > 0) {
            if (this.x > 0) {
                this.x--;
                this.range--;
            }
            else {
                this.x = 0;
            }
        }
    }
    _up() {
        if(this.range > 0) {
            if (this.y > 0) {
                this.y--;
                this.range--;
            }
            else {
                this.y = 0;
            }
        }
    }

    _down() {
        if(this.range > 0) {
            if (this.y < 9) {
                this.y++;
                this.range--;
            }
            else {
                this.y = 9;
            }
        }
    }

    update(xx, yy, moves) {
        this.x = xx;
        this.y = yy;
        this.rangeMax = this.range = moves;
    }

    moveActive(char) {
        if(charPos[this.y][this.x] === 0 && !char.played) {
            charPos[char.getY()][char.getX()] = 0;
            charPos[this.y][this.x] = -2;
            char.setX(this.x);
            char.setY(this.y);
            char.playOrReset();
        }
    }

    resetPos() {
        this.range = this.rangeMax;
    }
}