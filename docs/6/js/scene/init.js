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
