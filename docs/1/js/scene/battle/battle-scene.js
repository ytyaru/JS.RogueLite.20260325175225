//class DecisionSceneElement extends SceneElement {
class BattleSceneElement extends SceneElement {
    constructor(onNext) {
        super();
        this._={onNext};
        this.#make();
    }
    #make() {
        this.appendChild(Dom.tags.h1('HP:1'));
        //this.appendChild(Dom.tags.button({onclick:(e)=>this._.onNext()}, '死亡'));
        this.appendChild(Dom.tags.button({listeners:{click:(e)=>this._.onNext()}}, '死亡'));
    }
}
//customElements.define('decision-scene-element', DecisionSceneElement);
customElements.define('battle-scene-element', BattleSceneElement);
