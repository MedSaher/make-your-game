import { Field } from "./field.js";
import { Invader } from "./invaders.js";
import { Bullet } from "./bullet.js";

export class Invaders_container extends Field {
    constructor(...args) {
        super(...args);
        this.direction = 1; // 1 for right, -1 for left
        this.speed = 1; // speed in pixels per frame
        this.sections = [];
        this.invaders = []; // Store invader objects
        this.currentType = "type1"; // Initial type
        this.lastToggleTime = 0;
        this.toggleInterval = 300;
    }

    add_invaders(element) {
        this.sections = []; // Reset before adding

        for (let i = 1; i <= 4; i++) {
            let section = document.createElement("div");
            section.classList.add("invaders_section");
            section.setAttribute("id", `section-${i}`);
            section.style.position = "absolute"; // Important for movement
            section.style.left = "0px";
            section.style.top = `${(i - 1) * (this.height / 5)}vmin`;
            section.style.width = `100%`;
            section.style.height = `${this.height / 5}vmin`;

            for (let j = 1; j <= 7; j++) {
                let invader = new Invader(((this.width/7) * 10), ((this.height / 4) * 8), `type1`, section, null, null, this.type, "px");
                invader.create();
                this.invaders.push(invader);
            }

            element.appendChild(section);
            this.sections.push(section);
        }
        this.dropRandomBullet();
        setInterval(() => this.dropRandomBullet(), 5000);
        requestAnimationFrame(this.move_invaders.bind(this));
    }
    move_invaders(timestamp) {
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
        requestAnimationFrame(this.move_invaders.bind(this));
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
    const bullet = new Bullet(1, 2, "invader_bullet", battlefield, null, "sprites/Projectiles/ProjectileC_1.png");
    bullet.drop(top, left);
}






}