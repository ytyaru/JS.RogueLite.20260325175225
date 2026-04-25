class BattleSceneElement extends SceneElement {
    constructor(onNext) {
        super();
        this.onNext = onNext;
        this._isAutoProcessing = false;
        // 入力管理の初期化
        this.input = new InputManager((card) => this.runTurn(card));
    }
    /*
    _reset() {
        this.hero = new Battler('Hero', 10); // ライフ10に変更
        this.enemy = new Battler('Enemy', 10);
        this.turn = 1;
        this.deck = new Deck(CARD_LIST);
        this.deck.draw(3);
        this._isAutoProcessing = false;
    }
    */
    _reset() {
        this.hero = new PlayerBattler(10);
        this.enemy = new ComputerBattler(10);
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
        //FocusLooper.setFirst();
    }

    hide() {
        this.input.enabled = false;
        super.hide();
    }
    runTurn(playerCard) {
        const heroCtx = { actor: this.hero, target: this.enemy, turn: this.turn };
        const enemyCtx = { actor: this.enemy, target: this.hero, turn: this.turn };

        // 1. Hero フェーズ
        // 自動発動
        this.deck.hand.filter(c => c.isAuto).forEach(c => this.hero.act(c, heroCtx));
        if (this._checkGameOver()) return;

        // 選択アクション
        if (playerCard) this.hero.act(playerCard, heroCtx);
        this.deck.discard(this.deck.hand);
        this.render();
        if (this._checkGameOver()) return;

        // 2. Enemy フェーズ
        const enemyCard = this.enemy.decideAction(CARD_LIST);
        this.enemy.act(enemyCard, enemyCtx);
        this.render();
        if (this._checkGameOver()) return;

        // 3. ターン終了フェーズ
        this.hero.endTurn();
        this.enemy.endTurn();
        this.turn++;
        this.deck.draw(3);
        this.render();
    }
    // 判定処理を共通化
    _checkGameOver() {
        if (this.enemy.isDead) {
            this.endBattle("勝利！");
            return true;
        }
        if (this.hero.isDead) {
            this.endBattle("敗北...");
            return true;
        }
        return false;
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
        this.appendChild(StatusView.make(this.hero, this.enemy, this.turn));
        this.appendChild(HandView.make(this.deck.hand, (card) => this.runTurn(card)));

        // シーン描画後に最初の有効なボタンにフォーカスを当てる（FocusLooper対策）
        setTimeout(() => {
            const firstBtn = this.querySelector('button:not([disabled])');
            if (firstBtn) firstBtn.focus();
        }, 0);

        // 自動進行
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
