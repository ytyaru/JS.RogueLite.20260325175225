(function() {
    /**
     * 札の循環管理（Deck）
     */
    class Deck {
        #allCards;
        #hand;

        constructor(cards) {
            this.#allCards = [...cards];
            this.#hand = [];
        }

        get hand() {
            return this.#hand;
        }

        /**
         * 札を引く
         */
        draw(count = 3) {
            const pool = [...this.#allCards];
            this.#shuffle(pool);
            this.#hand = pool.slice(0, count);
            return this.#hand;
        }

        /**
         * Fisher-Yates アルゴリズムによるシャッフル
         */
        #shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        /**
         * 全カードの状態更新（将来用）
         */
        updateAll(context) {
            this.#allCards.forEach(card => {
                // 各カードのTrait等に更新が必要な場合のフック
            });
        }
    }

    window.Deck = Deck;
})();
