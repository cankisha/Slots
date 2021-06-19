export default class Element {
    constructor() {

    }
    appendImage(wrapId, imageUrl) {
        const wrap = document.getElementById(wrapId);
        const image = new Image();
        image.src = require(`../assets/${imageUrl}`).default;
        wrap.appendChild(image);
    }
}