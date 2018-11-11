class character {
    constructor(n, m, lm, w, a, p) {
        this.cName = n;
        this.cMove = m;
        this.cLifeMax = lm;
        this.cLife = lm;
        this.cWeapon = w;
        this.cArmor = a;
        this.cPowers = p;
        this.cStatus = true;
    }
    cName;
    cMove;
    cLifeMax;
    cLife;
    cWeapon;
    cArmor;
    cPowers;
    cStatus;

    hit(foe) {
        if(foe.cLife - this.cWeapon.wPower < 0) {
            foe.cLife = 0;
            foe.cStatus = false;
        } else {
            foe.cLife -= this.cWeapon.wPower;
        }
    }
}

class weapon {
    constructor(n, p, r, t) {
        this.wName = n;
        this.wPower = p;
        this.wRange = r;
        this.wType = t;
    }
    wName;
    wPower; // base value of weapon
    wRange; // range of the weapon (eg: 2 in line for a spear or 6 as a cone for a bow etc...)
    wType;  // kind of the weapon (eg: sword, spear, bow etc...)
}

class armor {
    constructor(n, d) {
        this.aName = n;
        this.aDef = d;
    }
    aName;
    aDef;  // base value of the armor
}

class power {
    constructor(n, ty, d, e, ta) {
        this.pName = n;
        this.pType = ty;
        this.pDmg = d;
        this.pElement = e;
        this.pTarget = ta;
    }
    pName;
    pType; // HEAL DAMAGE
    pDmg; // value of the effect
    pElement; // LIGHT DARK FIRE WATER THUNDER GROUND
    pTarget; // FOE HERO ANY
}