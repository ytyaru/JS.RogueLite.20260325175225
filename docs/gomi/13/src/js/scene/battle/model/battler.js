class Battler {
    constructor(name, life = 10) {
        this.name = name;
        this.maxLife = life;
        this.life = life;
        this.comboCount = 0; // 「斬る」の累積数
        this.lastCardId = null; // 直前に選択した札ID
    }

    get isDead() { return this.life <= 0; }

    // 現在ライフを減らす
    receiveDamage(amount) {
        this.life = Math.max(0, this.life - amount);
    }

    // 最大ライフを減らす（下限1）
    reduceMaxHp(amount) {
        this.maxLife = Math.max(1, this.maxLife - amount);
        // 現在ライフが最大ライフを超えたら押し下げる
        if (this.life > this.maxLife) {
            this.life = this.maxLife;
        }
    }

    // 回復（最大ライフまで）
    heal(amount) {
        this.life = Math.min(this.maxLife, this.life + amount);
    }

    // ターン終了時の処理
    endTurn() {
        // 今回はターンを跨ぐ状態異常がないため空だが、拡張用に残す
    }
}
