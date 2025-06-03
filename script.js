import { Field } from "./classes/field.js";
import { Hero } from "./classes/hero.js";
import { Invaders_container } from "./classes/invaders_container.js";
import { Shield } from "./classes/shields.js";
// Declare global variables:
var main_color = `#000000`



let grand_parent = document.body

document.addEventListener("DOMContentLoaded", () => {
    //Instantiate the field class:
    let field = new Field(60, 80, "battle_field", grand_parent, main_color)
    field.create()
    field.create_score_displayer()
    let field_tag = document.getElementsByClassName("battle_field")[0]
    let space_invaders = new Invaders_container(40, 22, "invaders_container", field_tag)
    space_invaders.create()
    let invaders_container = document.getElementsByClassName("invaders_container")[0]
    space_invaders.add_invaders(invaders_container)

    // Instantiate the hero:
    let hero = new Hero(5, 3, "hero_tag", field_tag)
    hero.create()
    hero.move_hero()

    // Instantiate the shields:
    let shields = new Shield(60, 4, "shields", field_tag)
    shields.create()
    shields.add_shields()
})