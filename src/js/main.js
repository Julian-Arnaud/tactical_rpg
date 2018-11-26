//---- timer part to slow down animation ----
let fpsInterval, startTime, now, then, elapsed;
//-------------------------------------------

let mapCanva, mapCtx;
let infosCanva, infosCtx;
const step = 80;
let crosshair;
let hero, clerk;
let chars;
let _activeChar;
let token;
let iLeft, iRight, iUp, iDown;
let ivLeft, ivRight, ivUp, ivDown;

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

    // moche mais charge hero
    iLeft = iRight = iUp = iDown = new Image();
    iLeft.src = "../assets/left.png";
    iRight.src = "../assets/right.png";
    iUp.src = "../assets/up.png";
    iDown.src = "../assets/down.png";

    //chargement 2e perso
    ivLeft = ivRight = ivUp = ivDown = new Image();
    ivLeft.src = "../assets/vieuxLeft.png";
    ivRight.src = "../assets/vieuxRight.png";
    ivUp.src = "../assets/vieuxUp.png";
    ivDown.src = "../assets/vieuxDown.png";

    let  classClerk = new Classe("Clerk", 10, 16, 3, 9, new Weapon("Mace", 13), new Armor("Holy robe", 5));
    clerk = new Character("Old man", classClerk, [ivLeft, ivRight, ivUp, ivDown], 3, 3);

    let classWarrior = new Classe("Warrior", 14, 12, 4, 7, new Weapon("Sword", 10), new Armor("Buckle", 6));
    hero = new Character("Adol", classWarrior, [iLeft, iRight, iUp, iDown], 0, 0);

    token = 0;

    chars = [hero, clerk];

    _activeChar = chars[token];

    crosshair = new CrossHair(_activeChar.getX(), _activeChar.getY(), _activeChar.getClasse().getMoves());

    drawActiveInfo(_activeChar);
    fpsInterval = 1000 / 15;
    then = Date.now();
    startTime = then;
    drawActiveChar();
};

function drawActiveInfo(aChar) {
    infosCtx.save();
    infosCtx.clearRect(0, 0, 250, 800);
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

        mapCtx.drawImage(hero.getImgs()[0], hero.getX()*80, hero.getY()*80);
        mapCtx.drawImage(clerk.getImgs()[0], clerk.getX()*80, clerk.getY()*80);

        mapCtx.strokeRect(crosshair.x * 80, crosshair.y *80, step, step);
        mapCtx.restore();

    }
}

document.onkeydown = function (event) {
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
    constructor(name, c, imgs, iX, iY) {
        this.name = name;
        this.classe = c;
        this.images = imgs;
        this.x = iX;
        this.y = iY;
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

    getImgs() {
        return this.images;
    }

    playOrReset() {
        this.played = !this.played;
    }

    /*cLeft() {
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
    }*/
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
        this.initX = aCharX;
        this.initY = aCharY;
        this.x = aCharX;
        this.y = aCharY;
        this.rangeMax = this.range = moves;
        this.kUp = false;
        this.kDown = false;
        this.kLeft = false;
        this.kRight = false;
        this.kMove = false;
        this.kReset = false;
        this.kDone = false;

        this.actionStack = [];
    }

    _right() {
        if(this.range > 0) {
            if(this.peek() === "LEFT") {
                this.pop();
                this.range++;
                this.push("RIGHT");
            }
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
            if(this.peek() === "RIGHT") {
                this.pop();
                this.range++;
                this.push("LEFT");
            }
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
            if(this.peek() === "DOWN") {
                this.pop();
                this.range++;
                this.push("UP");
            }
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
            if(this.peek() === "UP") {
                this.pop();
                this.range++;
                this.push("DOWN");
            }
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
        this.initX = xx;
        this.initY = yy;
        this.x = xx;
        this.y = yy;
        this.rangeMax = this.range = moves;
        this.kUp = false;
        this.kDown = false;
        this.kLeft = false;
        this.kRight = false;
        this.kMove = false;
        this.kReset = false;
        this.kDone = false;
        this.actionStack = [];
    }

    moveActive(char) {
        if(charPos[this.y][this.x] === 0 && !char.played) {
            charPos[char.getY()][char.getX()] = 0;
            charPos[this.y][this.x] = -2;
            char.setX(this.x);
            char.setY(this.y);
            //char.playOrReset();
            this.range = 0;
            this.kDone = true;
            if(token === 0) {
                token = 1;
                _activeChar = chars[token];
                //_activeChar.playOrReset();
            } else {
                token = 0;
                _activeChar = chars[token];
                //_activeChar.playOrReset();
            }
            this.update(_activeChar.getX(), _activeChar.getY(), _activeChar.getClasse().getMoves());
            drawActiveInfo(_activeChar);
        }
    }

    resetPos() {
        if(!this.kDone){
            this.x = this.initX;
            this.y = this.initY;
            this.range = this.rangeMax;
        }
    }

    push(str) {
        this.actionStack.push(str);
    }

    pop() {
        this.actionStack.pop();
    }

    peek() {
        return this.actionStack.peek();
    }
}