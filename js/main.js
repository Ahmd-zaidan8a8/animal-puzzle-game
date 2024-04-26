import Animal from "./Animal.js";
import Road from "./RoadMap.js";
import Timer from "./Timer.js";
import Utils from "./Utils.js";
import Score from "./Score.js"

const ELEMENT_WIDTH = 50;
const highlightedAnimals = [];
const scoreContainer = new Score();

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
    const timer = new Timer(120);
    setTimeout(timer.start(),2000);

    const id = setInterval(() => {
      if(highlightedAnimals.length === 8){
        clearInterval(id);
      } else {
        scoreContainer.displayScore();
      }
    } , 1000);
  });
});


window.addEventListener('click', (event) => {
  console.log(`x:${event.clientX},y:${event.clientY}`)
})


// define the game grid:
const gridCells = [
  { id: "goat", minX: 400, maxX: 600, minY: 0, maxY: 200 },
  { id: "camel", minX: 600, maxX: 800, minY: 0, maxY: 130 },
  { id: "penguin", minX: 800, maxX: 1000, minY: 0, maxY: 200 },

  { id: "beaver", minX: 400, maxX: 600, minY: 200, maxY: 400 },
  { id: "duck", minX: 800, maxX: 1000, minY: 200, maxY: 400 },
  { id: "dolphin", minX: 600, maxX: 600, minY: 500, maxY: 400 },
  { id: "squirrel", minX: 600, maxX: 800, minY: 400, maxY: 600 },
  { id: "mole", minX: 800, maxX: 1000, minY: 400, maxY: 600 },
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


// i : counter varaible
let i = 0;
roads.forEach(road => {
  road.addAnimalToRoad(Animals[i], Animals[i + 1]);
  i += 2;
});


roads.forEach(road => {
  road.animalDivs.forEach((animal) => {
    const observer = new MutationObserver(() => {
      highlightInGridCell(animal, road);
      console.log()
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
    ){
      animal.classList.add(cell.id);
      let id = animal.children[0].getAttribute("alt");
      if(!highlightedAnimals.includes(id)){
        highlightedAnimals.push(id);
        scoreContainer.updateScore();
      }
      
    } else {
      animal.classList.remove(cell.id);
    }
  });
}




