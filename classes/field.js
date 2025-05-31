export class Field {
    constructor(width, height, tag_class, parent_element, image_path = null) {
        this.width = width
        this.height = height
        this.tag_class = tag_class
        this.parent_element = parent_element
        this.image_path = image_path
    }

    Create() {
        let container = document.createElement("div")
        container.classList.add(this.tag_class)
        container.style.width = `${this.width}vmin`
        container.style.height = `${this.height}vmin`
        container.style.backgroundColor = "green"
        if (this.image_path){
              container.style.backgroundImage = `url(${this.image_path})`;
        }
        this.parent_element.appendChild(container)
    }
}