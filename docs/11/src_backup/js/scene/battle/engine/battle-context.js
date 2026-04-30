// 審判（Engine）が作成し、カードに渡す情報パック
class BattleContext {
    constructor(actor, target, turnCount, history) {
        this.actor = actor;       // 行動者 (Hero or Enemy)
        this.target = target;     // 対象
        this.turnCount = turnCount;
        this.history = history;   // 前ターンの行動記録など
    }
}

