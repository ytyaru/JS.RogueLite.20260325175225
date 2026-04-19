class InputManager {
    constructor(onAction) {
        this.onAction = onAction;
        this.enabled = false;
        this.currentHand = [];
        window.addEventListener('keydown', (e) => {
            if (!this.enabled || e.repeat) return; // 押しっぱなしを無視

            const keyMap = { 'j': 0, 'k': 1, 'l': 2 };
            const index = keyMap[e.key.toLowerCase()];
            if (index !== undefined && this.currentHand[index]) {
                const card = this.currentHand[index];
                if (!card.isAuto) this.onAction(card);
            }
        });
    }
    updateHand(hand) { this.currentHand = hand; }
}

