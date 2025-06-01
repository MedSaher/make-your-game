export class Field {
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
        // let container = document.getElementsByClassName(this.tag_class)[0]
        let advancement = document.createElement("div")
        advancement.setAttribute("id", "game_advancement")
        advancement.style.width = `${this.width}vmin`
        advancement.style.height = `${20}vmin`
        advancement.style.willChange = "transform";
        this.element.insertBefore(advancement, this.element.firstChild);
    }
}