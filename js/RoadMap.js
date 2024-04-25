import Animal from "./Animal.js";
import Timer from "./Timer.js";
import Utils from "./Utils.js";

const ELEMENT_WIDTH = 50;
const ELEMENT_HEIGHT = 50;
class Road {
  constructor(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;

    this.distance = Math.sqrt(
      Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
    );
    this.elements = [];
    this.images = [];

    let road = document.createElement("div");
    road.className = "road";

    // Vertical Approach
    if (this.isVertical()) {
      road.style.width = "20px";
      road.style.height = this.distance + "px";

      road.style.left = Math.min(this.startX, this.endX) + "px";
      road.style.top = Math.min(this.startY, this.endY) + "px";
    }
    // Horizontal Approach
    if (this.isHorizontal()) {
      road.style.width = this.distance + "px";
      road.style.height = "20px";

      road.style.left = Math.min(this.startX, this.endX) + "px";
      road.style.top = Math.min(this.startY, this.endY) + "px";
    }

    // Events:
    document.getElementById("road-container").appendChild(road);
  }
  addFirst(elm) {
    const element = document.createElement("div");
    this.elements.push(element);
    element.style.width = ELEMENT_WIDTH;
    element.style.height = ELEMENT_HEIGHT;

    const img = document.createElement("img");
    this.images.push(img);
    img.src = elm.path;
    img.alt = elm.name;

    element.className = "road-element";
    element.style.left = this.startX - ELEMENT_WIDTH + "px";
    element.style.top = this.startY + "px";

    element.appendChild(img);

    // bydefault div elments doesn't reciev key events
    element.setAttribute("tabindex", "0");

    document.getElementById("road-container").appendChild(element);
  }
  addLast(elm) {
    const element = document.createElement("div");
    element.className = "road-element";
    this.elements.push(element);
    element.style.width = ELEMENT_WIDTH;
    element.style.height = ELEMENT_HEIGHT;

    const img = document.createElement("img");
    this.images.push(img);
    img.src = elm.path;
    img.alt = elm.name;

    element.style.left = this.endX - ELEMENT_WIDTH + "px";
    element.style.top = this.endY + "px";

    element.appendChild(img);

    // bydefault div elments doesn't reciev key events
    element.setAttribute("tabindex", "0");

    document.getElementById("road-container").appendChild(element);
  }

  isHorizontal() {
    return this.startY === this.endY;
  }
  isVertical() {
    return this.startX === this.endX;
  }
  // destructure
  getImages() {
    const [first, second] = this.images;
    return [first, second];
  }
}

// // RoadMap Structure
// // Horz
const road1 = new Road(100, 130, 500, 130);
const road2 = new Road(100, 300, 500, 300);
const road3 = new Road(100, 500, 500, 500);

// // Vertical
const road4 = new Road(300, 50, 300, 550);

const roads = [road1, road2, road3, road4];

// Animal Elments
const Animals = [
  new Animal("Camel", "images/Animals/Camel.jpg"),
  new Animal("Dolphin", "images/Animals/Dolphin.jpg"),
  new Animal("Duck", "images/Animals/duck.jpg"),
  new Animal("Goat", "images/Animals/Goat.jpg"),
  new Animal("Mole", "images/Animals/Mole.jpg"),
  new Animal("Penguin", "images/Animals/Penguin.webp"),
  new Animal("Beaver", "images/Animals/Beaver.webp"),
  new Animal("Squirrel", "images/Animals/Squirrel.png"),
];
let shiftedArray = Utils.shiftArray(Animals, 7);

function addAnimalToRoad(road, animal1, animal2) {
  road.addFirst(animal1);
  road.addLast(animal2);
}

addAnimalToRoad(road1, shiftedArray[0], shiftedArray[1]);
addAnimalToRoad(road2, shiftedArray[2], shiftedArray[3]);
addAnimalToRoad(road3, shiftedArray[4], shiftedArray[5]);
addAnimalToRoad(road4, shiftedArray[6], shiftedArray[7]);


