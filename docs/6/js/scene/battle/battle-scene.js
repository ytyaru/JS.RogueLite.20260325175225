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

        // 1. Heroの自動発動
        this.deck.hand.filter(c => c.isAuto).forEach(c => {
            console.log(`[Hero Auto] ${c.name} 発動`);
            c.execute(heroCtx);
        });
        this.render(); // 自動発動の結果を一旦見せる

        // 2. Heroの選択アクション（playerCardがnullでない場合のみ）
        if (playerCard) {
            console.log(`[Hero Action] ${playerCard.name} を選択`);
            playerCard.execute(heroCtx);
        }
        
        this.deck.discard(this.deck.hand);
        this.render();

        if (this.enemy.isDead) {
            setTimeout(() => this.endBattle("勝利！"), 100);
            return;
        }

        // 3. Enemyの行動（Enemyも自動カードを考慮するならここを拡張するが、今はシンプルに）
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
    }
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

        // 1. ステータス表示（変更なし）
        this.appendChild(tags.div({class:'status'}, 
            tags.h2(`Turn: ${this.turn}`),
            tags.div({style:'display:flex; gap:20px; justify-content:center;'},
                tags.div(tags.h3('Hero'), tags.p(`♥ ${this.hero.life} / ${this.hero.maxLife}`)),
                tags.div(tags.h3('Enemy'), tags.p(`♥ ${this.enemy.life} / ${this.enemy.maxLife}`))
            )
        ));

        // 2. 手札表示
        const handDiv = tags.div({class:'hand'});
        this.deck.hand.forEach(card => {
            const isAuto = card.isAuto;
            
            // 属性オブジェクトをまず作成
            const btnProps = {
                style: 'padding:10px;'
            };

            // 自動発動かどうかに応じて、属性を使い分ける
            if (isAuto) {
                btnProps.disabled = 'disabled'; // 自動ならdisabledを追加
            } else {
                btnProps.listeners = { click: () => this.runTurn(card) }; // 手動ならクリックイベントを追加
            }

            handDiv.appendChild(tags.button(btnProps, 
                tags.div({style:'font-weight:bold'}, isAuto ? `[即] ${card.name}` : card.name),
                tags.div({style:'font-size:0.8em'}, card.description)
            ));
        });
        this.appendChild(handDiv);

        // 3. 自動進行の判定（変更なし）
        if (this.deck.hand.length > 0 && this.deck.hand.every(c => c.isAuto) && !this._isAutoProcessing) {
            this._isAutoProcessing = true;
            setTimeout(() => {
                this._isAutoProcessing = false;
                this.runTurn(null);
            }, 1500);
        }
    }
}
customElements.define('battle-scene-element', BattleSceneElement);

