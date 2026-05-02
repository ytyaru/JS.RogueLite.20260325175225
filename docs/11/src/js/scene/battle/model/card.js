(function() {
    /**
     * 戦闘の文脈（Context）
     */
    class BattleContext {
        constructor(actor, target, card) {
            this.actor = actor;
            this.target = target;
            this.card = card;
        }
    }

    /**
     * 1. 発動条件 (Trigger)
     */
    class Trigger {
        get isAuto() { return false; }
        get canSelect() { return true; }
    }
    class NormalTrigger extends Trigger {}
    class AutoTrigger extends Trigger {
        get isAuto() { return true; }
        get canSelect() { return false; }
    }

    /**
     * 2. 特性 (Trait)
     */
    class Trait {
        /**
         * 名前を修飾する接尾辞（+1 など）
         * 状態を表示する必要がある特性のみ、これをオーバーライドする。
         */
        get nameSuffix() { return ""; }

        execute(context) {}
    }

    class ComboTrait extends Trait {
        #max;
        #count = 0;
        constructor(max = 2) {
            super();
            this.#max = max;
        }
        get count() { return this.#count; }
        
        // 状態を名前に反映させるゴミ
        get nameSuffix() {
            return this.#count > 0 ? `+${this.#count}` : "";
        }
        
        execute(context) {
            if (context.actor.lastCardId === context.card.id) {
                this.#count = Math.min(this.#max, this.#count + 1);
            } else {
                this.#count = 0;
            }
        }
    }

    /**
     * 3. 実行処理 (Action)
     */
    class Action {
        execute(context, operations, traits) {
            operations.forEach(op => op.apply(context));
        }
    }
    class NormalAction extends Action {
        execute(context, operations, traits) {
            traits.forEach(t => t.execute(context));
            super.execute(context, operations, traits);
            context.actor.lastCardId = context.card.id;
        }
    }
    class AutoAction extends Action {}

    /**
     * 4. 状態操作 (StatusOperation)
     */
    class StatusOperation {
        #targetKey; #attrName; #valueOrFn;
        constructor(targetKey, attrName, valueOrFn) {
            this.#targetKey = targetKey;
            this.#attrName = attrName;
            this.#valueOrFn = valueOrFn;
        }
        apply(context) {
            const t = (this.#targetKey === 'actor') ? context.actor : context.target;
            const v = (typeof this.#valueOrFn === 'function') 
                ? this.#valueOrFn(context) 
                : this.#valueOrFn;
            t[this.#attrName] += v;
        }
        static makeAll(...args) {
            return args.map(arg => new StatusOperation(...arg));
        }
    }

    /**
     * 5. 札 (Card)
     */
    class Card {
        #id; #baseName; #description; #operations; #traits; #trigger; #action;
        constructor(id, name, description, operations, traits, trigger, action) {
            this.#id = id;
            this.#baseName = name; // 基底名を保持するゴミ
            this.#description = description;
            this.#operations = operations;
            this.#traits = traits;
            this.#trigger = trigger;
            this.#action = action;
        }
        get id() { return this.#id; }
        
        /**
         * 動的な名前の生成
         * 基底名に全特性の接尾辞を連結するゴミ。
         */
        get name() {
            const suffixes = this.#traits.map(t => t.nameSuffix).join('');
            return this.#baseName + suffixes;
        }

        get description() { return this.#description; }
        get isAuto() { return this.#trigger.isAuto; }
        get canSelect() { return this.#trigger.canSelect; }

        getTrait(cls) {
            if (cls) {
                return this.#traits.find(t => t instanceof cls);
            }
            if (this.#traits.length !== 1) {
                throw new Error(`getTrait() without arguments requires exactly 1 trait.`);
            }
            return this.#traits[0];
        }

        execute(actor, target) {
            const context = new BattleContext(actor, target, this);
            this.#action.execute(context, this.#operations, this.#traits);
        }

        static makeAll(dataList) {
            return dataList.map((d, index) => {
                const trigger = d.trigger || new NormalTrigger();
                const action = d.action || (trigger instanceof AutoTrigger ? new AutoAction() : new NormalAction());
                return new Card(
                    index, d.name, d.desc,
                    d.operations || [],
                    d.traits || [],
                    trigger,
                    action
                );
            });
        }
    }

    const CARD_DATA = [
        {
            name: '斬る',
            desc: '相手の生命点と身体点を1減らす。もしこの札を続けて選択したなら、身体点の減少量を1増やす(最大2)。さもなくば、減少量を0に戻す。',
            operations: StatusOperation.makeAll(
                ['target', 'life', -1],
                ['target', 'body', (ctx) => -(1 + ctx.card.getTrait().count)]
            ),
            traits: [new ComboTrait(2)]
        },
        {
            name: '突貫',
            desc: '相手の生命点を3減らす。自分の生命点を1減らす。',
            operations: StatusOperation.makeAll(
                ['target', 'life', -3],
                ['actor', 'life', -1]
            )
        },
        {
            name: '薬',
            desc: '自分の生命点を3増やす。',
            operations: StatusOperation.makeAll(['actor', 'life', 3])
        },
        {
            name: '自然治癒',
            desc: '自分の生命点を1増やす。この札は選択できず自動発動する。',
            operations: StatusOperation.makeAll(['actor', 'life', 1]),
            trigger: new AutoTrigger()
        }
    ];

    window.CardFactory = {
        createAll() {
            return Card.makeAll(CARD_DATA);
        }
    };
})();
