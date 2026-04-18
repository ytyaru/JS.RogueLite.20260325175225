class Game extends HTMLElement {
    constructor() {
        super();
        const names = 'Init Battle Finished'.split(' ');
        const shiftedNames = [...names];
        shiftedNames.push(shiftedNames.shift());
        const ons = shiftedNames.map(n=>()=>this.dispatchEvent(this._.events[n.toLowerCase()]));
        this._={
            events:names.map(n=>n.toLowerCase()).reduce((o,n)=>{o[n]=new CustomEvent(n); return o;},{}),
            scenes:names.reduce((o,n,i)=>{
                const cls = (new Function(`return ${n}SceneElement;`))();
                console.log(n, cls);
                o[n.toLowerCase()]=new cls(ons[i]);
                return o;
            },{}),
        };
        console.log(this._.scenes);
        this.append(...names.map(n=>this._.scenes[n.toLowerCase()]));
        this.addEventListener('init', (event) => {
            console.log('init');
            this._.scenes.finished.hide();
            this._.scenes.battle.hide();
            this._.scenes.init.show();
            // Startボタン押下待ち
            // 画面作成
        });
        //this.addEventListener('decision', (event) => {
        this.addEventListener('battle', (event) => {
            //console.log('decision');
            console.log('battle');
            this._.scenes.init.hide();
            this._.scenes.finished.hide();
            this._.scenes.battle.show();
            // ボタン押下されたら実行する
            // 計算処理
            // 死亡なら'finished'に遷移する
            // if (death) {this.dispatchEvent(this._.events.finished)}
        });
        this.addEventListener('finished', (event) => {
            console.log('finished');
            this._.scenes.battle.hide();
            this._.scenes.init.hide();
            this._.scenes.finished.show();
            // 結果表示
            // Restartボタン押下待ち
        });
        this.dispatchEvent(this._.events.init)
    }
}
customElements.define("rogue-lite-game", Game);
