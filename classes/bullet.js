import { Field } from "./field.js";
import { app_state } from "../utils/app_state.js"
// import { Controller } from "./controller.js";

export class InvadersBullet extends Field {
    #last_call;

    constructor(...args) {
        super(...args)
        this.animation_id = null;
        this.paused = false;
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
        shootSound.volume = 0.7; // Optional: adjust volume (0.0 to 1.0)
        shootSound.play().catch((e) => {
            console.warn("Failed to play sound:", e);
        });
        // Animate the bullet downward
        this.InvaderpullsTrigger();
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
                    app_state.alive = false
                    let lives = document.getElementById("lives_number")
                    let number = parseInt(lives.innerText)
                    number -= 1
                    lives.innerText = number
                    heroElement.style.backgroundImage = "url('/sprites/Invaders/space__0010_PlayerExplosion.png')";
                    setTimeout(() => {
                        heroElement.style.display = "none";
                    }, 500)

                    // Remove hero temporarily


                    // Remove the bullet
                    this.element.remove();


                    // If the player still has lives, bring hero back after delay
                    if (number > 0) {

                        setTimeout(() => {
                            // heroElement.style.left = "calc((100% - 8vmin) / 2)";
                            app_state.alive = true
                            heroElement.style.backgroundImage = "url('/sprites/Invaders/hero.png')";
                            heroElement.style.display = "block";
                        }, 1000); // Delay 1 second before respawn
                    } else {
                        this.handle_game_over()
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




    // attch the pause to the bullet so we dont keep throwing bullets when the pause is clicked:
    attach_pause_event_listener() {
        document.addEventListener("togglePause", (e) => {
            this.paused = e.detail.paused;

            if (this.paused) {
                // Optional: cancel RAF for immediate pause
                if (this.animation_id) {
                    cancelAnimationFrame(this.animation_id);
                    this.animation_id = null;
                }
            } else {
                // If bullet animation was paused, restart it if bullet element still exists
                if (this.element && !this.animation_id) {
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


//  Create a class to represent the hero bullet:
export class HeroBullet extends Field {
    #last_call;

    constructor(...args) {
        super(...args)
        this.animation_id = null;
        this.paused = false;
        this.#last_call = 0;
        // this.attach_pause_event_listener()
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
            shootSound.volume = 0.7; // Optional: adjust volume (0.0 to 1.0)
            shootSound.play().catch((e) => {
                console.warn("Failed to play sound:", e);
            });
            this.element.style.position = "absolute";
            this.element.style.top = `${startTop}px`;
            this.element.style.left = `${startLeft}px`;
            this.kill()
        }
    }


    // Fixed hero bullet movement - moves upward
    kill() {
        const moveBullet = () => {
            if (!this.element || !app_state.alive) return;

            if (app_state.game_paused) {
                this.animation_id = requestAnimationFrame(moveBullet)
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
                    let number = app_state.score += 10

                    score.innerText = number



                    invader.classList.remove("type1", "type2", "invader");
                    invader.style.backgroundImage = "url('/sprites/Invaders/space__0009_EnemyExplosion.png')";
                    invader.setAttribute("data-dead", "true");
                    setTimeout(() => {
                        invader.style.backgroundImage = "none";
                        invader.style.backgroundColor = "transparent";
                        invader.style.border = "none";
                    }, 500)
                    this.element.remove(); // Remove the bullet
                    if (app_state.score === 280) {
                        this.handle_game_over("You won!!!")
                    }
                    return;
                }
            }


            // Continue animation if bullet is still on screen (moving upward)
            if (top >= 100) { // Stop when bullet goes off-screen at top
                this.animation_id = requestAnimationFrame(moveBullet);
            } else {
                this.element.remove(); // Remove bullet if out of screen
            }
        };

        this.animation_id = requestAnimationFrame(moveBullet);
    }



    HeroPullsTheTrigger() {
        const throttledShoot = this.throttle((top, left) => {
            this.shootUp(top, left);
        }, 1000);

        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                let heroElement = document.querySelectorAll(".hero_tag")[0];

                if (heroElement) {
                    const battlefield = document.querySelector(".battle_field");
                    const battlefieldRect = battlefield.getBoundingClientRect();
                    const heroRect = heroElement.getBoundingClientRect();

                    const top = heroRect.top - battlefieldRect.top;
                    const left = heroRect.left - battlefieldRect.left + (heroRect.width / 2);

                    throttledShoot(top, left); // Use throttled version
                }
            }
        });
    }
    throttle(fn, delay) {
        let lastCall = 0;

        return function (...args) {
            const now = Date.now();

            if (now - lastCall >= delay) {
                lastCall = now;
                fn.apply(this, args);
            }
        };
    }



}
