class Battler {
    #name;
    #life;
    #body;
    #combo;
    #lastCardId;

    constructor(name, life = 10, body = 10) {
        this.#name = name;
        this.#body = body;
        this.#life = life;
        this.#combo = 0;
        this.#lastCardId = null;
    }

    get name() { return this.#name; }

    get life() { return this.#life; }
    /**
     * 生命点の設定。
     * 0 未満にはならず、身体点（上限）を超えることもない。
     */
    set life(v) {
        this.#life = Math.max(0, Math.min(this.#body, v));
    }

    get body() { return this.#body; }
    /**
     * 身体点の設定。
     * 1 未満にはならない。
     * 身体点が減少した結果、現在の生命点を下回った場合は、生命点を身体点まで押し下げる。
     */
    set body(v) {
        this.#body = Math.max(1, v);
        if (this.#life > this.#body) {
            this.#life = this.#body;
        }
    }

    get combo() { return this.#combo; }
    set combo(v) { this.#combo = v; }

    get lastCardId() { return this.#lastCardId; }
    set lastCardId(v) { this.#lastCardId = v; }

    get isDead() { return this.#life <= 0; }
}

