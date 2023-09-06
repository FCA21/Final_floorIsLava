
function Platform (x,y,widthP,platforms){
    var self = this
    this.x = x
    this.y = y
    this.sprite
    this.heightP = 10
    this.widthP = widthP
    this.speedY = 1.8
    this.score = (widthP > 50)? 50 : 100

    this.insertPlatform = function () { //Funcion para crear  plataforma 
    var newPlatform = document.createElement("div")
    newPlatform.setAttribute("class", "platform")
    newPlatform.style.left = this.x + "px"
    newPlatform.style.top = this.y + "px"
    newPlatform.style.width = this.widthP + "px"
    this.sprite = newPlatform
    board.appendChild(this.sprite)

    }

   this.fallplatform = function () {
    if (self.y < 980 ) {
        
        self.y = self.y + self.speedY
        self.sprite.style.top = self.y + 'px' 
   }else {
    self.sprite.remove();
    platforms.shift()
   }
   
}

}


export { Platform }