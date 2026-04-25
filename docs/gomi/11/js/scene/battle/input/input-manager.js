class InputManager {
    constructor(onAction) {
        this.onAction = onAction;
        this.enabled = false;
        window.addEventListener('keyup', (e) => {
            if (!this.enabled) return;
            const keyMap = { 'j': 0, 'k': 1, 'l': 2 };
            const index = keyMap[e.key.toLowerCase()];
            if (index !== undefined) this.onAction(index);
        });
    }
}
