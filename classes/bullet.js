import { Field } from "./field.js";

var score = 0

export class Bullet extends Field {

    #last_call = 0

    // Invaders drop the bomb:
    drop(startTop, startLeft) {
        this.create(); // Use Field.create() to render the bullet
        this.element.style.position = "absolute";
        this.element.style.top = `${startTop}px`;
        this.element.style.left = `${startLeft}px`;

        // Animate the bullet downward
        this.InvaderpullsTrigger();
    }

    // Hero shoots upward:
    shootUp(startTop, startLeft) {
        const now = Date.now();

        if (now - this.#last_call >= 1000) {
            this.#last_call = now;
            this.create(); // Use Field.create() to render the bullet
            this.element.style.position = "absolute";
            this.element.style.top = `${startTop}px`;
            this.element.style.left = `${startLeft}px`;
            this.kill()
        }
    }

    InvaderpullsTrigger() {
        const moveStep = () => {
            if (!this.element) return;

            let top = parseFloat(this.element.style.top);
            top += 4; // Speed
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

            // Handle collision with hero:
            const heroElement = document.getElementsByClassName("hero_tag")[0]

            // get the hero position:
            if (heroElement) {
                var heroRect = heroElement.getBoundingClientRect();
            }

            if (heroElement) {
                const isCollidingWithHero = bulletRect.left < heroRect.right &&
                    bulletRect.right > heroRect.left &&
                    bulletRect.top < heroRect.bottom &&
                    bulletRect.bottom > heroRect.top;

                if (isCollidingWithHero) {
                    let lives = document.getElementById("lives_number")
                    let number = parseInt(lives.innerText)
                    console.log("lives: ", number)
                    console.log("lives: ", score)
                    number -= 1
                    lives.innerText = number
                    setTimeout(() => {
                        heroElement.remove() // remove the hero
                    }, 1000)
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

    HeroPullsTheTrigger() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                let heroElement = document.querySelectorAll(".hero_tag")[0];

                if (heroElement) {
                    const battlefield = document.querySelector(".battle_field");
                    const battlefieldRect = battlefield.getBoundingClientRect();
                    const heroRect = heroElement.getBoundingClientRect();

                    const top = heroRect.top - battlefieldRect.top;
                    const left = heroRect.left - battlefieldRect.left + (heroRect.width / 2);

                    console.log("the top is: ", top, "the left is: ", left);

                    // Now this.shootUp works because 'this' is your Bullet instance
                    this.shootUp(top, left)
                }
            }
        });
    }

    destroyShieldPixelAndNeighbors(shieldElement, row, col) {
        const localPixels = shieldElement.querySelectorAll(".shield-cell");

        for (let pixel of localPixels) {
            const r = parseInt(pixel.dataset.row)
            const c = parseInt(pixel.dataset.col)

            // Destroy only this pixel and neighbors in the same shield
            if (Math.abs(r - row) <= 1 && Math.abs(c - col) <= 1) {
                pixel.classList.remove("shield-cell")
                pixel.classList.add("inactive")
            }
        }
    }

    // Fixed hero bullet movement - moves upward
    kill() {
        const moveBullet = () => {
            if (!this.element) return;

            let top = parseFloat(this.element.style.top);
            let bot = parseFloat(this.element.style.bottom);
            console.log("top: ", top, "bottom: ", bot);

            top -= 10; // Move upward (decrease top value)
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

            // TODO: git rid of the section after it is empties of invaaders and git rid of the container also:

            // Check collision with invaders
            const invaderElements1 = document.querySelectorAll(".type1");
            const invaderElements2 = document.querySelectorAll(".type2");
            const allInvaders = [...invaderElements1, ...invaderElements2]; // Combine NodeLists into array

            for (let invader of allInvaders) {
                const invaderRect = invader.getBoundingClientRect();

                const isCollidingWithInvader =
                    bulletRect.left < invaderRect.right &&
                    bulletRect.right > invaderRect.left &&
                    bulletRect.top < invaderRect.bottom &&
                    bulletRect.bottom > invaderRect.top;

                if (isCollidingWithInvader) {

                    let score = document.getElementById("score_number")
                    let number = parseInt(score.innerText)
                    console.log("score: ", number)
                    console.log("score: ", score)
                    number += 10
                    score.innerText = number

                    invader.remove(); // Remove the invader
                    this.element.remove(); // Remove the bullet
                    return;
                }
            }

            // If bullet still on screen, continue
            const container = document.querySelector(".battle_field");
            const containerHeight = container.clientHeight;

            console.log("container height: ", containerHeight);


            // Continue animation if bullet is still on screen (moving upward)
            if (top >= 100) { // Stop when bullet goes off-screen at top
                requestAnimationFrame(moveBullet);
            } else {
                this.element.remove(); // Remove bullet if out of screen
            }
        };
        requestAnimationFrame(moveBullet);
    }
}