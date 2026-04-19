class SceneElement extends HTMLElement {
    constructor() {super();this.classList.add('scene', 'is-hidden');}
    show() {this.classList.remove('is-hidden');}
    hide() {this.classList.add('is-hidden');}
}
customElements.define('scene-element', SceneElement);
