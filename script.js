import { Controller, themeMusic } from "./classes/controller.js"
document.addEventListener("DOMContentLoaded", () => {
    // instantiate the hero:
    let controller = new Controller()
    controller.run_game()
    controller.attach_pause_listener();
    
    document.getElementById("restart_btn").addEventListener("click", () => {
        location.reload(); // Or a custom reset logic
    });

    document.addEventListener("click", () => {
        themeMusic.play()
});
})