const gridCells = [
  { id: "Goat", minX: 0, maxX: 0, minY: 0, maxY: 200 },
  { id: "Camel", minX: 200, maxX: 400, minY: 0, maxY: 120 },
  { id: "Beaver", minX: 20, maxX: 200, minY: 200, maxY: 300 },
  { id: "Duck", minX: 400, maxX: 600, minY: 200, maxY: 400 },
  { id: "Dolphin", minX: 30, maxX: 200, minY: 400, maxY: 500 },
  { id: "Squirrel", minX: 200, maxX: 400, minY: 400, maxY: 600 },
  { id: "Mole", minX: 400, maxX: 600, minY: 400, maxY: 500 },
];

function isInGridCell(element, cell) {
  const elementRect = element.getBoundingClientRect();
  return (
    elementRect.left >= cell.minX &&
    elementRect.right <= cell.maxX &&
    elementRect.top >= cell.minY &&
    elementRect.bottom <= cell.maxY
  );
}

function highlightInGridCell(element) {
  gridCells.forEach((cell) => {
      if (
        isInGridCell(element, cell)
        && cell.id === element.children[0].getAttribute('alt')
      ) {
        element.classList.add(cell.id);
      } else {
        element.classList.remove(cell.id);
      }
  });
}



roads.forEach((road) => {
  road.elements.forEach((element) => {
    const observer = new MutationObserver(() => {
      highlightInGridCell(element , road);
    });
    observer.observe(element, { attributes: true, attributeFilter: ["style"] });
  });
});

const intersections = Utils.collectIntersectionsPoints(roads);

roads.forEach((road, i, roads) => {
  road.elements.forEach((element) => {
    element.addEventListener("click", () => {
      const allElem = document.querySelectorAll(".road-element");
      allElem.forEach((elm) => {
        elm.classList.remove("selected");
      });
      element.classList.toggle("selected");
    });

    element.addEventListener("keydown", (event) => {
      let currentLeft = parseInt(element.style.left);
      let currentTop = parseInt(element.style.top);

      element.style.background = "";

      // Road Range
      let minX = Math.min(road.startX, road.endX) - ELEMENT_WIDTH;
      let maxX = Math.max(road.startX, road.endX);
      let minY = Math.min(road.startY, road.endY);
      let maxY = Math.max(road.startY, road.endY);

      if (
        event.key === "ArrowRight" &&
        road.isHorizontal() &&
        currentLeft <= maxX
      ) {
        element.style.left = `${currentLeft + 10}px`;
      }
      if (
        event.key === "ArrowLeft" &&
        road.isHorizontal() &&
        currentLeft >= minX
      ) {
        element.style.left = `${currentLeft - 10}px`;
      }
      if (event.key === "ArrowUp" && road.isVertical() && currentTop >= minY) {
        element.style.top = `${currentTop - 10}px`;
      }
      if (
        event.key === "ArrowDown" &&
        road.isVertical() &&
        currentTop <= maxY
      ) {
        element.style.top = `${currentTop + 10}px`;
      }

      const intersectionDetect = intersections.some((intersectionPoint) => {
        return Utils.checkIntersection(element, road);
      });
      // Road Range:
      if (intersectionDetect) {
        element.style.background = "red";
        const verticalRoad = roads.find(
          (r) => r.isVertical() && Utils.checkIntersection(element, r)
        );
        const horizontalRoad = roads.find(
          (r) => r.isHorizontal() && Utils.checkIntersection(element, r)
        );

        if (verticalRoad && event.key === "ArrowUp" && road.isHorizontal()) {
          road = verticalRoad;
          element.style.transform = "rotate(-90deg)";
        } else if (
          horizontalRoad &&
          event.key === "ArrowLeft" &&
          road.isVertical()
        ) {
          road = horizontalRoad;
          element.style.transform = "rotate(0deg)";
        }
      }
    });
  });
});

// const timer = new Timer(10);

// setTimeout(timer.start(),5000);
