class InitSceneElement extends SceneElement {
    constructor(onNext) {
        super();
        this._={onNext};
        this._.isTransitioning = false; // 連続遷移防止フラグ
        this.#make();
        this.addEventListener('keydown', (e) => {
            if (this._.isTransitioning || e.repeat) return;
            if (e.key === 'Enter' || e.key === ' ') {
                this._.isTransitioning = true;
                this._.onNext();
            }
        });
    }
    show() {
        this._.isTransitioning = false; // 表示時にリセット
        super.show();
//        setTimeout(() => FocusLooper.setFirst(), 10);
    }
    #make() {
        this.appendChild(Dom.tags.h1('RougeLikeGame'));
        this.appendChild(Dom.tags.button({listeners:{click:(e)=>this._.onNext()}}, '開始'));
    }
}
customElements.define('init-scene-element', InitSceneElement);
/*
class InitSceneElement extends SceneElement {
    constructor(onNext) {
        super();
        this._={onNext};
        this.#make();
    }
    #make() {
        this.appendChild(Dom.tags.h1('RougeLikeGame'));
        this.appendChild(Dom.tags.button({listeners:{click:(e)=>this._.onNext()}}, '開始'));
    }
}
customElements.define('init-scene-element', InitSceneElement);
*/
/*
class InitSceneElement extends SceneElement {
    constructor(onNext) {
        super();
        this._onNext = onNext;
        this.#make();
        // キーボードイベント（Enterで開始）
        this.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') this._onNext();
        });
    }
    #make() {
        this.appendChild(Dom.tags.h1('RougeLikeGame'));
        const btn = Dom.tags.button({listeners:{click:(e)=>this._onNext()}}, '開始 (Enter)');
        this.appendChild(btn);
    }
    show() {
        super.show();
        // 表示されたらボタンにフォーカス
        //setTimeout(() => this.querySelector('button').focus(), 0);
//        FocusLooper.setFirst();
    }
}
customElements.define('init-scene-element', InitSceneElement);
*/

