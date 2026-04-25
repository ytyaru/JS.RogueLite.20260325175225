class ComputerBattler extends Battler {
    constructor(life) { super('Enemy', life); }
    decideAction(availableCards) {
        const manualCards = availableCards.filter(c => !c.isAuto);
        return manualCards[Math.floor(Math.random() * manualCards.length)];
    }
}

