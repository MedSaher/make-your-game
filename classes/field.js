export class Field {
    // new Field(60, 80, "battle_field", grand_parent, main_color)
    constructor(width, height, tag_class, parent_element, background_color = null, image_path = null, type = null) {
        this.width = width
        this.height = height
        this.tag_class = tag_class
        this.parent_element = parent_element
        this.background_color = background_color
        this.image_path = image_path
        this.type = type
        this.element = null
    }

    // Create the html representation:
    create() {
        let container = document.createElement("div")
        container.classList.add(this.tag_class)
        container.style.width = `${this.width}vmin`
        container.style.height = `${this.height}vmin`
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
    advancement.style.willChange = "transform";

    // Score container
    let score_container = document.createElement("div");
    score_container.setAttribute("id", "score_container");

    let score = document.createElement("p");
    score.innerText = "score: ";

    let score_number = document.createElement("span");
    score_number.setAttribute("id", "score_number");
    score_number.innerText = "0";

    score_container.append(score, score_number);

    // Attempts container
    let attempts = document.createElement("div");
    attempts.setAttribute("id", "attempts_container");

    let lives = document.createElement("p");
    lives.innerText = "left: ";

    let lives_number = document.createElement("span");
    lives_number.setAttribute("id", "lives_number");
    lives_number.innerText = "3";

    attempts.append(lives, lives_number);

    // Append both to advancement container
    advancement.append(score_container, attempts);

    // Insert at the top of the parent element
    this.element.insertBefore(advancement, this.element.firstChild);
}

}