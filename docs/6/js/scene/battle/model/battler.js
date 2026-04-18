class Battler {
    constructor(name, life = 10) {
        this.name = name;
        this.maxLife = life;
        this.life = life;
        // 履歴管理
        this.currentTurnStats = { damageTaken: 0, damageDealt: 0 };
        this.lastTurnStats = { damageTaken: 0, damageDealt: 0 };
    }

    get isDead() { return this.life <= 0; }

    receiveDamage(amount) {
        this.life = Math.max(0, this.life - amount);
        this.currentTurnStats.damageTaken += amount;
    }

    heal(amount) {
        this.life = Math.min(this.maxLife, this.life + amount);
    }

    // ターン終了時に統計を更新
    endTurn() {
        this.lastTurnStats = { ...this.currentTurnStats };
        this.currentTurnStats = { damageTaken: 0, damageDealt: 0 };
    }
}

