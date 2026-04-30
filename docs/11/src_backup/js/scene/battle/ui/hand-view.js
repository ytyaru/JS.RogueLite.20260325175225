class HandView {
    static make(hand, onSelect) {
        const tags = Dom.tags;
        const handDiv = tags.div({class:'hand-container'}, 
            tags.div({class:'hand'}, 
                ...hand.map((card, i) => this._makeCardButton(card, i, onSelect))
            ),
            this._makeKeyHints() // キーボード・ゲームパッドのヒント
        );
        return handDiv;
    }

    static _makeCardButton(card, index, onSelect) {
        const tags = Dom.tags;
        const isAuto = card.isAuto;
        const btnProps = { class: 'card-button' };
        if (isAuto) {
            btnProps.disabled = 'disabled';
        } else {
            btnProps.listeners = { click: () => onSelect(card) };
        }

        return tags.button(btnProps, 
            tags.div({class:'card-name'}, card.name),
            tags.div({class:'card-desc'}, card.description)
        );
    }

    static _makeKeyHints() {
        const tags = Dom.tags;
        // キーボードとゲームパッドのヒントを表示
        return tags.div({class:'key-hints'}, 
            tags.div({class:'hint-row'}, tags.span('⌨'), tags.span('🄹'), tags.span('🄺'), tags.span('🄻')),
            tags.div({class:'hint-row'}, tags.span('🎮'), tags.span('⍇'), tags.span('⍐'), tags.span('⍈'))
        );
    }
}

