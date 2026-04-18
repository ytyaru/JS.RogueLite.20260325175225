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
        console.log(`--- Turn ${this.turn} Start ---`);
        const heroCtx = { actor: this.hero, target: this.enemy, turn: this.turn };
        const enemyCtx = { actor: this.enemy, target: this.hero, turn: this.turn };

        // 1. Heroの自動発動カード
        this.deck.hand.filter(c => c.isAuto).forEach(c => {
            console.log(`[Hero Auto] ${c.name} 発動`);
            c.execute(heroCtx);
        });

        // 2. Heroの選択アクション
        console.log(`[Hero Action] ${playerCard.name} を選択`);
        playerCard.execute(heroCtx);
        
        // 手札を捨てる（ここで捨てないと、次のターンも同じ自動発動カードが残ってしまう）
        this.deck.discard(this.deck.hand);
        
        this.render();

        if (this.enemy.isDead) {
            setTimeout(() => this.endBattle("勝利！"), 100);
            return;
        }

        // 3. Enemyの行動
        // 本来はEnemyも手札を持つべきですが、今はリストからランダム
        const enemyCard = CARD_LIST[Math.floor(Math.random() * CARD_LIST.length)];
        console.log(`[Enemy Action] ${enemyCard.name} を実行`);
        enemyCard.execute(enemyCtx);

        this.render();

        if (this.hero.isDead) {
            setTimeout(() => this.endBattle("敗北..."), 100);
            return;
        }

        // 4. ターン終了
        this.hero.endTurn();
        this.enemy.endTurn();
        this.turn++;
        this.deck.draw(3);
        this.render();
        console.log(`--- Turn End (Hero HP: ${this.hero.life}, Enemy HP: ${this.enemy.life}) ---`);
    }
    /*
    endBattle(message) {
        alert(message);
        this.onNext();
    }
    */
    endBattle(message) {
        // わずかに遅らせることで、ブラウザがHP 0の描画を完了させる
        setTimeout(() => {
            alert(message);
            this.onNext();
        }, 100);
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

