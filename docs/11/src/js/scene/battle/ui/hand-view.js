(function() {
    /**
     * 手札表示・選択管理（HandView）
     */
    class HandView {
        #container;

        constructor(containerElement) {
            this.#container = containerElement;
        }

        /**
         * 札の選択を要求する
         */
        requestSelect(hand) {
            return new Promise(resolve => this.#render(hand, resolve));
        }

        /**
         * 描画処理
         */
        #render(hand, resolve) {
            this.#clear();
            
            const area = Dom.tags.div({ class: 'hand-area' });
            
            hand.forEach(card => {
                area.appendChild(this.#createButton(card, resolve));
            });

            this.#container.appendChild(area);
            
            // window. を外し、正しいクラス名で呼び出す
            FocusLooper.setFirst();
        }

        /**
         * ボタン単体の生成とイベント設定
         */
        #createButton(card, resolve) {
            return Dom.tags.button({
                class: 'card-button',
                type: 'button',
                disabled: card.canSelect ? undefined : 'disabled',
                listeners: card.canSelect ? {
                    click: () => {
                        this.#clear();
                        resolve(card);
                    }
                } : {}
            }, card.name);
        }

        #clear() {
            if (this.#container) {
                this.#container.innerHTML = '';
            }
        }
    }

    window.HandView = HandView;
})();
