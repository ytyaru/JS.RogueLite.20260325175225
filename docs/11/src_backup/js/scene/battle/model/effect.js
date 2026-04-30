const Effects = {
    DAMAGE_TARGET: {
        text: (v) => `敵♥-${v}`,
        calculate: (ctx, v) => v, // バフ等があればここで計算
        apply: (ctx, v) => ctx.target.receiveDamage(v)
    },
    DAMAGE_ACTOR: {
        text: (v) => `自♥-${v}`,
        calculate: (ctx, v) => v,
        apply: (ctx, v) => ctx.actor.receiveDamage(v)
    },
    HEAL_ACTOR: {
        text: (v) => `自♥+${v}`,
        calculate: (ctx, v) => v,
        apply: (ctx, v) => ctx.actor.heal(v)
    }
};

