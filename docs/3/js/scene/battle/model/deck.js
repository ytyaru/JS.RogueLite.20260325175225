class Deck {
    constructor(masterCards) {
        this.masterCards = masterCards; // 全カードのリスト
        this.drawPile = [];             // 山札
        this.discardPile = [...masterCards]; // 最初はすべて捨札に入れてからシャッフル
        this.hand = [];                 // 現在の手札
        this._reshuffle();
    }

    _reshuffle() {
        console.log("山札をシャッフルします");
        this.drawPile = [...this.discardPile];
        this.discardPile = [];
        // Fisher-Yates Shuffle
        for (let i = this.drawPile.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.drawPile[i], this.drawPile[j]] = [this.drawPile[j], this.drawPile[i]];
        }
    }

    // 指定枚数を引いて手札にする
    draw(count = 3) {
        this.hand = [];
        for (let i = 0; i < count; i++) {
            if (this.drawPile.length === 0) this._reshuffle();
            if (this.drawPile.length > 0) {
                this.hand.push(this.drawPile.pop());
            }
        }
        return this.hand;
    }
}


/*
class Deck {
    constructor(masterCards) {
        this.masterCards = masterCards;
        this.drawPile = [];                     // 山札
        this.discardPile = [...masterCards];    // 捨札
        this.hand = [];                         // 手札
        this._reshuffle();
    }

    _reshuffle() {
        this.drawPile = [...this.discardPile];
        this.discardPile = [];
        // Fisher-Yates
        for (let i = this.drawPile.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.drawPile[i], this.drawPile[j]] = [this.drawPile[j], this.drawPile[i]];
        }
    }

    draw(count) {
        const drawn = [];
        for (let i = 0; i < count; i++) {
            if (this.drawPile.length === 0) this._reshuffle();
            if (this.drawPile.length > 0) drawn.push(this.drawPile.pop());
        }
        this.hand = drawn;
        return drawn;
    }
}
*/

/*
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
*/
