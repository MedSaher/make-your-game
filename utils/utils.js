// Create a function to get the position of the HTML element to control movements
export function get_position(html_element) {
  return html_element.getBoundingClientRect();
}



          // const heroElement = document.getElementsByClassName("hero_tag")[0]

          //   // get the hero position:
          //   if (heroElement) {
          //       var heroRect = heroElement.getBoundingClientRect();
          //   }


          //  const isCollidingWithHero = bulletRect.left < heroRect.right &&
          //       bulletRect.right > heroRect.left &&
          //       bulletRect.top < heroRect.bottom &&
          //       bulletRect.bottom > heroRect.top;

          //   if (isCollidingWithHero) {
          //       heroElement.remove() // remove the hero
          //       this.element.remove(); // remove the bullet
          //   }

