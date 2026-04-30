/**
 * BudouX Parser Exporter
 * 登録済みの Web Component から parse メソッドを抽出し、window.budoux として公開する。
 * [BudouX]:https://developers-jp.googleblog.com/2023/09/budoux-adobe.html
 */
(function() {
    const BudouXElement = customElements.get('budoux-ja');
    if (!BudouXElement) {
        return;
    }

    const instance = new BudouXElement();
    const internalParser = Object.values(instance).find(p => p && p.model);

    if (internalParser && typeof internalParser.parse === 'function') {
        window.budoux = {
            parse: (text) => internalParser.parse(text)
        };
    }
})();
