import { get_position } from "../utils/utils.js";
import { Field } from "./field.js";

export class Hero extends Field {
  move_hero() {
    const step = 10; // pixels per arrow key press
    let position = 0; // track translateX offset

    document.addEventListener('keydown', (event) => {
      // Get bounding rectangles fresh on each key press:
      let fieldRect = this.parent_element.getBoundingClientRect();
      let heroRect = this.element.getBoundingClientRect();

      const heroWidth = heroRect.width;
      const fieldLeft = fieldRect.left;
      const fieldRight = fieldRect.right;

      if (event.key === 'ArrowRight') {
        // Check if moving right stays within the field's right boundary
        if (heroRect.right + step <= (fieldRight -10)) {
          position += step;
        }
      } else if (event.key === 'ArrowLeft') {
        // Check if moving left stays within the field's left boundary
        if (heroRect.left - step >= (fieldLeft+10)) {
          position -= step;
        }
      }

      // Apply movement by translateX
      this.element.style.transform = `translateX(${position}px)`;
    });
  }
}
