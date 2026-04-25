class Card {
    constructor(id, name, isAuto = false) {
        this.id = id;
        this.name = name;
        this.isAuto = isAuto;
    }

    // 共通の実行窓口
    execute(actor, target) {
        this.apply(actor, target);
        // 自動発動札以外は、コンボ判定のためにIDを記録
        if (!this.isAuto) {
            actor.lastCardId = this.id;
        }
    }

    get description() { return ""; }
}

class SlashCard extends Card {
    constructor() { super('SLASH', '斬る'); }
    get description() { return "敵♥-1 ♡-N 連続選択時♡-1 -3迄"; }
    apply(actor, target) {
        // コンボ計算
        if (actor.lastCardId === 'SLASH') {
            actor.comboCount = Math.min(3, actor.comboCount + 1);
        } else {
            actor.comboCount = 1;
        }
        target.receiveDamage(1);
        target.reduceMaxHp(actor.comboCount);
    }
}

class SacrificeCard extends Card {
    constructor() { super('SACRIFICE', '捨て身'); }
    get description() { return "敵♥-3 自♥-1"; }
    apply(actor, target) {
        target.receiveDamage(3);
        actor.receiveDamage(1);
        actor.comboCount = 0; // コンボリセット
    }
}

class MedicineCard extends Card {
    constructor() { super('MEDICINE', '薬'); }
    get description() { return "自♥+3"; }
    apply(actor, target) {
        actor.heal(3);
        actor.comboCount = 0; // コンボリセット
    }
}

class AutoHealCard extends Card {
    constructor() { super('AUTO_HEAL', '自然治癒', true); }
    get description() { return "[即]自♥+1"; }
    apply(actor, target) {
        actor.heal(1);
        // 自然治癒はコンボをリセットしない
    }
}

const CARD_LIST = [new SlashCard(), new SacrificeCard(), new MedicineCard(), new AutoHealCard()];
