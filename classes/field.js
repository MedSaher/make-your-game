export class Field {
    // new Field(60, 80, "battle_field", grand_parent, main_color)
    constructor(width, height, tag_class, parent_element, background_color = null, image_path = null, type = null, unit = "vmin") {
        this.width = width
        this.height = height
        this.tag_class = tag_class
        this.parent_element = parent_element
        this.background_color = background_color
        this.image_path = image_path
        this.type = type
        this.unit = unit
        this.element = null
    }

    // Create the html representation:
    create() {
        let container = document.createElement("div")
        container.classList.add(this.tag_class)
        container.style.width = `${this.width}${this.unit}`
        container.style.height = `${this.height}${this.unit}`
        container.style.willChange = "transform";
        if (this.background_color) {
            container.style.backgroundColor = this.background_color
        }
        if (this.image_path) {
            container.style.backgroundImage = `url(${this.image_path})`
        }
        if (this.type) {
            console.log(type)
        }
        this.parent_element.appendChild(container)
        this.element = container
    }

    create_score_displayer() {
        let advancement = document.createElement("div");
        advancement.setAttribute("id", "game_advancement");
        advancement.style.height = `110px`;
        advancement.style.display = "flex";
        advancement.style.justifyContent = "space-between";
        advancement.style.alignItems = "center";
        advancement.style.padding = "0 2vmin";
        advancement.style.backgroundColor = "#111";
        advancement.style.color = "#fff";
        advancement.style.borderBottom = "2px solid #444";
        advancement.style.fontFamily = "'Orbitron', sans-serif";
        advancement.style.fontSize = "1.5vmin";

        // Score container
        let score_container = document.createElement("div");
        score_container.setAttribute("id", "score_container");
        score_container.style.display = "flex";
        score_container.style.alignItems = "center";
        score_container.style.gap = "0.5vmin";

        let score_icon = document.createElement("i");
        score_icon.className = "fas fa-star"; // Font Awesome star icon
        score_icon.style.color = "#fbc531";

        let score = document.createElement("p");
        score.innerText = "Score: ";
        score.style.margin = "0";

        let score_number = document.createElement("span");
        score_number.setAttribute("id", "score_number");
        score_number.innerText = "0";

        score_container.append(score_icon, score, score_number);

        // Time container
        let time_container = document.createElement("div");
        time_container.setAttribute("id", "time_container");
        time_container.style.display = "flex";
        time_container.style.alignItems = "center";
        time_container.style.gap = "0.5vmin";

        let time_icon = document.createElement("i");
        time_icon.className = "fas fa-clock"; // Font Awesome clock
        time_icon.style.color = "#3498db";

        let time_label = document.createElement("p");
        time_label.innerText = "Time: ";
        time_label.style.margin = "0";

        let time_display = document.createElement("span");
        time_display.setAttribute("id", "time_display");
        time_display.innerText = "00:00";

        time_container.append(time_icon, time_label, time_display);


        // Attempts container
        let attempts = document.createElement("div");
        attempts.setAttribute("id", "attempts_container");
        attempts.style.display = "flex";
        attempts.style.alignItems = "center";
        attempts.style.gap = "0.5vmin";

        let lives_icon = document.createElement("i");
        lives_icon.className = "fas fa-heart"; // Font Awesome heart
        lives_icon.style.color = "#e74c3c";

        let lives = document.createElement("p");
        lives.innerText = "Lives: ";
        lives.style.margin = "0";

        let lives_number = document.createElement("span");
        lives_number.setAttribute("id", "lives_number");
        lives_number.innerText = "3";

        attempts.append(lives_icon, lives, lives_number);

        // Control buttons container
        let controls_container = document.createElement("div");
        controls_container.style.display = "flex";
        controls_container.style.gap = "1vmin";

        let pause_btn = document.createElement("button");
        pause_btn.setAttribute("id", "pause_btn");
        pause_btn.innerHTML = `<i class="fas fa-pause"></i>`;
        pause_btn.title = "Pause";
        pause_btn.style.padding = "0.5vmin";
        pause_btn.style.fontSize = "1.5vmin";
        pause_btn.style.cursor = "pointer";
        pause_btn.style.borderRadius = "0.5vmin";
        pause_btn.style.border = "none";
        pause_btn.style.backgroundColor = "#2c3e50";
        pause_btn.style.color = "#fff";

        let restart_btn = document.createElement("button");
        restart_btn.setAttribute("id", "restart_btn");
        restart_btn.innerHTML = `<i class="fas fa-rotate-right"></i>`;
        restart_btn.title = "Restart";
        restart_btn.style.padding = "0.5vmin";
        restart_btn.style.fontSize = "1.5vmin";
        restart_btn.style.cursor = "pointer";
        restart_btn.style.borderRadius = "0.5vmin";
        restart_btn.style.border = "none";
        restart_btn.style.backgroundColor = "#2c3e50";
        restart_btn.style.color = "#fff";

        controls_container.append(pause_btn, restart_btn);

        // Append all to advancement container
        advancement.append(score_container, time_container, attempts, controls_container);



        // Insert into DOM
        this.element.insertBefore(advancement, this.element.firstChild);
    }


    // desptroy the elements of the shield when the colision happens:
    destroyShieldPixelAndNeighbors(shieldElement, row, col) {
        const localPixels = shieldElement.querySelectorAll(".shield-cell");

        const shootSound = new Audio("sounds/shipexplosion.wav");
        shootSound.volume = 0.7; // Optional: adjust volume (0.0 to 1.0)
        shootSound.play().catch((e) => {
            console.warn("Failed to play sound:", e);
        });

        for (let pixel of localPixels) {
            const r = parseInt(pixel.dataset.row)
            const c = parseInt(pixel.dataset.col)

            // Destroy only this pixel and neighbors in the same shield
            if (Math.abs(r - row) <= 1 && Math.abs(c - col) <= 1) {
                pixel.classList.remove("shield-cell")
                pixel.classList.add("inactive")
            }
        }
    }

    //  Hndle the end of the game:
    handle_game_over(message = "Game over!") {
        let pause = document.getElementById("pause_btn")
        pause.click()
        let game_over = document.createElement("div")
        game_over.setAttribute("id", "game_over")
        let text = document.createElement("p")
        text.textContent = message
        let res = document.getElementById("restart_btn")
        res.style.display = "none"
        pause.style.display = "none"
        let restart_btn = document.createElement("button");
        restart_btn.setAttribute("id", "restart_btn");
        restart_btn.innerHTML = `<i class="fas fa-rotate-right"></i>`;
        restart_btn.title = "Restart";
        restart_btn.style.padding = "0.5vmin";
        restart_btn.style.fontSize = "1.5vmin";
        restart_btn.style.cursor = "pointer";
        restart_btn.style.borderRadius = "0.5vmin";
        restart_btn.style.border = "none";
        restart_btn.style.backgroundColor = "#2c3e50";
        restart_btn.style.color = "#fff";
        restart_btn.addEventListener("click", () => {
            location.reload();
        });
        game_over.append(text, restart_btn)
        this.parent_element.append(game_over)
    }


}