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

