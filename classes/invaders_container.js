import { Field } from "./field.js";
import { Invader } from "./invaders.js";
import { InvadersBullet } from "./bullet.js";
import {app_state} from "../utils/app_state.js"

export class Invaders_container extends Field {
    constructor(...args) {
        super(...args);
        this.direction = 1; // 1 for right, -1 for left
        this.speed = 1; // speed in pixels per frame
        this.sections = [];
        this.currentType = "type1"; // Initial type
        this.lastToggleTime = 0;
        this.toggleInterval = 300;
        this.paused = false; // default state to false;
        this.animation_id = null;
        this.attach_pause_event_listener()
    }

    add_invaders(element) {
    this.sections = [];

    // Detect screen height to adjust spacing for small screens
    const isSmallScreen = window.innerHeight < 700;
    const spacingMultiplier = isSmallScreen ? 1.5 : 1.0; // more space if small

    for (let i = 1; i <= 4; i++) {
        let section = document.createElement("div");
        section.classList.add("invaders_section");
        section.setAttribute("id", `section-${i}`);
        section.style.position = "absolute";
        section.style.left = "0px";

        // Increase vertical spacing for small screens
        section.style.top = `${(i - 1) * (this.height / 5) * spacingMultiplier}vmin`;
        section.style.width = `100%`;
        section.style.height = `${this.height / 5}vmin`;

        for (let j = 1; j <= 7; j++) {
            let invader = new Invader(
                ((this.width / 7) * 10), 
                ((this.height / 4) * 8), 
                `type1`, section, null, null, this.type, "px", i, j
            );
            invader.create(i, j);
            
            this.invaders.push(invader);
            
        }

        element.appendChild(section);
        this.sections.push(section);
    }

    this.dropRandomBullet();
    setInterval(() => this.dropRandomBullet(), 5000);
    requestAnimationFrame(this.move_invaders.bind(this));
}


    // handle the invaders movements:
    move_invaders(timestamp) {
        if(this.paused){
            // return if the state is paused:
            return
        }
        const container = document.querySelector(".battle_field");
        const containerRect = container.getBoundingClientRect();

        let maxRight = -Infinity;
        let minLeft = Infinity;

        // Determine the furthest left/right positions
        this.sections.forEach(section => {
            const left = parseFloat(section.style.left || "0");
            const sectionRect = section.getBoundingClientRect();
            const offset = sectionRect.left - containerRect.left;
            maxRight = Math.max(maxRight, offset + sectionRect.width);
            minLeft = Math.min(minLeft, offset);
            return
        });

        // Reverse direction if a border is hit
        if (maxRight >= containerRect.width || minLeft <= 0) {
            this.direction *= -1;
        }

        // Apply movement
        this.sections.forEach(section => {
            let currentLeft = parseFloat(section.style.left || "0");
            section.style.left = `${currentLeft + this.direction * this.speed}px`;
        });
        // 🔄 Toggle animation every 300ms
        if (timestamp - this.lastToggleTime > this.toggleInterval) {
            this.invaders.forEach(invader => invader.toggleType());
            this.lastToggleTime = timestamp;
        }
        this.animation_id = requestAnimationFrame(this.move_invaders.bind(this));
    }
    dropRandomBullet() {
    if (this.invaders.length === 0) return;

    const aliveInvaders = this.invaders.filter(inv => inv.element && inv.element.parentElement);
    if (aliveInvaders.length === 0) return;
        
    const randomInvader = aliveInvaders[Math.floor(Math.random() * aliveInvaders.length)];

    const invaderRect = randomInvader.element.getBoundingClientRect();
    const battlefield = document.querySelector(".battle_field");
    const battlefieldRect = battlefield.getBoundingClientRect();

    // Compute relative position inside .battle_field
    const top = invaderRect.top - battlefieldRect.top + invaderRect.height;
    const left = invaderRect.left - battlefieldRect.left + (invaderRect.width / 2);

    // Create bullet and drop it
    const bullet = new InvadersBullet(1, 2, "invader_bullet", battlefield, null, "sprites/Projectiles/ProjectileC_1.png");
    bullet.drop(top, left);
}

// attach the pause event listener:
attach_pause_event_listener() {
    document.addEventListener("togglePause", (e) => {
        this.paused = e.detail.paused;

        if (this.paused) {
            app_state.game_paused = true
            // Stop the animation immediately
            if (this.animation_id) {
                cancelAnimationFrame(this.animation_id);
                this.animation_id = null;
            }
        } else {
              app_state.game_paused = false
            // Resume
            this.animation_id = requestAnimationFrame(this.move_invaders.bind(this));
        }
    });
}
}