import Reel from "./Reel.js";
import Symbol from "./Symbol.js";
import Element from "./Element";

export default class Slot {
  constructor(domElement, config = {}) {
    Symbol.preload();

    this.currentSymbols = [
      ["1", "1", "1"],
      ["1", "1", "1"],
      ["1", "1", "1"],
      ["1", "1", "1"],
      ["1", "1", "1"],
    ];

    this.nextSymbols = [
      ["1", "1", "1"],
      ["1", "1", "1"],
      ["1", "1", "1"],
      ["1", "1", "1"],
      ["1", "1", "1"],
    ];

    const language = new Element();
    language.appendImage("language","en.png");

    const startnewgame = new Element();
    startnewgame.appendImage("startnewgame","startgamebar.png");

    const sound = new Element();
    sound.appendImage("sound","sound.png")

    const selectgame = new Element();
    selectgame.appendImage("selectgame","selectgame.png");

    const help = new Element();
    help.appendImage("help","help.png");

    const cash = new Element();
    cash.appendImage("cash","cash.png");

    const win = new Element();
    win.appendImage("win","win.png");

    const totalbet = new Element();
    totalbet.appendImage("totalbet","totalbet.png");

    const denom = new Element();
    denom.appendImage("denom","denom.png");

    const start = new Element();
    start.appendImage("start","start.png");


    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
        new Reel(reelContainer, idx, this.currentSymbols[idx])
    );

    this.spinButton = document.getElementById("start");
    this.spinButton.addEventListener("click", () => this.spin());

    //this.spinButton = document.getElementById("spin");
    //this.spinButton.addEventListener("click", () => this.spin());

    this.autoPlayCheckbox = document.getElementById("autoplay");

    if (config.inverted) {
      this.container.classList.add("inverted");
    }
  }

  spin() {
    this.onSpinStart();

    this.currentSymbols = this.nextSymbols;
    this.nextSymbols = [
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
    ];

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      })
    ).then(() => this.onSpinEnd());
  }

  onSpinStart() {
    this.spinButton.disabled = true;
   

    console.log("SPIN START");
  }

  onSpinEnd() {
    this.spinButton.disabled = false;


    console.log("SPIN END");

    if (this.autoPlayCheckbox.checked)
      return window.setTimeout(() => this.spin(), 200);
  }
}
