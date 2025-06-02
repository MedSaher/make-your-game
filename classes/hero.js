import { get_position } from "../utils/utils.js";
import { Field } from "./field.js";

export class Hero extends Field {
  move_hero() {
    const step = 5; // pixels per arrow key press
    let position = 0; // track translateX offset
    let keys = new Set();

    const move = () => {
      // Get bounding rectangles fresh on each animation frame:
      const fieldRect = get_position(this.parent_element);
      const heroRect = get_position(this.element);

      const fieldLeft = fieldRect.left;
      const fieldRight = fieldRect.right;

      if (keys.has('ArrowRight')) {
        if (heroRect.right + step <= (fieldRight - 10)) {
          position += step;
        }
      } else if (keys.has('ArrowLeft')) {
        if (heroRect.left - step >= (fieldLeft + 10)) {
          position -= step;
        }
      }

      // Apply movement
      this.element.style.transform = `translateX(${position}px)`;

      // Loop animation
      requestAnimationFrame(move);
    };

    document.addEventListener('keydown', (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        keys.add(event.key);
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        keys.delete(event.key);
      }
    });

    // Start the animation loop
    requestAnimationFrame(move);
  }
}
