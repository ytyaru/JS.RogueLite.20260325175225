class InitSceneElement extends SceneElement {
    constructor(onNext) {
        super();
        this._={onNext};
        this.#make();
    }
    #make() {
        this.appendChild(Dom.tags.h1('RougeLikeGame'));
        //this.appendChild(Dom.tags.button({onclick:(e)=>this._.onNext()}, '開始'));
        //this.appendChild(Dom.tags.button({onclick:(e)=>alert('click!')}, '開始'));
        //this.appendChild(Dom.tags.button({onclick:(e)=>console.log('click!')}, '開始'));
        //this.appendChild(Dom.tags.button({listeners:{click:(e)=>console.log('click!')}}, '開始'));
        //this.appendChild(Dom.tags.button({listeners:{click:[(e)=>console.log('click!'),true]}}, '開始'));
        this.appendChild(Dom.tags.button({listeners:{click:(e)=>this._.onNext()}}, '開始'));
    }
}

customElements.define('init-scene-element', InitSceneElement);
