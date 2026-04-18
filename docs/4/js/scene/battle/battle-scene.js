class BattleSceneElement extends SceneElement {
    constructor(onNext) {
        super();
        this.onNext = onNext;
    }

    _reset() {
        this.hero = new Battler('Hero', 20);
        this.enemy = new Battler('Enemy', 20);
        this.turn = 1;
        this.deck = new Deck(CARD_LIST);
        this.deck.draw(3);
    }

    show() {
        this._reset();
        super.show();
        this.render();
    }

    runTurn(playerCard) {
        const heroCtx = { actor: this.hero, target: this.enemy, turn: this.turn };
        const enemyCtx = { actor: this.enemy, target: this.hero, turn: this.turn };

        // 1. 自動発動カードの処理 (手札にある isAuto カードをすべて実行)
        this.deck.hand.filter(c => c.isAuto).forEach(c => {
            console.log("Auto Activate:", c.name);
            c.execute(heroCtx);
        });

        // 2. プレイヤーが選択したカードの実行
        if (!playerCard.isAuto) {
            playerCard.execute(heroCtx);
        }

        this.deck.discard(this.deck.hand);
        if (this.enemy.isDead) return this.endBattle("勝利！");

        // 3. 敵の行動
        const enemyCard = CARD_LIST[Math.floor(Math.random() * CARD_LIST.length)];
        enemyCard.execute(enemyCtx);
        if (this.hero.isDead) return this.endBattle("敗北...");

        // 4. ターン終了処理（履歴の更新）
        this.hero.endTurn();
        this.enemy.endTurn();
        
        this.turn++;
        this.deck.draw(3);
        this.render();
    }

    endBattle(message) {
        alert(message);
        this.onNext();
    }

    render() {
        this.removeChildren();
        const tags = Dom.tags;

        this.appendChild(tags.div({class:'status'}, 
            tags.h2(`Turn: ${this.turn}`),
            tags.div({style:'display:flex; gap:20px;'},
                tags.div(tags.h3('Hero'), tags.p(`♥ ${this.hero.life} / ${this.hero.maxLife}`)),
                tags.div(tags.h3('Enemy'), tags.p(`♥ ${this.enemy.life} / ${this.enemy.maxLife}`))
            )
        ));

        const handDiv = tags.div({class:'hand', style:'margin-top:20px; display:flex; gap:10px;'});
        this.deck.hand.forEach(card => {
            // 修正ポイント：第2引数以降に子要素を並べる（配列にしない）
            handDiv.appendChild(tags.button({
                style: 'padding:10px; cursor:pointer;',
                listeners: { click: () => this.runTurn(card) }
            }, 
            tags.div({style:'font-weight:bold'}, card.name),
            tags.div({style:'font-size:0.8em'}, card.description)
            ));
        });
        /*
        // render() 内のループ
        this.deck.hand.forEach(card => {
            const btn = tags.button({
                listeners: { 
                    click: () => this.runTurn(card),
                    mouseenter: () => this.preview(card), // プレビュー表示
                    mouseleave: () => this.render()       // 元に戻す（再描画）
                }
            }, tags.div(card.name), tags.div(card.description));
            handDiv.appendChild(btn);
        });
        */
        this.appendChild(handDiv);
    }
}
customElements.define('battle-scene-element', BattleSceneElement);

