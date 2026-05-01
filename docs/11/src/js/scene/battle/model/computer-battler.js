(function() {
    /**
     * コンピュータバトラー
     */
    class ComputerBattler extends Battler {
        constructor(life = 10, body = 10) {
            super('外敵', life, body);
        }

        /**
         * コンピュータの意思決定
         * UIは使わず、手札から自動発動以外の札をランダムに選ぶ。
         */
        async decide(ui) {
            const choices = this.deck.hand.filter(c => !c.isAuto);
            if (choices.length === 0) return null;
            return choices[Math.floor(Math.random() * choices.length)];
        }
    }

    window.ComputerBattler = ComputerBattler;
})();
