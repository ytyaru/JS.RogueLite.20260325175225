class StatusView {
    static make(hero, enemy, turn) {
        const tags = Dom.tags;
        const renderHp = (b) => tags.div(
            tags.h3(b.name),
            tags.p(`♥ ${b.life} / ♡ ${b.maxLife}`)
        );
        return tags.div({class:'status'}, 
            tags.h2(`Turn: ${turn}`),
            tags.div({style:'display:flex; gap:40px; justify-content:center;'},
                renderHp(hero), renderHp(enemy)
            )
        );
    }
}
