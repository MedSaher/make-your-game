import { Field } from "./field.js";
import { app_state } from "../utils/app_state.js"
// import { Controller } from "./controller.js";

export class Bullet extends Field {
    #last_call;

    constructor(...args) {
        super(...args)
        this.bullet_animation_id = null;
        this.bullet_paused = false;
        this.hero_animation_id = null;
        this.#last_call = 0;
        this.attach_pause_event_listener()
    }



    // Invaders drop the bomb:
    drop(startTop, startLeft) {
        if (app_state.game_paused) {
            return
        }
        this.create(); // Use Field.create() to render the bullet
        this.element.style.position = "absolute";
        this.element.style.top = `${startTop}px`;
        this.element.style.left = `${startLeft}px`;

        const shootSound = new Audio("sounds/shoot2.wav");
        shootSound.volume = 0.0; // Optional: adjust volume (0.0 to 1.0)
        shootSound.play().catch((e) => {
            console.warn("Failed to play sound:", e);
        });

        // Animate the bullet downward
        this.InvaderpullsTrigger();
    }

    // Hero shoots upward:
    shootUp(startTop, startLeft) {
        if (app_state.game_paused) {
            return
        }
        const now = Date.now();

        const stuckBullets = document.querySelectorAll(".hero_bullet")
        // remove stuck bullets from battle ground 
        stuckBullets.forEach((bullet) => {
            bullet.remove();
        })
        if (now - this.#last_call >= 1000) {
            this.#last_call = now;
            this.create(); // Use Field.create() to render the bullet
            const shootSound = new Audio("sounds/shoot.wav");
            shootSound.volume = 0.0; // Optional: adjust volume (0.0 to 1.0)
            shootSound.play().catch((e) => {
                console.warn("Failed to play sound:", e);
            });
            this.element.style.position = "absolute";
            this.element.style.top = `${startTop}px`;
            this.element.style.left = `${startLeft}px`;
            this.kill()
        }
    }

    InvaderpullsTrigger() {

        const moveStep = () => {
            if (!this.element) return;

            if (this.paused) {
                this.bullet_animation_id = requestAnimationFrame(moveStep)
                return
            }

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
                    number -= 1
                    lives.innerText = number

                    // Remove hero temporarily
                    heroElement.style.display = "none";

                    // Remove the bullet
                    this.element.remove();

                    // If the player still has lives, bring hero back after delay
                    if (number > 0) {
                        setTimeout(() => {
                            // heroElement.style.left = "calc((100% - 8vmin) / 2)";
                            heroElement.style.display = "block";
                        }, 2000); // Delay 1 second before respawn
                    } else {
                        // Game Over logic (optional)
                        console.log("Game Over");
                    }
                }
            }

            // If bullet still on screen, continue
            const container = document.querySelector(".battle_field");
            const containerHeight = container.clientHeight;
            if (top < containerHeight - 25) {
                this.bullet_animation_id = requestAnimationFrame(moveStep);
            } else {
                this.element.remove(); // Remove bullet if out of screen
            }
        };

        this.bullet_animation_id = requestAnimationFrame(moveStep);
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

                    // Now this.shootUp works because 'this' is your Bullet instance
                    this.shootUp(top, left)
                }
            }
        });
    }

    destroyShieldPixelAndNeighbors(shieldElement, row, col) {
        const localPixels = shieldElement.querySelectorAll(".shield-cell");

        const shootSound = new Audio("sounds/shipexplosion.wav");
        shootSound.volume = 0.0; // Optional: adjust volume (0.0 to 1.0)
        shootSound.play().catch((e) => {
            console.warn("Failed to play sound:", e);
        });

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

            if (app_state.game_paused) {
                this.hero_animation_id = requestAnimationFrame(moveBullet)
                return
            }

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
                    number += 10
                    score.innerText = number

                    invader.classList.remove("type1", "type2", "invader");
                    invader.style.backgroundImage = "none";
                    invader.style.backgroundColor = "transparent"; // or a hit effect
                    invader.style.border = "none";
                    invader.setAttribute("data-dead", "true");
                    this.element.remove(); // Remove the bullet
                    return;
                }
            }

            // If bullet still on screen, continue
            const container = document.querySelector(".battle_field");
            const containerHeight = container.clientHeight;


            // Continue animation if bullet is still on screen (moving upward)
            if (top >= 100) { // Stop when bullet goes off-screen at top
                this.hero_animation_id = requestAnimationFrame(moveBullet);
            } else {
                this.element.remove(); // Remove bullet if out of screen
            }
        };

        this.hero_animation_id = requestAnimationFrame(moveBullet);
    }

    // attch the pause to the bullet so we dont keep throwing bullets when the pause is clicked:
    attach_pause_event_listener() {
        document.addEventListener("togglePause", (e) => {
            this.paused = e.detail.paused;

            if (this.paused) {
                // Optional: cancel RAF for immediate pause
                if (this.bullet_animation_id) {
                    cancelAnimationFrame(this.bullet_animation_id);
                    this.bullet_animation_id = null;
                }
            } else {
                // If bullet animation was paused, restart it if bullet element still exists
                if (this.element && !this.bullet_animation_id) {
                    // Choose which animation to resume depending on bullet type (you may want to track)
                    // For simplicity, just restart Invader bullet animation:
                    if (!app_state.game_paused) {
                        this.InvaderpullsTrigger();
                    }
                }
            }
        });
    }

}