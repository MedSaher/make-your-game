import { Field } from "./field.js";
import { InvadersBullet } from "./bullet.js";

export class Invader extends Field {
    toggleType() {
        
        this.type = this.type === "type1" ? "type2" : "type1";
        // Update the DOM accordingly, e.g.:
        if (this.element && !this.element.getAttribute("data-dead")) {
            this.element.classList.remove("type1", "type2");
            this.element.classList.add(this.type);
        }
    }
    pullTheTrigger(){
        const bullet = new InvadersBullet(1.2, 2.5, "invader_bullet", battlefield, null, "sprites/Projectiles/ProjectileC_4.png");
    }
}