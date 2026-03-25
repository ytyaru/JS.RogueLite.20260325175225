class Game extends HTMLElement {
    constructor() {
        super();
        const names = 'Init Decision Finished'.split(' ');
        const shiftedNames = [...names];
        shiftedNames.push(shiftedNames.shift());
        const ons = shiftedNames.map(n=>()=>this.dispatchEvent(this._.events[n.toLowerCase()]));
//        console.log(InitSceneElement);
        this._={
            events:names.map(n=>n.toLowerCase()).reduce((o,n)=>{o[n]=new CustomEvent(n); return o;},{}),
            scenes:names.reduce((o,n,i)=>{
                const cls = (new Function(`return ${n}SceneElement;`))();
                console.log(n, cls);
                o[n.toLowerCase()]=new cls(ons[i]);
                return o;
            },{}),
            //scenes:names.reduce((o,n,i)=>{o[n]=new (new Function(`return ${n}SceneElement;`))(ons[i]); return o;},{}),
//            scenes:names.reduce((o,n,i)=>{o[n]=document.createElement(``)(ons[i]); return o;},{}),
        };
        console.log(this._.scenes);
        this.append(...names.map(n=>this._.scenes[n.toLowerCase()]));
        this.addEventListener('init', (event) => {
            console.log('init');
            this._.scenes.finished.hide();
            this._.scenes.decision.hide();
            this._.scenes.init.show();
            // Startボタン押下待ち
            // 画面作成
        });
        this.addEventListener('decision', (event) => {
            console.log('decision');
            this._.scenes.init.hide();
            this._.scenes.finished.hide();
            this._.scenes.decision.show();
            // ボタン押下されたら実行する
            // 計算処理
            // 死亡なら'finished'に遷移する
            // if (death) {this.dispatchEvent(this._.events.finished)}
        });
        this.addEventListener('finished', (event) => {
            console.log('finished');
            this._.scenes.decision.hide();
            this._.scenes.init.hide();
            this._.scenes.finished.show();
            // 結果表示
            // Restartボタン押下待ち
        });
        this.dispatchEvent(this._.events.init)
    }
}
customElements.define("rogue-lite-game", Game);
