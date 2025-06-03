import { Field } from "./field.js";

export class Bullet extends Field {
    constructor(width, height, tag_class, parent_element, background_color = null, image_path = null) {
        super(width, height, tag_class, parent_element, background_color, image_path);
    }

    drop(startTop, startLeft) {
        this.create(); // Use Field.create() to render the bullet
        this.element.style.position = "absolute";
        this.element.style.top = `${startTop}px`;
        this.element.style.left = `${startLeft}px`;

        // Animate the bullet downward
        this.move();
    }

    move() {
        const moveStep = () => {
            let top = parseFloat(this.element.style.top);
            top += 2; // Bullet speed (pixels per frame)
            this.element.style.top = `${top}px`;

            const container = document.querySelector(".battle_field");
            const containerHeight = container.clientHeight;

            if (top < containerHeight - 25) {
                requestAnimationFrame(moveStep);
            } else {
                this.element.remove(); // Remove bullet if out of screen
            }
        };

        requestAnimationFrame(moveStep);
    }
}
