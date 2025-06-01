// Create a function to get the position of the HTML element to control movements
export function get_position(html_element) {
  return html_element.getBoundingClientRect();
}
