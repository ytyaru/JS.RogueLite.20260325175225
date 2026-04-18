class Battler {
    constructor(name, life = 10) {
        this.name = name;
        this.life = life;
        this.maxLife = life;
    }
    get isDead() { return this.life <= 0; }

    // ダメージを受ける窓口を一つにする
    receiveDamage(amount) {
        this.life = Math.max(0, this.life - amount);
    }
    // 回復
    heal(amount) {
        this.life = Math.min(this.maxLife, this.life + amount);
    }
}


/*
class Battler {
    constructor(name, life = 10) {
        this.name = name;
        this.maxLife = life;
        this.life = life;
        this.shield = 0;
        this.items = new Set();
        // 今ターンの統計（カードの効果判定用）
        this.turnStats = { damageDealt: 0, damageTaken: 0, selfDamage: 0 };
    }

    get isDead() { return this.life <= 0; }

    // ダメージを受ける処理を一元化（シールド計算などをここに入れる）
    receiveDamage(amount) {
        this.life -= amount;
        this.turnStats.damageTaken += amount;
    }
}
*/
