import { Field } from "./field.js";
import { Invader } from "./invaders.js";

export class Invaders_container extends Field {
    add_invaders(element) {
        console.log(element)
        setTimeout(()=>{
            for (let i = 1; i <= 5; i++) {
                let section = document.createElement("div")
                section.classList.add("invaders_section")
                section.setAttribute("id", `section-${i}`)
                section.style.width = `${100}%`
                section.style.height = `${this.height/5}vmin`
                for (let j = 1; j <= 11; j++) {
                        let invader = new Invader((this.width/11), (this.height/5), `type`, section, null, null, this.type)
                        invader.create()
                }
                element.appendChild(section)
            }
        }, 200)
    }
}