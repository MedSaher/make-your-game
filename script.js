import { Field } from "./classes/field.js";

let grand_parent = document.body

document.addEventListener("DOMContentLoaded", ()=>{
//Instantiate the field class:
let field = new Field(60, 60, "battle_field", grand_parent)
field.Create()
})