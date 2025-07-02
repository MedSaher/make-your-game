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
    advancement.style.width = `${this.width}vmin`;
    advancement.style.height = `100px`;
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
    advancement.append(score_container, attempts, controls_container);

    // Insert into DOM
    this.element.insertBefore(advancement, this.element.firstChild);
}
}