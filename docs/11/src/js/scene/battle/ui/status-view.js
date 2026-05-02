(function() {
    /**
     * ステータス表示管理（StatusView）
     * 英雄と外敵の生命点・身体点を画面に表示する。
     */
    class StatusView {
        #container;

        constructor(containerElement) {
            this.#container = containerElement;
        }

        /**
         * ステータスの描画
         * @param {Battler} hero 英雄（自分）のインスタンス
         * @param {Battler} enemy 外敵（相手）のインスタンス
         */
        render(hero, enemy) {
            this.#clear();
            const tags = Dom.tags;

            // 画面設計に基づき、28pxの数値を左右に配置する構造を作る
            const view = tags.div({ id: 'status' },
                // 英雄側
                tags.div({ class: 'status-unit' },
                    tags.span({ id: 'hero-life' }, hero.life),
                    tags.span('/'),
                    tags.span({ id: 'hero-body' }, hero.body)
                ),
                // 外敵側
                tags.div({ class: 'status-unit' },
                    tags.span({ id: 'enemy-life' }, enemy.life),
                    tags.span('/'),
                    tags.span({ id: 'enemy-body' }, enemy.body)
                )
            );

            this.#container.appendChild(view);
        }

        #clear() {
            if (this.#container) {
                this.#container.innerHTML = '';
            }
        }
    }

    window.StatusView = StatusView;
})();
