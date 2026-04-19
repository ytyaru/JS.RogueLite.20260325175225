class StatusView {
    static make(hero, enemy, turn) {
        const tags = Dom.tags;
        return tags.div({class:'status'}, 
            tags.h2(`Turn: ${turn}`),
            tags.div({style:'display:flex; gap:20px; justify-content:center;'},
                tags.div(tags.h3('Hero'), tags.p(`♥ ${hero.life} / ${hero.maxLife}`)),
                tags.div(tags.h3('Enemy'), tags.p(`♥ ${enemy.life} / ${enemy.maxLife}`))
            )
        );
    }
}

