// computer-battler.js
class ComputerBattler extends Battler {
    constructor(life) { super('Enemy', life); }
    decide(hand) {
        // 自動札を除いた中からランダムに選択
        const choices = hand.filter(c => !c.isAuto);
        return choices[Math.floor(Math.random() * choices.length)];
    }
}
