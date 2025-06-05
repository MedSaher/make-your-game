import { Field } from "./field.js";

export class Invader extends Field {
    toggleType() {
        this.type = this.type === "type1" ? "type2" : "type1";
        // Update the DOM accordingly, e.g.:
        if (this.element) {
            this.element.classList.remove("type1", "type2");
            this.element.classList.add(this.type);
        }
    }
}