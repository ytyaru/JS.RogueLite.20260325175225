import { Game } from './game.js';
import { focusLooper } from './lib/utils/event/focus-looper.js';
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded!!');
    focusLooper.addBlacklist('.is-hidden');
    document.body.appendChild(new Game());
});
/*
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    document.body.appendChild(new Game());
//    FocusLooper.setup();
    FocusLooper.addBlacklist('.is-hidden');
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});
*/
/*
class Hero {
    #hp = 10; // Private field
    get hp() { return this.#hp; }
}
console.log(`Hero HP: ${new Hero().hp}`);
*/
