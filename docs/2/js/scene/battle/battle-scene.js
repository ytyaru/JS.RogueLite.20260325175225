class BattleSceneElement extends SceneElement {
    constructor(onNext) {
        super();
        this.onNext = onNext;
        this.hero = new Battler('Hero', 20);
        this.enemy = new Battler('Enemy', 20);
        this.turn = 1;
        // 本来はDeckクラスから取得するが、今は固定
        this.availableCards = [new SlashCard(), new SacrificeCard()];
    }

    show() {
        super.show();
        this.render();
    }

    // 1ターン（Heroの行動 -> Enemyの行動）を実行
    runTurn(playerCard) {
        // 1. Heroの行動
        const heroResult = playerCard.execute({ actor: this.hero, target: this.enemy });
        console.log("Hero action:", heroResult);

        if (this.enemy.isDead) return this.endBattle("勝利！");

        // 2. Enemyの行動 (今はランダム)
        const enemyCard = this.availableCards[Math.floor(Math.random() * this.availableCards.length)];
        const enemyResult = enemyCard.execute({ actor: this.enemy, target: this.hero });
        console.log("Enemy action:", enemyResult);

        if (this.hero.isDead) return this.endBattle("敗北...");

        this.turn++;
        this.render();
    }

    endBattle(message) {
        alert(message); // 簡易的な終了通知
        this.onNext();  // Finished画面へ
    }

    render() {
        this.removeChildren();
        const tags = Dom.tags;

        this.appendChild(tags.div({class:'status'}, 
            tags.h2(`Turn: ${this.turn}`),
            tags.p(`Hero: ${this.hero.life} / ${this.hero.maxLife}`),
            tags.p(`Enemy: ${this.enemy.life} / ${this.enemy.maxLife}`)
        ));

        const hand = tags.div({class:'hand'});
        // 3枚ランダムに並べる（仮）
        for(let i=0; i<3; i++) {
            const card = this.availableCards[Math.floor(Math.random() * this.availableCards.length)];
            hand.appendChild(tags.button({
                listeners: { click: () => this.runTurn(card) }
            }, `${card.name}\n(${card.description})`));
        }
        this.appendChild(hand);
    }
}
customElements.define('battle-scene-element', BattleSceneElement);

/*
//class DecisionSceneElement extends SceneElement {
class BattleSceneElement extends SceneElement {
    constructor(onNext) {
        super();
        this._={onNext};
        this.#make();
    }
    #make() {
        this.appendChild(Dom.tags.h1('HP:1'));
        //this.appendChild(Dom.tags.button({onclick:(e)=>this._.onNext()}, '死亡'));
        this.appendChild(Dom.tags.button({listeners:{click:(e)=>this._.onNext()}}, '死亡'));
    }
}
//customElements.define('decision-scene-element', DecisionSceneElement);
customElements.define('battle-scene-element', BattleSceneElement);
*/
