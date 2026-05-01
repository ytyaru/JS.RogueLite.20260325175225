(function() {
    /**
     * バトラー基底クラス
     */
    class Battler {
        #name; #life; #body; #deck; #lastCardId;

        constructor(name, life = 10, body = 10) {
            this.#name = name;
            this.#body = body;
            this.#life = life;
            this.#deck = null;
            this.#lastCardId = null;
        }

        get name() { return this.#name; }
        get deck() { return this.#deck; }
        set deck(v) { this.#deck = v; }
        get life() { return this.#life; }
        set life(v) {
            this.#life = Math.max(0, Math.min(this.#body, v));
        }
        get body() { return this.#body; }
        set body(v) {
            this.#body = Math.max(1, v);
            if (this.#life > this.#body) { this.#life = this.#body; }
        }
        get lastCardId() { return this.#lastCardId; }
        set lastCardId(v) { this.#lastCardId = v; }
        get isDead() { return this.#life <= 0; }

        /**
         * 意思決定のインターフェース
         * @param {Object} ui UI操作用のサービス（HandView等）
         * @returns {Promise<Card|null>} 選択された札
         */
        async decide(ui) {
            throw new Error("decide() must be implemented");
        }
    }

    window.Battler = Battler;
})();
