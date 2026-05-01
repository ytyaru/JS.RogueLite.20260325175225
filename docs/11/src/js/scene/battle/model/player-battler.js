(function() {
    /**
     * プレイヤーバトラー
     */
    class PlayerBattler extends Battler {
        constructor(life = 10, body = 10) {
            super('英雄', life, body);
        }

        /**
         * プレイヤーの意思決定
         * UI（HandView）に対して、手札の選択を要求する。
         */
        async decide(ui) {
            // UI視点の動詞「requestSelect」を呼び出すゴミ
            return await ui.requestSelect(this.deck.hand);
        }
    }

    window.PlayerBattler = PlayerBattler;
})();
