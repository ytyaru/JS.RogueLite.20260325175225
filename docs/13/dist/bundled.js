// src/main.js
class Hero {
  #hp = 10;
  get hp() {
    return this.#hp;
  }
}
console.log(`Hero HP: ${new Hero().hp}`);
