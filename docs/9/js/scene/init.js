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

