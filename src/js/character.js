export {Character, Weapon, Armor, Power, Position} from "./character";

class Character {
    constructor(n, m, lm, w, a, p, po) {
        this.cName = n;
        this.cMove = m;
        this.cLifeMax = lm;
        this.cLife = lm;
        this.cWeapon = w;
        this.cArmor = a;
        this.cPowers = p;
        this.cStatus = true;
        this.cPosition = po;
    }

    hit(foe) {
        if(foe.cLife - this.cWeapon.wPower < 0) {
            foe.cLife = 0;
            foe.cStatus = false;
        } else {
            foe.cLife -= this.cWeapon.wPower;
        }
    }

    getPosition() {
        return this.cPosition;
    }

    getWeapon() {
        return this.cWeapon;
    }

    getArmor() {
        return this.cArmor;
    }

    getPowers() {
        return this.cPowers;
    }
}

class Weapon {

    constructor(n, p, r, t) {
        this.wName = n;
        this.wPower = p;
        this.wRange = r;
        this.wType = t;
    }
}

class Armor {

    constructor(n, d) {
        this.aName = n;
        this.aDef = d;
    }
}

class Power {

    constructor(n, ty, d, e, ta) {
        this.pName = n;
        this.pType = ty;
        this.pDmg = d;
        this.pElement = e;
        this.pTarget = ta;
    }
}

class Position {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}