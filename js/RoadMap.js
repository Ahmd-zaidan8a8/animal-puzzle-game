import Animal from "./Animal.js";
import Timer from "./Timer.js";
import Utils from "./Utils.js";

const ELEMENT_WIDTH = 50;
const ELEMENT_HEIGHT = 50;
let roadChanging = false;
class Road {
  constructor(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;

    this.distance = Math.sqrt(
      Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
    );
    this.animalDivs = [];

    let road = document.createElement("div");
    road.className = "road";

    // Vertical Approach
    if (this.isVertical()) {
      road.style.width = "20px";
      road.style.height = this.distance + "px";
    }
    // Horizontal Approach
    else if (this.isHorizontal()) {
      road.style.width = this.distance + "px";
      road.style.height = "20px";
    }

    // Postion the road on the screen
    road.style.left = Math.min(this.startX, this.endX) + "px";
    road.style.top = Math.min(this.startY, this.endY) + "px";
    
    // Events:
    document.getElementById("grid").appendChild(road);
  }
  addFirst(animal) {
    const animalContainer = document.createElement("div");
    const animalImg = document.createElement("img");

    animalContainer.className = "animal";
    animalContainer.style.left = this.startX - ELEMENT_WIDTH + "px";
    animalContainer.style.top = this.startY + "px";

    animalImg.alt = animal.name;
    animalImg.src = animal.path;

    this.animalDivs.push(animalContainer);

    animalContainer.appendChild(animalImg);

    // bydefault div elments doesn't reciev key events
    animalContainer.setAttribute("tabindex", "0");

    document.getElementById("grid").appendChild(animalContainer);
  }
  addLast(animal) {
    const animalContainer = document.createElement("div");
    const animalImg = document.createElement("img");
    
    animalContainer.className = "animal";
    animalContainer.style.left = this.endX - ELEMENT_WIDTH + "px";
    animalContainer.style.top = this.endY + "px";

    animalImg.src = animal.path;
    animalImg.alt = animal.name;
    animalContainer.appendChild(animalImg);

    this.animalDivs.push(animalContainer);


    // bydefault div elments doesn't reciev key events
    animalContainer.setAttribute("tabindex", "0");

    document.getElementById("grid").appendChild(animalContainer);
  }
  addAnimalToRoad(animal1, animal2) {
    this.addFirst(animal1);
    this.addLast(animal2);
  }

  isHorizontal() {
    return this.startY === this.endY;
  }
  isVertical() {
    return this.startX === this.endX;
  }
}

export default Road;



