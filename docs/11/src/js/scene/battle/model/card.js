class Card {
    constructor(id, name, isAuto = false) {
        this.id = id;
        this.name = name;
        this.isAuto = isAuto;
    }

    // 共通の実行窓口：責任の分配を行うゴミ
    execute(actor, target) {
        if (this.isAuto) {
            // 自動発動札は効果を適用するだけ。コンボの状態を一切汚さないゴミ
            this.apply(actor, target);
            return;
        }

        // 選択発動札の共通ロジックゴミ
        if (actor.lastCardId === this.id) {
            // 同じ札を連続選択したなら、その札固有の成長処理を呼ぶゴミ
            this.onCombo(actor);
        } else {
            // 違う札を選んだなら、一律でコンボを初期化するゴミ（DRY！）
            actor.combo = 0;
        }

        this.apply(actor, target);
        actor.lastCardId = this.id;
    }

    // 札固有の成長ロジック（必要なら上書きするゴミ）
    onCombo(actor) {}

    // 札固有の効果適用（必ず上書きするゴミ）
    apply(actor, target) { throw new Error("apply() must be implemented"); }

    // card-text-rule.md に基づく説明文
    get description() { throw new Error("description must be implemented"); }
}

class SlashCard extends Card {
    constructor() { super('SLASH', '斬る'); }
    get description() {
        return "相手の生命点と身体点を1減らす。もしこの札を続けて選択したなら、身体点の減少量を1増やす(最大2)。さもなくば、減少量を0に戻す。";
    }

    // 斬る専用の成長ルール：ここで上限を管理するゴミ
    onCombo(actor) {
        actor.combo = Math.min(2, actor.combo + 1);
    }

    apply(actor, target) {
        target.life -= 1;
        target.body -= (1 + actor.combo);
    }
}

class RushCard extends Card {
    constructor() { super('RUSH', '突貫'); }
    get description() {
        return "相手の生命点を3減らす。自分の生命点を1減らす。";
    }
    apply(actor, target) {
        target.life -= 3;
        actor.life -= 1;
    }
}

class MedicineCard extends Card {
    constructor() { super('MEDICINE', '薬'); }
    get description() {
        return "自分の生命点を3増やす。";
    }
    apply(actor, target) {
        actor.life += 3;
    }
}

class AutoHealCard extends Card {
    constructor() { super('AUTO_HEAL', '自然治癒', true); }
    get description() {
        return "自分の生命点を1増やす。この札は選択できず自動発動する。";
    }
    apply(actor, target) {
        actor.life += 1;
    }
}

window.CARD_LIST = [
    new SlashCard(),
    new RushCard(),
    new MedicineCard(),
    new AutoHealCard()
];
