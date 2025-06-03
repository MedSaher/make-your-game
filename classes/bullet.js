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
            if (!this.element) return;

            let top = parseFloat(this.element.style.top);
            top += 2; // Speed
            this.element.style.top = `${top}px`;

            // Check collision with any shield pixel
            const bulletRect = this.element.getBoundingClientRect();
            const shieldPixels = document.querySelectorAll(".shield-cell");

            for (let pixel of shieldPixels) {
                const pixelRect = pixel.getBoundingClientRect();

                const isColliding =
                    bulletRect.left < pixelRect.right &&
                    bulletRect.right > pixelRect.left &&
                    bulletRect.top < pixelRect.bottom &&
                    bulletRect.bottom > pixelRect.top;

                if (isColliding) {
                    const row = parseInt(pixel.dataset.row);
                    const col = parseInt(pixel.dataset.col);
                    const shieldElement = pixel.closest(".shield");  // Find the correct shield container

                    // Destroy only within this specific shield
                    this.destroyShieldPixelAndNeighbors(shieldElement, row, col);
                    this.element.remove(); // remove the bullet
                    return;
                }
            }

            // If bullet still on screen, continue
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

    destroyShieldPixelAndNeighbors(shieldElement, row, col) {
        const localPixels = shieldElement.querySelectorAll(".shield-cell");

        for (let pixel of localPixels) {
            const r = parseInt(pixel.dataset.row);
            const c = parseInt(pixel.dataset.col);

            // Destroy only this pixel and neighbors in the same shield
            if (Math.abs(r - row) <= 1 && Math.abs(c - col) <= 1) {
                pixel.classList.remove("shield-cell");
                pixel.classList.add("inactive"); // Optional CSS for visuals
            }
        }
    }



}
