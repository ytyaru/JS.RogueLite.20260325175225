class FinishedSceneElement extends SceneElement {
    constructor(onNext) {
        super();
        this._={onNext};
        this.#make();
        console.log('hide():', this.hide);
    }
    #make() {
        this.appendChild(Dom.tags.h1('Game over'));
        this.appendChild(Dom.tags.button({onclick:(e)=>this._.onNext()}, '再開'));
    }
}
customElements.define('finished-scene-element', FinishedSceneElement);
