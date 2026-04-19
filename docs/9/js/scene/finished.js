/*
class FinishedSceneElement extends SceneElement {
    constructor(onNext) {
        super();
        this._={onNext};
        this.#make();
        console.log('hide():', this.hide);
    }
    #make() {
        this.appendChild(Dom.tags.h1('Game over'));
        this.appendChild(Dom.tags.button({listeners:{click:(e)=>this._.onNext()}}, '再開'));
    }
}
customElements.define('finished-scene-element', FinishedSceneElement);
*/
class FinishedSceneElement extends SceneElement {
    constructor(onNext) {
        super();
        this._={onNext};
        this.#make();
        // キーボードイベント（Enterで開始）
        this.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') this._onNext();
        });
//        console.log('hide():', this.hide);
    }
    #make() {
        this.appendChild(Dom.tags.h1('Game over'));
        this.appendChild(Dom.tags.button({listeners:{click:(e)=>this._.onNext()}}, '再開'));
    }
    show() {
        super.show();
        // 表示されたらボタンにフォーカス
        //setTimeout(() => this.querySelector('button').focus(), 0);
//        FocusLooper.setFirst();
    }
}
customElements.define('finished-scene-element', FinishedSceneElement);

