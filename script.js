import { Controller } from "./classes/controller.js"

document.addEventListener("DOMContentLoaded", () => {
    // instantiate the hero:
    let controller = new Controller()
    controller.run_game()

})