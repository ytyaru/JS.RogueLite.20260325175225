class Deck {
    constructor(masterCards) {
        this.masterCards = masterCards;
        this.drawPile = [];
        this.discardPile = [...masterCards];
        this.hand = [];
        this._reshuffle();
    }

    _reshuffle() {
        if (this.discardPile.length === 0) return; 
        this.drawPile = [...this.discardPile];
        this.discardPile = [];
        for (let i = this.drawPile.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.drawPile[i], this.drawPile[j]] = [this.drawPile[j], this.drawPile[i]];
        }
    }

    draw(count = 3) {
        this.hand = [];
        for (let i = 0; i < count; i++) {
            if (this.drawPile.length === 0) this._reshuffle();
            if (this.drawPile.length > 0) this.hand.push(this.drawPile.pop());
        }
        return this.hand;
    }

    // 使用したカードを捨札に送る
    discard(cards) {
        const targetCards = Array.isArray(cards) ? cards : [cards];
        this.discardPile.push(...targetCards);
    }
}

