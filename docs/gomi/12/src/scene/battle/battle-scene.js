class BattleSceneElement extends SceneElement {
    constructor(onNext) {
        super();
        this.onNext = onNext;
        this.input = new InputManager((idx) => this.handleInput(idx));
    }

    _reset() {
        this.hero = new PlayerBattler(10);
        this.enemy = new ComputerBattler(10);
        this.turn = 1;
        this.deck = new Deck(CARD_LIST); // 4枚から3枚引くDeck
        this.deck.draw(3);
    }

    show() {
        this._reset();
        this.input.enabled = true;
        super.show();
        this.render();
    }

    handleInput(index) {
        const card = this.deck.hand[index];
        if (card && !card.isAuto) this.runTurn(card);
    }

    runTurn(playerCard) {
        // 1. Heroフェーズ
        this.deck.hand.filter(c => c.isAuto).forEach(c => c.execute(this.hero, this.enemy));
        if (playerCard) playerCard.execute(this.hero, this.enemy);
        if (this.checkGameOver()) return;

        // 2. Enemyフェーズ
        // 敵も同じルールで手札から選ぶ（簡易化のため全リストから選ぶが、本来は敵用Deckが必要）
        const enemyCard = this.enemy.decide(CARD_LIST);
        enemyCard.execute(this.enemy, this.hero);
        if (this.checkGameOver()) return;

        // 3. ターン終了
        this.turn++;
        this.deck.draw(3);
        this.render();
    }

    checkGameOver() {
        if (this.enemy.isDead) { this.endBattle("勝利！"); return true; }
        if (this.hero.isDead) { this.endBattle("敗北..."); return true; }
        return false;
    }

    endBattle(message) {
        this.input.enabled = false;
        setTimeout(() => { alert(message); this.onNext(); }, 100);
    }

    render() {
        this.removeChildren();
        this.appendChild(StatusView.make(this.hero, this.enemy, this.turn));
        this.appendChild(HandView.make(this.deck.hand, (c) => this.runTurn(c)));
        setTimeout(() => FocusLooper.setFirst(), 10);
    }
}
customElements.define('battle-scene-element', BattleSceneElement);
