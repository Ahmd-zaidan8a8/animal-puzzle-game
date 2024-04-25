import Animal from "./Animal.js";
import Road from "./RoadMap.js";
import Timer from "./Timer.js";
import Utils from "./Utils.js";

const ELEMENT_WIDTH = 50;

window.addEventListener("click", (event) => {
  let postionX = event.clientX;
  let postionY = event.clientY;

  console.log(`{x:${postionX} y:${postionY}}`);
});

// Starter section / // Timer
const startSection = document.getElementById("starter-section");
const main = document.getElementById("main-section");
const myName = document.querySelector(".name");
const goToMainPageButton = document.getElementById("btn-starter");

// Logo
const nameId = setInterval(() => {
  myName.classList.toggle("rotate");
}, 1000);

document.addEventListener("DOMContentLoaded", () => {
  goToMainPageButton.addEventListener("click", event => {
    event.preventDefault();
    startSection.style.display = "none";
    main.style.display = "block";
    clearInterval(nameId);
    const timer = new Timer(5);
    setTimeout(timer.start(),2000);
  });
});


// define the game grid:
const gridCells = [
  { id: "goat", minX: 20, maxX: 200, minY: 70, maxY: 180 },
  { id: "camel", minX: 200, maxX: 400, minY: 30, maxY: 120 },
  { id: "penguin", minX: 400, maxX: 600, minY: 50, maxY: 200 },
  { id: "beaver", minX: 30, maxX: 200, minY: 200, maxY: 400 },
  { id: "duck", minX: 450, maxX: 620, minY: 250, maxY: 350 },
  { id: "dolphin", minX: 25, maxX: 180, minY: 450, maxY: 550 },
  { id: "squirrel", minX: 230, maxX: 400, minY: 500, maxY: 600 },
  { id: "mole", minX: 450, maxX: 600, minY: 450, maxY: 550 },
];

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
  new Animal("camel", "images/Animals/Camel.jpg"),
  new Animal("dolphin", "images/Animals/Dolphin.jpg"),
  new Animal("duck", "images/Animals/duck.jpg"),
  new Animal("goat", "images/Animals/Goat.jpg"),
  new Animal("mole", "images/Animals/Mole.jpg"),
  new Animal("penguin", "images/Animals/Penguin.webp"),
  new Animal("beaver", "images/Animals/Beaver.webp"),
  new Animal("squirrel", "images/Animals/Squirrel.png"),
];

let shiftedArray = Utils.shiftArray(Animals);

// i : counter varaible
let i = 0;
roads.forEach((road) => {
  road.addAnimalToRoad(Animals[i], Animals[i + 1]);
  i += 2;
});

roads.forEach(road => {
  road.animalDivs.forEach((animal) => {
    const observer = new MutationObserver(() => {
      highlightInGridCell(animal, road);
    });
    observer.observe(animal, { attributes: true, attributeFilter: ["style"] });
  });
});

roads.forEach((road, i, roads) => {
  road.animalDivs.forEach((animal) => {
    animal.addEventListener("click", () => {
      const allAnimals = document.querySelectorAll(".animal");
      allAnimals.forEach((animal) => {
        animal.classList.remove("selected");
      });
      animal.classList.toggle("selected");
    });

    animal.addEventListener("keydown", (event) => {
      let currentLeft = parseInt(animal.style.left);
      let currentTop = parseInt(animal.style.top);

      animal.style.background = "";

      // Road Range
      let minX = Math.min(road.startX, road.endX) - ELEMENT_WIDTH;
      let maxX = Math.max(road.startX, road.endX);
      let minY = Math.min(road.startY, road.endY);
      let maxY = Math.max(road.startY, road.endY);

    //   intial conditions:

      if (
        event.key === "ArrowRight" &&
        road.isHorizontal() &&
        currentLeft <= maxX
      ) {
        animal.style.left = `${currentLeft + 10}px`;
      }
      if (
        event.key === "ArrowLeft" &&
        road.isHorizontal() &&
        currentLeft >= minX
      ) {
        animal.style.left = `${currentLeft - 10}px`;
      }
      if (event.key === "ArrowUp" && road.isVertical() && currentTop >= minY) {
        animal.style.top = `${currentTop - 10}px`;
      }
      if (
        event.key === "ArrowDown" &&
        road.isVertical() &&
        currentTop <= maxY
      ) {
        animal.style.top = `${currentTop + 10}px`;
      }

      const canMovie = Utils.inRange(animal, road);
      // Road Range:
      if (canMovie) {
        animal.style.background = "red";
        const verticalRoad = roads.find(
          (r) => r.isVertical() && Utils.inRange(animal, r)
        );
        const horizontalRoad = roads.find(
          (r) => r.isHorizontal() && Utils.inRange(animal, r)
        );

        if (verticalRoad && event.key === "ArrowUp" && road.isHorizontal()) {
          road = verticalRoad;
          animal.style.transform = "rotate(-90deg)";
        } else if (
          horizontalRoad &&
          event.key === "ArrowLeft" &&
          road.isVertical()
        ) {
          road = horizontalRoad;
          animal.style.transform = "rotate(0deg)";
        }
      }
    });
  });
});

function highlightInGridCell(animal) {
  gridCells.forEach(cell => {
    if (
      Utils.isInGridCell(animal, cell) &&
      cell.id === animal.children[0].getAttribute("alt")
    ) {
      animal.classList.add('highlight');
    } else {
      animal.classList.remove('highlight');
    }
  });
}
