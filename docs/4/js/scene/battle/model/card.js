class Card {
    constructor(id, name, effectConfigs, isAuto = false) {
        this.id = id;
        this.name = name;
        this.effectConfigs = effectConfigs; // [{type: Effects.DAMAGE_TARGET, value: 3}, ...]
        this.isAuto = isAuto; // 自動発動フラグ
    }

    // 予見（予測値の計算）
    calculate(context) {
        return this.effectConfigs.map(conf => ({
            type: conf.type,
            value: conf.type.calculate(context, conf.value)
        }));
    }

    // 説明文の自動生成（DRY！）
    get description() {
        return this.effectConfigs
            .map(conf => conf.type.text(conf.value))
            .join(' ');
    }

    // 実行
    execute(context) {
        const results = this.calculate(context);
        results.forEach(res => res.type.apply(context, res.value));
        return results;
    }
}

// 具体的なカードの定義（データとして定義できる）
const CARD_LIST = [
    new Card('SLASH', '斬る', [{ type: Effects.DAMAGE_TARGET, value: 1 }]),
    new Card('SACRIFICE', '捨て身', [
        { type: Effects.DAMAGE_TARGET, value: 3 },
        { type: Effects.DAMAGE_ACTOR, value: 1 }
    ]),
    new Card('HEAL', '薬', [{ type: Effects.HEAL_ACTOR, value: 5 }]),
    new Card('AUTO_HEAL', 'リジェネ', [{ type: Effects.HEAL_ACTOR, value: 1 }], true)
];
/*
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
*/
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
