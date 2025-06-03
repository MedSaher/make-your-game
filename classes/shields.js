import { Field } from "./field.js";

export class Shield extends Field {
  constructor(...args) {
    super(...args);
    this.pixelMatrix = []; // Optionally store structure if needed
  }

  add_shields() {
    const parent_element = document.getElementsByClassName("shields")[0];

    for (let i = 1; i <= 4; i++) {
      const shield = document.createElement("div");
      shield.classList.add("shield");
      shield.setAttribute("id", `shield-${i}`);

      // Create 32 x 44 grid cells
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 12; col++) {
          const pixel = document.createElement("div");
          pixel.classList.add("shield-cell");

          pixel.dataset.row = row;
          pixel.dataset.col = col;
          shield.appendChild(pixel);
        }
      }

      parent_element.appendChild(shield);
    }
  }
}
