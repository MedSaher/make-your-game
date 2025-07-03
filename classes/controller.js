import { HeroBullet } from "./bullet.js";
import { Field } from "./field.js";
import { Hero } from "./hero.js";
import { Invaders_container } from "./invaders_container.js";
import { Shield } from "./shields.js";

export class Controller extends Field {

    constructor(...args) {
        super(...args)
        this.main_color = `#000000`
        this.parent_element = document.body
        this.paused = false;
    }

    run_game() {
        //Instantiate the field class:
        let field = new Field(60, 80, "battle_field", this.parent_element, this.maincolor)
        field.create()
        field.create_score_displayer()
        let field_tag = document.getElementsByClassName("battle_field")[0]
        let space_invaders = new Invaders_container(40, 22, "invaders_container", field_tag)
        // space_invaders.start_invaders_movement()
        space_invaders.create()
        let invaders_container = document.getElementsByClassName("invaders_container")[0]
        space_invaders.add_invaders(invaders_container)

        // Instantiate the hero:
        let hero = new Hero(5, 3, "hero_tag", field_tag)
        hero.create()
        hero.move_hero()
        const bullet = new HeroBullet(1, 2, "hero_bullet", field_tag, null, "sprites/Projectiles/missile_1.png");
        bullet.HeroPullsTheTrigger()
        // Instantiate the shields:
        let shields = new Shield(60, 4, "shields", field_tag)
        shields.create()
        shields.add_shields()
    }

    attach_pause_listener() {
        const pause_btn = document.getElementById("pause_btn");
        const time_display = document.getElementById("time_display");
        if (!pause_btn) return;

        pause_btn.addEventListener("click", () => {
            this.paused = !this.paused;

            // Toggle icon
            pause_btn.innerHTML = this.paused
                ? `<i class="fas fa-play"></i>`
                : `<i class="fas fa-pause"></i>`;

            // Inform all moving parts
            document.dispatchEvent(new CustomEvent("togglePause", { detail: { paused: this.paused } }));
        });
        let min = 0
        let secs = 0
        setInterval(() => {
            if (!this.paused) {
                secs++;
                if (secs === 60) {
                    secs = 0;
                    min++;
                }
                // Format with leading zeros
                const formattedMin = min.toString().padStart(2, '0');
                const formattedSecs = secs.toString().padStart(2, '0');
                time_display.textContent = `${formattedMin}:${formattedSecs}`;
                if (secs == 5){
                    this.handle_game_over("Time's up!")
                }
            }
        }, 1000)
    }

}

export const themeMusic = new Audio("sounds/spaceinvaders1.mpeg");
themeMusic.loop = true;
themeMusic.volume = 0.0; // Adjust as needed
