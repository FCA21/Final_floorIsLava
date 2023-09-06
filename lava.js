
function Lava (x, y) {
    var self = this
    this.x = x
    this.y = y
    this.sprite
    this.create = false

console.log(this.create)
this.insertLava = function () { //Funcion para crear la lava 
    var newLava = document.createElement("div")
    newLava.setAttribute("id", "lava")
    newLava.style.left = this.x + "px"
    newLava.style.top = this.y + "px"
    this.sprite = newLava
    board.appendChild(this.sprite)

}

this.lavatrue = function () {
    self.create = true
}
}


export { Lava }