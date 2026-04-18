class Card {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    get description() { return ""; }
    execute(context) {
        return this.applyEffect(context);
    }
}

// 敵♥-1
class SlashCard extends Card {
    constructor() { super('SLASH', '斬る'); this.power = 1; }
    get description() { return `敵♥-${this.power}`; }
    applyEffect(context) {
        context.target.receiveDamage(this.power);
        return { type: 'damage', value: this.power, target: context.target.name };
    }
}

// 自♥-1, 敵♥-3
class SacrificeCard extends Card {
    constructor() { super('SACRIFICE', '捨て身'); this.power = 3; this.cost = 1; }
    get description() { return `敵♥-${this.power} / 自♥-${this.cost}`; }
    applyEffect(context) {
        context.target.receiveDamage(this.power);
        context.actor.receiveDamage(this.cost);
        return { type: 'sacrifice', damage: this.power, cost: this.cost };
    }
}

/*
class Card {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    // 抽象メソッド：サブクラスで実装する
    // 戻り値として「実際に起きたこと」を返すとログ表示に便利
    execute(context) {
        if (!this.canActivate(context)) return { success: false };
        return this.applyEffect(context);
    }

    canActivate(context) { return true; } // 発動条件（デフォルトは常に真）
    applyEffect(context) { throw new Error("実装が必要です"); }
}
class LifeStealCard extends Card {
    applyEffect(context) {
        const damage = 3; // 基本ダメージ
        // 前のターンに自傷したかチェック（履歴を参照）
        const wasSelfHarmed = context.history.lastTurn(context.actor).selfDamage > 0;
        
        context.target.life -= damage;
        let heal = 0;
        if (wasSelfHarmed) {
            heal = damage;
            context.actor.life += heal;
        }
        return { damage, heal };
    }
}
*/
