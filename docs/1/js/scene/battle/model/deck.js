class Deck {
    constructor(cards) {
        this.drawPile = [...cards]; // 山札
        this.discardPile = [];      // 捨札
        this.hand = [];             // 手札
    }

    draw(count) {
        if (this.drawPile.length < count) {
            this.reshuffle();
        }
        this.hand = this.drawPile.splice(0, count);
        return this.hand;
    }

    discardHand() {
        this.discardPile.push(...this.hand);
        this.hand = [];
    }

    reshuffle() {
        this.drawPile.push(...this.discardPile);
        this.discardPile = [];
        // ここでシャッフルアルゴリズムを実行
        this.drawPile.sort(() => Math.random() - 0.5);
    }
}

