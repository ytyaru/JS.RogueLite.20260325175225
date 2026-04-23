class Type {
    get nil() { return this._nil }
    get NOT_EXIST() { return this._NOT_EXIST }
    get NOT_EXIST_FIELD() { return this._NOT_EXIST_FIELD }
    constructor() {
        this._nil = Symbol('nil')
        this._NOT_EXIST = Symbol('not-exist')
        this._NOT_EXIST_FIELD = Symbol('not-exist-field')
        this._types = {
            AsyncFunction: (async () => { }).constructor,
            GeneratorFunction: (function* () { yield undefined; }).constructor,
            AsyncGeneratorFunction: (async function* () { yield undefined; }).constructor,
        }
        this._typeName = new TypeName(this)
        this._names = new Map([
            ['Null', [[], (v) => null === v]],
            ['Undefined', [['Und'], (v) => undefined === v]],
            ['Defined', [['Def', 'Any'], (v) => undefined !== v && !Number.isNaN(v)]],
            ['NullOrUndefined', [['NU'], (v) => null === v || undefined === v]],
            ['NullOrUndefinedNaN', [['NUN'], (v) => null === v || undefined === v || Number.isNaN(v)]],
            ['Boolean', [['Bool', 'Bln', 'B'], (v) => 'boolean' === typeof v]],
            ['NaN', [[], (v) => Number.isNaN(v)]],
            ['Number', [['Num', 'N'], (v) => ('number' === typeof v && !isNaN(v)) || (this.#isObjectLike(v) && this.#getTag(v) == '[object Number]')]],
            ['Integer', [['Int', 'I'], (v) => this.isNumber(v) && 0 === v % 1]],
            ['PositiveInteger', [['PInt', 'PosInt'], (v) => this.isInteger(v) && 0 <= v]],
            ['NegativeInteger', [['NInt', 'NegInt'], (v) => this.isInteger(v) && v < 0]],
            ['BigInt', [['Big'], (v) => 'bigint' === typeof v]],
            ['Float', [['Flt', 'F'], (v) => this.isNumber(v) && (v % 1 !== 0 || 0 === v)]],
            ['String', [['Str', 'S'], (v) => 'string' === typeof v || v instanceof String]],
            ['Symbol', [['Sym'], (v) => 'symbol' === typeof v]],
            ['Primitive', [['Prim'], (v) => v !== Object(v)]],
            ['ValidPrimitive', [['VPrim', 'VP', 'Val', 'Value'], (v) => this.isNUN(v) ? false : this.isPrim(v)]],
            ['Reference', [['Ref'], (v) => !this.isNUN(v) && v === Object(v)]],
            ['Class', [['Cls'], (v) => (('function' === typeof v) && (!!v.toString().match(/^class /)))]],
            ['Instance', [['Ins'], (v, c) => {
                if (this.isPrimitive(v)) return false
                if (this.isFunction(v)) return false
                if (this.isCls(v)) return false
                if (this.isErrCls(v)) return false
                if (this.isObj(v)) return false
                if (this.isAry(v)) return false
                try { return ((undefined === c) ? true : (v instanceof c)); }
                catch (err) { console.warn(err); return false }
            }]],
            ['ErrorClass', [['ErrCls'], (v) => Error === v || Error.isPrototypeOf(v)]],
            ['ErrorInstance', [['ErrIns', 'Error', 'Err'], (v) => v instanceof Error]],
            ['Function', [['Func', 'Fn'], (v) => 'function' === typeof v && !v.toString().match(/^class /) && !this.isErrCls(v)]],
            ['SyncFunction', [['SyncFn', 'SFn'], (v) => this.isFn(v) && !this.isAFn(v) && !this.isGFn(v) && !this.isAGFn(v)]],
            ['AsyncFunction', [['AsyncFunc', 'AsyncFn', 'AFn'], (v) => v instanceof this._types.AsyncFunction]],
            ['GeneratorFunction', [['GenFn', 'GFn'], (v) => v instanceof this._types.GeneratorFunction || v instanceof this._types.AsyncGeneratorFunction]],
            ['SyncGeneratorFunction', [['SyncGenFn', 'SGFn'], (v) => v instanceof this._types.GeneratorFunction && !(v instanceof this._types.AsyncGeneratorFunction)]],
            ['AsyncGeneratorFunction', [['AsyncGenFn', 'AGFn'], (v) => v instanceof this._types.AsyncGeneratorFunction]],
            ['Promise', [[], (v) => v instanceof Promise]],
            ['Iterator', [['Iter', 'Itr', 'It'], (v) => {
                if (this.isNullOrUndefined(v)) { return false }
                return 'function' === typeof v[Symbol.iterator]
            }]],
            ['Empty', [[], (v, noErr) => {
                if (this.isItr(v)) {
                    if ('length,size'.split(',').some(n => v[n] === 0)) { return true }
                    return false
                } else { if (noErr) { return false } else { throw new TypeError(`Not iterator.`) } }
            }]],
            ['Blank', [[], (v) => this.isObj(v) ? 0 === Object.keys(v).length : (() => { throw new TypeError('Not Type.isObj(v).') })()]],
            ['NullOrUndefinedOrEmpty', [['NUE'], (v) => this.isNU(v) || this.isEmpty(v, true)]],
            ['Array', [['Ary', 'A'], (v) => Array.isArray(v)]],
            ['Map', [[], (v) => v instanceof Map]],
            ['Set', [[], (v) => v instanceof Set]],
            ['WeakMap', [[], (v) => v instanceof WeakMap]],
            ['WeakSet', [[], (v) => v instanceof WeakSet]],
            ['Object', [['Obj', 'O'], (v) => {
                if (this.isPrimitive(v)) { return false }
                const P = Object.getPrototypeOf(v)
                return null !== v && 'object' === typeof v && '[object Object]' === this.#getTag(v) && !(P && P.hasOwnProperty('constructor') && this.isCls(P.constructor));
            }]],
            ['Date', [['Dt', 'D'], (v) => this.isPrimitive(v) ? false : Boolean(v && v.getMonth && typeof v.getMonth === 'function' && this.#toString(v) === '[object Date]' && !isNaN(v))]],
            ['RegExp', [[], (v) => v instanceof RegExp]],
            ['URL', [[], (v) => v instanceof URL]],
            ['Element', [['Elm', 'El', 'E'], (v) => {
                try { return v instanceof HTMLElement; }
                catch (e) {
                    return (typeof v === 'object') &&
                        (v.nodeType === 1) && (typeof v.style === 'object') &&
                        (typeof v.ownerDocument === 'object');
                }
            }]],
        ])
        for (let [k, v] of this._names.entries()) {
            const fnName = `is${k}`
            const [abbrs, fn] = v
            this.#defineMain(fnName, fn)
            for (let name of abbrs) { this.#defineAbbr(`is${name}`, fn) }
            const fns = (args) => Array.isArray(args) && args.every(x => fn(x))
            this.#defineMain(`${fnName}s`, fns)
            for (let name of abbrs) { this.#defineAbbr(`is${name}s`, fns) }
        }
    }
    #isObjectLike(v) { return typeof v === 'object' && v !== null }
    #toString(v) { return Object.prototype.toString.call(v) }
    #getTag(v) { return (v == null) ? (v === undefined ? '[object Undefined]' : '[object Null]') : this.#toString(v) }
    #defineMain(name, getter) { Object.defineProperty(this, name, { value: (...args) => getter(...args), enumerable: true }) }
    #defineAbbr(name, getter) { Object.defineProperty(this, name, { value: (...args) => getter(...args), enumerable: true }) }
    isNUSome(...vs) { return vs.some(v => this.isNU(v)) }
    isNUEvery(...vs) { return vs.every(v => this.isNU(v)) }
    isRange(v, min, max) { return min <= v && v <= max }
    fnV(v) {
        if (this.isGFn(v) || this.isAFn(v)) { throw new TypeError(`ジェネレータ関数や非同期関数は受け付けません。`) }
        return this.isFn(v) ? v() : v
    }
    get name() { return this._typeName }
    getName(v) {
        if (undefined === v) { return 'Undefined' }
        if (null === v) { return 'Null' }
        if (this.isBool(v)) { return 'Boolean' }
        if (this.isInt(v)) { return 'Integer' }
        if (this.isFloat(v)) { return 'Float' }
        if (this.isBigInt(v)) { return 'BigInt' }
        if (this.isSym(v)) { return 'Symbol' }
        if (this.isErrCls(v)) { return `(ErrorClass ${v.name})` }
        if (this.isErrIns(v)) { return `(ErrorInstance ${v.constructor.name})` }
        if (this.isCls(v)) { return v.name ? `(Class ${v.name})` : `(NoNameClass)` }
        if (this.isIns(v)) { return v.constructor.name ? `(Instance ${v.constructor.name})` : `(NoNameClassInstance)` }
        if (this.isAFn(v) || this.isGFn(v) || this.isAGFn(v)) { return v.constructor.name }
        if (this.isObj(v)) { return 'Object' }
        const name = typeof v
        return name[0].toUpperCase() + name.slice(1)
    }
    toStr(x) {
        if (!this.isObj(x) && !this.isAry(x)) { x = { x: x } }
        return JSON.stringify(x, (k, v) => ifel(
            (this.isBool(v) || this.isInt(v) || this.isFloat(v)), v,
            this.isErrCls(v), () => v.constructor.name,
            this.isErrIns(v), () => `${v.name}(${v.message})`,
            this.isIns(v, Array), () => '[' + v.map(V => this.toStr(V)).join(',') + ']',
            this.isIns(v, Map), () => [...v.entries()].map(([K, V]) => `k:` + this.toStr(V)).join(','),
            this.isIns(v, Set), () => [...v.values()].map(V => this.toStr(V)),
            this.isFn(v), () => v.toString(),
            this.isCls(v), () => v.toString(),
            v))
    }
    eq(a, b) { return this.toStr(a) === this.toStr(b) }
    // ... (to, has, get 等のメソッドも同様に内部に保持)
}

class TypeName {
    constructor(type) { this.T = type }
    get(name) {
        const N = name.toLowerCase()
        for (let [k, v] of this.T._names) {
            const [abbr, fn] = v
            if (N === k.toLowerCase()) { return k }
            if (abbr.some(a => a.toLowerCase() === N)) { return k }
        }
    }
}

export const type = new Type();

export function ifel(...args) {
    const setNum = Math.floor(args.length / 2);
    for (let i = 0; i < setNum * 2; i += 2) {
        const cond = !!type.fnV(args[i])
        if (cond) { return type.fnV(args[i + 1]) }
    }
    if (setNum * 2 < args.length) { return type.fnV(args[setNum * 2]) }
}

export class Auguments {
    static of(args) { return new Auguments(args) }
    constructor(args) { this._args = args }
    match(...condFns) {
        const setNum = Math.floor(condFns.length / 2);
        for (let i = 0; i < setNum * 2; i += 2) {
            const metNms = this._getMethodNames(condFns[i], i)
            if (this._matchTypes(metNms)) { return condFns[i + 1](...this._args) }
        }
        if (setNum * 2 < condFns.length) { return condFns[setNum * 2](...this._args) }
        throw new TypeError(`どの引数パターンとも一致しませんでした。`)
    }
    _getMethodNames(condStr, i) {
        const metNms = []
        for (let name of condStr.split(',')) {
            const metNm = `is${name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase()}`
            metNms.push(metNm)
        }
        return metNms
    }
    _matchTypes(metNms) {
        if (this._args.length !== metNms.length) { return false }
        for (let i = 0; i < metNms.length; i++) {
            if (!type[metNms[i]](this._args[i])) { return false }
        }
        return true
    }
}
