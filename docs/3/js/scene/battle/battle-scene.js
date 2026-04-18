class BattleSceneElement extends SceneElement {
    constructor(onNext) {
        super();
        this.onNext = onNext;
        // コンストラクタでは初期化せず、show() で行う
    }

    _reset() {
        this.hero = new Battler('Hero', 20);
        this.enemy = new Battler('Enemy', 20);
        this.turn = 1;
        // CARD_LIST は外部で定義されている想定
        this.deck = new Deck(CARD_LIST); 
        this.deck.draw(3); // 最初の手札を引く
    }

    show() {
        this._reset(); // ここでHPも山札もリセットされる
        super.show();
        this.render();
    }

    runTurn(playerCard) {
        const context = { actor: this.hero, target: this.enemy, turn: this.turn };
        
        // 1. Heroの行動
        playerCard.execute(context);
        if (this.enemy.isDead) return this.endBattle("勝利！");

        // 2. Enemyの行動 (今はランダムなカードを使用)
        const enemyCard = CARD_LIST[Math.floor(Math.random() * CARD_LIST.length)];
        enemyCard.execute({ actor: this.enemy, target: this.hero, turn: this.turn });
        if (this.hero.isDead) return this.endBattle("敗北...");

        // 3. ターン終了処理
        this.turn++;
        this.deck.draw(3); // 次のターンの手札を引く
        this.render();
    }

    endBattle(message) {
        alert(message);
        this.onNext();
    }

    render() {
        this.removeChildren();
        const tags = Dom.tags;

        // ステータス表示
        this.appendChild(tags.div({class:'status'}, 
            tags.h2(`Turn: ${this.turn}`),
            tags.div({style:'display:flex; gap:20px;'},
                tags.div(tags.h3('Hero'), tags.p(`♥ ${this.hero.life} / ${this.hero.maxLife}`)),
                tags.div(tags.h3('Enemy'), tags.p(`♥ ${this.enemy.life} / ${this.enemy.maxLife}`))
            )
        ));

        // 手札表示 (this.deck.hand を使用)
        const handDiv = tags.div({class:'hand', style:'margin-top:20px; display:flex; gap:10px;'});
        
        this.deck.hand.forEach(card => {
            handDiv.appendChild(tags.button({
                style: 'padding:10px; cursor:pointer;',
                listeners: { click: () => this.runTurn(card) }
            }, [
                tags.div({style:'font-weight:bold'}, card.name),
                tags.div({style:'font-size:0.8em'}, card.description)
            ]));
        });

        this.appendChild(handDiv);
    }
}
customElements.define('battle-scene-element', BattleSceneElement);

/*
class BattleSceneElement extends SceneElement {
    constructor(onNext) {
        super();
        this.onNext = onNext;
        this._reset(); // 初回用
    }

    // 状態のリセット（再開時にも呼ぶ）
    _reset() {
        this.hero = new Battler('Hero', 20);
        this.enemy = new Battler('Enemy', 20);
        this.turn = 1;
        this.deck = new Deck(CARD_LIST); // Deckクラス（後述）
    }

    show() {
        this._reset(); // 画面が表示されるたびにリセット
        super.show();
        this.render();
    }

    runTurn(playerCard) {
        const context = { actor: this.hero, target: this.enemy, turn: this.turn };
        
        // 1. Heroの行動
        playerCard.execute(context);
        if (this.enemy.isDead) return this.endBattle("勝利！");

        // 2. Enemyの行動（簡易AI）
        const enemyCard = CARD_LIST[Math.floor(Math.random() * CARD_LIST.length)];
        enemyCard.execute({ actor: this.enemy, target: this.hero, turn: this.turn });
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
*/
/*
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
*/
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
