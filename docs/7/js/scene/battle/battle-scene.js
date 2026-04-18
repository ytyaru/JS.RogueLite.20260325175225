class BattleSceneElement extends SceneElement {
    constructor(onNext) {
        super();
        this.onNext = onNext;
        this._isAutoProcessing = false;
        // 入力管理の初期化
        this.input = new InputManager((card) => this.runTurn(card));
    }

    _reset() {
        this.hero = new Battler('Hero', 10); // ライフ10に変更
        this.enemy = new Battler('Enemy', 10);
        this.turn = 1;
        this.deck = new Deck(CARD_LIST);
        this.deck.draw(3);
        this._isAutoProcessing = false;
    }

    show() {
        this._reset();
        this.input.enabled = true;
        super.show();
        this.render();
    }

    hide() {
        this.input.enabled = false;
        super.hide();
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
        this.render();

        // 2. Heroの選択アクション
        if (playerCard) {
            console.log(`[Hero Action] ${playerCard.name} を選択`);
            playerCard.execute(heroCtx);
        }
        this.deck.discard(this.deck.hand);
        this.render();

        if (this.enemy.isDead) return this.endBattle("勝利！");

        // 3. Enemyの行動 (自動カードを除外して選択)
        const manualCards = CARD_LIST.filter(c => !c.isAuto);
        const enemyCard = manualCards[Math.floor(Math.random() * manualCards.length)];
        console.log(`[Enemy Action] ${enemyCard.name} を実行`);
        enemyCard.execute(enemyCtx);
        this.render();

        if (this.hero.isDead) return this.endBattle("敗北...");

        // 4. ターン終了
        this.hero.endTurn();
        this.enemy.endTurn();
        this.turn++;
        this.deck.draw(3);
        this.render();
    }

    endBattle(message) {
        setTimeout(() => {
            alert(message);
            this.onNext();
        }, 100);
    }

    render() {
        this.removeChildren();
        this.input.updateHand(this.deck.hand);

        // UIコンポーネントの呼び出し
        this.appendChild(StatusView.make(this.hero, this.enemy, this.turn));
        this.appendChild(HandView.make(this.deck.hand, (card) => this.runTurn(card)));

        // 自動進行の判定
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
