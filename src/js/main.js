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

    chars = [hero, clerk];

    _activeChar = clerk;

    crosshair = new CrossHair(_activeChar.getX(), _activeChar.getY(), _activeChar.getClasse().getMoves());

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
            console.log(crosshair);
            //_activeChar.cLeft();
        }
        if(crosshair.kRight === true) {
            crosshair._right();
            console.log(crosshair);
            //_activeChar.cRight();
        }
        if(crosshair.kUp === true) {
            console.log(crosshair);
            crosshair._up();
            //_activeChar.cUp();
        }
        if(crosshair.kDown === true) {
            console.log(crosshair);
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

        /*if(_activeChar.orientation === "LEFT") {
            mapCtx.drawImage(_activeChar.getImgs()[0], _activeChar.getX()*80, _activeChar.getY()*80);
        }
        if(_activeChar.orientation === "RIGHT") {
            mapCtx.drawImage(_activeChar.getImgs()[1], _activeChar.getX()*80, _activeChar.getY()*80);
        }
        if(_activeChar.orientation === "UP") {
            mapCtx.drawImage(_activeChar.getImgs()[2], _activeChar.getX()*80, _activeChar.getY()*80);
        }
        if(_activeChar.orientation === "DOWN") {
            mapCtx.drawImage(_activeChar.getImgs()[3], _activeChar.getX()*80, _activeChar.getY()*80);
        }*/
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

        this.actionStack = [""];
    }

    _right() {
        if(this.range >= 0 && this.range <= this.rangeMax) {
            if(this.x < 9) {
                if(this.peek() === "LEFT") {
                    this.pop();
                    if(this.range <= this.rangeMax) {
                        this.range++;
                        this.x++;
                    } else {
                        this.range = this.rangeMax;
                    }
                } else {
                    if(this.range > 0) {
                        this.range--;
                        this.x++;
                        this.push("RIGHT");
                    } else {
                        this.range = 0;
                    }
                }
            } else {
                this.x = 9;
            }
        }
        console.log(this.actionStack);
    }

    _left() {
        if(this.range >= 0 && this.range <= this.rangeMax) {
            if(this.x > 0) {
                if(this.peek() === "RIGHT") {
                    this.pop();
                    if(this.range <= this.rangeMax) {
                        this.range++;
                        this.x--;
                    } else {
                        this.range = this.rangeMax;
                    }
                } else {
                    if(this.range > 0) {
                        this.range--;
                        this.x--;
                        this.push("LEFT");
                    } else {
                        this.range = 0;
                    }
                }
            } else {
                this.x = 0
            }
        }
        console.log(this.actionStack);
    }
    _up() {
        if(this.range >= 0 && this.range <= this.rangeMax) {
            if(this.y > 0) {
                if(this.peek() === "DOWN") {
                    this.pop();
                    if(this.range <= this.rangeMax) {
                        this.range++;
                        this.y--;
                    } else {
                        this.range = this.rangeMax;
                    }
                } else {
                    if(this.range > 0) {
                        this.range--;
                        this.y--;
                        this.push("UP");
                    } else {
                        this.range = 0;
                    }
                }
            } else {
                this.y = 0;
            }
        }
        console.log(this.actionStack);
    }

    _down() {
        if(this.range >= 0 && this.range <= this.rangeMax) {
            if(this.y < 9){
                if(this.peek() === "UP") {
                    this.pop();
                    if(this.range <= this.rangeMax) {
                        this.range++;
                        this.y++;
                    } else {
                        this.range = this.rangeMax;
                    }
                } else {
                    if(this.range > 0) {
                        this.y++;
                        this.range--;
                        this.push("DOWN");
                    } else {
                        this.range = 0;
                    }
                }
            } else {
                this.y = 9;
            }
        }
        console.log(this.actionStack);
    }

    update(xx, yy, moves) {
        this.initX = xx;
        this.initY = yy;
        this.x = xx;
        this.y = yy;
        this.rangeMax = moves;
        this.range = moves;
        this.kUp = false;
        this.kDown = false;
        this.kLeft = false;
        this.kRight = false;
        this.kMove = false;
        this.kReset = false;
        this.kDone = false;
        this.actionStack = [""];
    }

    moveActive(char) {
        if(charPos[this.y][this.x] === 0 && !char.played) {
            charPos[char.getY()][char.getX()] = 0;
            charPos[this.y][this.x] = -2;
            char.setX(this.x);
            char.setY(this.y);
            char.playOrReset();
            this.range = 0;
            this.kDone = true;
            _activeChar = hero;
            this.update(hero.getX(), hero.getY(), hero.getClasse().getMoves());
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
        if(this.actionStack.length === 0) {
            return "";
        } else {
            const tmp = this.actionStack.pop();
            this.actionStack.push(tmp);
            return tmp;
        }
    }

    empty() {
        return this.actionStack.empty();
    }
}