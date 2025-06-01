import { Field } from "./field.js";

export class Shield extends Field {
add_shields(){
    let parent_element = document.getElementsByClassName("shields")[0]
    for(let i=1; i <=3; i++){
        let shield = document.createElement("div")
        shield.classList.add("shield")
        parent_element.appendChild(shield)
    }
}
}