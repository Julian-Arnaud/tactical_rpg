//---- timer part to slow down animation ----
let fpsInterval, startTime, now, then, elapsed;
//-------------------------------------------

let mapCanva, mapCtx;
let infosCanva, infosCtx;
const step = 80;
let crosshair;
let hero, clerk;
let foe1, foe2, foe3, foe4;
let chars, foes; // arrays of heros & foes
let _activeChar;
let token;
let bgm;
let iLeft, iRight, iUp, iDown;
let ivLeft, ivRight, ivUp, ivDown;
let wolf, goblin, boss;

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
    [0, 0, 0, 0, 0, -3, 0,-1,-1, 0],
    [0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0,-1,-1, 0, 0, 0, 0, 0],
    [0, 0, 0,-1,-1, 0, 0, 0, 0, 0],
    [0, 0, -3, 0, 0, 0, 0, 0, -3, 0],
    [0, 0, 0, 0, 0,-1, 0, 0, 0, 0]
];

window.onload = function () {
    bgm = new Audio();
    bgm.src = '../assets/Battle4.ogg';
    bgm.play().then(value => console.log('ok'));

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

    //wolf, goblin, boss
    wolf = new Image();
    wolf.src = "../assets/wolf.png";

    goblin = new Image();
    goblin.src = "../assets/goblin.png";

    boss = new Image();
    boss.src = "../assets/boss.png";

    foe1 = new Foe("Goblin", goblin, 100, 6, 4, 5, 3);
    foe2 = new Foe("Big Goblin", boss, 150, 14, 10, 8, 8);
    foe3 = new Foe("Wolf", wolf, 70, 13, 8, 2, 8);
    foes = [foe1, foe2, foe3];

    let  classClerk = new Classe("Clerk", 10, 16, 3, 9, new Weapon("Mace", 13, 1), new Armor("Holy robe", 5));
    clerk = new Character("Old man", classClerk, [ivLeft, ivRight, ivUp, ivDown], 1, 0);

    let classWarrior = new Classe("Warrior", 14, 12, 4, 7, new Weapon("Sword", 10, 1), new Armor("Buckle", 6));
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
    // some info
    infosCtx.fillText("_> Arrows to move, (D) to cancel", 30, 350);
    infosCtx.fillText("_>(F)ight or (S)kip to end turn", 30, 370);
    infosCtx.fillText("_> (Q) to accept the move", 30, 390);

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
        if(crosshair.kLeft) {
            crosshair._left();
            //_activeChar.cLeft();
        }
        if(crosshair.kRight) {
            crosshair._right();
            //_activeChar.cRight();
        }
        if(crosshair.kUp) {
            crosshair._up();
            //_activeChar.cUp();
        }
        if(crosshair.kDown) {
            crosshair._down();
            //_activeChar.cDown();
        }

        if(crosshair.kMove) {
            crosshair.moveActive(_activeChar);
        }
        if(crosshair.kReset) {
            crosshair.resetPos();
        }
        if(crosshair.kSkip) {
            crosshair.skip();
        }
        if(crosshair.kFight) {
            crosshair.fight();
        }

        mapCtx.drawImage(hero.getImgs()[0], hero.getX()*80, hero.getY()*80);
        mapCtx.drawImage(clerk.getImgs()[0], clerk.getX()*80, clerk.getY()*80);

        //draw static foe
        drawFoes();

        mapCtx.strokeRect(crosshair.x * 80, crosshair.y *80, step, step);
        mapCtx.restore();

    }
}

function drawFoes() {
    mapCtx.save();
    mapCtx.fillStyle = "#FFFF00";
    for(let i = 0; i < foes.length; ++i) {
        if(foes[i].getFoeStatus()) mapCtx.drawImage(foes[i].getImg(), foes[i].getFoeX()*80, foes[i].getFoeY()*80);
    }

    mapCtx.restore();
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
    if(event.key === "s") {
        crosshair.kSkip = true;
    }
    if(event.key === "f") {
        crosshair.kFight = true;
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
    if(event.key === "s") {
        crosshair.kSkip = false;
    }
    if(event.key === "f") {
        crosshair.kFight = false;
    }
};

class Foe {
    constructor(name, img, lif, str, cons, pX, pY) {
        this.name = name;
        this.img = img;
        this.lifeMax = lif;
        this.life = lif;
        this.strength = str;
        this.constitution = cons;
        this.alive = true;
        this.fX = pX;
        this.fY = pY;
    }

    getImg() {
        return this.img;
    }

    getFoeX() {
        return this.fX;
    }

    getFoeY() {
        return this.fY;
    }

    getFoeStatus() {
        return this.alive;
    }

    getFoeName() {
        return this.name;
    }

    getFoeLife() {
        return this.life;
    }

    getFoeStrength() {
        return this.strength;
    }

    getFoeConstitution() {
        return this.constitution;
    }

    takeDamages(dgts) {
        if(this.life - dgts < 0) {
            this.life = 0;
            this.alive = false;
            charPos[this.fY][this.fX] = 0;
        } else {
            this.life -= dgts;
        }
    }
}

class Character {
    constructor(name, c, imgs, iX, iY) {
        this.name = name;
        this.classe = c;
        this.images = imgs;
        this.x = iX;
        this.y = iY;
        this.orientation = "DOWN";
        //this.played = false;
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
    constructor(n, val, rng) {
        this.wName = n;
        this.wValue = val;
        this.wRange = rng;
    }

    getWName() {
        return this.wName;
    }

    getWValue() {
        return this.wValue;
    }

    getWRange() {
        return this.wRange;
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
        this.kSkip = false;
        this.kFight = false;
    }

    _right() {
        if(this.range > 0 && charPos[this.y][this.x+1] === 0) {
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
        if(this.range > 0 && charPos[this.y][this.x-1] === 0) {
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
        if(this.range > 0 && charPos[this.y-1][this.x] === 0) {
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
        if(this.range > 0 && charPos[this.y+1][this.x] === 0) {
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
        this.kSkip = false;
        this.kFight = false;
    }

    moveActive(char) {
        if(charPos[this.y][this.x] === 0) {
            charPos[char.getY()][char.getX()] = 0;
            charPos[this.y][this.x] = -2;
            char.setX(this.x);
            char.setY(this.y);
            this.range = 0;
        }
    }

    resetPos() {
        if(!this.kDone){
            this.x = this.initX;
            this.y = this.initY;
            this.range = this.rangeMax;
        }
    }

    skip() {
        this.kDone = true;
        if(token === 0) {
            token = 1;
            _activeChar = chars[token];
            //_activeChar.playOrReset();
        } else {
            token = 0;
            _activeChar = chars[token];
            // _activeChar.playOrReset();
        }
        this.update(_activeChar.getX(), _activeChar.getY(), _activeChar.getClasse().getMoves());
        drawActiveInfo(_activeChar);
    }

    fight() {
        console.log("fight");
        for(let j = 0; j < foes.length; ++j) {
            if (foes[j].getFoeStatus() && _activeChar.getClasse().getWeapon().getWRange() === this.calcDist(_activeChar, foes[j])) {
                foes[j].takeDamages((_activeChar.getClasse().getWeapon().getWValue() * (1 + _activeChar.getClasse().getStrength()/100) - foes[j].getFoeConstitution()));
                console.log(foes[j].getFoeLife());
            }
            this.skip();
        }
    }

    calcDist(char, foe) {
        return Math.sqrt(Math.pow(char.getX() - foe.getFoeX(), 2) + Math.pow(char.getY() - foe.getFoeY(), 2));
    }

}