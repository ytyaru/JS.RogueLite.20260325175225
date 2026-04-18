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

