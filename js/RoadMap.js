const ELEMENT_WIDTH = 50;
class Road {
  // stroe all the instances that created form the road class
  // class level
  static allRoads = [];

  constructor(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;

    this.intersectionPoints = [];

    // clac the distance bettween 2 diffrents points
    this.distance = Math.sqrt(
      Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
    );

    Road.allRoads.push(this);
  }

  createRoad() {
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

    document.getElementById("road-container").appendChild(road);
  }
  // arr
  addElements(elments) {
    if (elments.length < 2)
      throw new Error("at least two elemets are required.");

    let firstElmX = this.startX - ELEMENT_WIDTH;
    let firstElmY = this.startY;

    let secondElmX = this.endX;
    let secondElmY = this.endY;

    // passing reffrence to the current object in order to check if the elm
    // on a vertical or Horizontal road to restrict movments.
    const firstElm = new RoadElement(firstElmX, firstElmY, this);
    const secondElm = new RoadElement(secondElmX, secondElmY, this);

    document.getElementById("road-container").appendChild(firstElm.element);
    document.getElementById("road-container").appendChild(secondElm.element);
  }
  isHorizontal() {
    return this.startY === this.endY;
  }
  isVertical() {
    return this.startX === this.endX;
  }
  intersects(anotherRoad) {
    const x1 = this.startX;
    const y1 = this.startY;
    const x2 = this.endX;
    const y2 = this.endY;

    const x3 = anotherRoad.startX;
    const y3 = anotherRoad.startY;
    const x4 = anotherRoad.endX;
    const y4 = anotherRoad.endY;
    // line-line intersection algorithim
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (denominator === 0) return null;

    const intersectX =
      ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
      denominator;
    const intersectY =
      ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
      denominator;

    if (
      intersectX >= Math.min(x1, x2) &&
      intersectX <= Math.max(x1, x2) &&
      intersectX >= Math.min(x3, x4) &&
      intersectX <= Math.max(x3, x4) &&
      intersectY >= Math.min(y1, y2) &&
      intersectY <= Math.max(y1, y2) &&
      intersectY >= Math.min(y3, y4) &&
      intersectY <= Math.max(y3, y4)
    ) {
      return { x: intersectX, y: intersectY };
    } else {
      // Intersection point is outside one or both line segments
      return null;
    }
  }
  //TODO: duplications points??
  getIntersectionsPoints() {
    Road.allRoads.forEach((road) => {
      if (this !== road) {
        const intersectionPoint = this.intersects(road);
        if (intersectionPoint) this.storedIntersectionPoint(intersectionPoint);
      }
    });
    return this.intersectionPoints;
  }
  storedIntersectionPoint(point) {
    this.intersectionPoints.push(point);
  }
}

class RoadElement {
  constructor(x, y, road) {
    
    this.element = document.createElement("div");
    this.element.className = "road-element";
    this.element.style.left = x + "px";
    this.element.style.top = y + "px";
    
    this.road = road;

    // bydefault div elments doesn't reciev key events
    this.element.setAttribute("tabindex", "0");

    // changing this to reffer to the instance object
    this.handleClick = this.handleClick.bind(this);
    this.handlekey = this.handlekey.bind(this);

    this.element.addEventListener("click", this.handleClick);
    this.element.addEventListener("keydown", this.handlekey);
  }
  handleClick() {
    // to select only one at the time
    // remove selected class from all the elements
    const allElem = document.querySelectorAll(".road-element");
    allElem.forEach((elm) => {
      elm.classList.remove("selected");
    });

    this.element.classList.toggle("selected");
  }
  handlekey(event) {
    if (this.isSlected()) {
      let currentLeft = parseInt(this.element.style.left);
      let currentTop = parseInt(this.element.style.top);

      // Road Range:
      let minX = Math.min(this.road.startX, this.road.endX) - ELEMENT_WIDTH;
      let maxX = Math.max(this.road.startX, this.road.endX);
      let minY = Math.min(this.road.startY, this.road.endY);
      let maxY = Math.max(this.road.startY, this.road.endY);

      // checking : key , the road alignimnet , the range.
      if (
        event.key === "ArrowRight" &&
        this.road.isHorizontal() &&
        currentLeft <= maxX
      ) {
        this.element.style.left = `${currentLeft + 10}px`;
      }
      if (
        event.key === "ArrowLeft" &&
        this.road.isHorizontal() &&
        currentLeft >= minX
      ) {
        this.element.style.left = `${currentLeft - 10}px`;
      }
      if (
        event.key === "ArrowUp" &&
        this.road.isVertical() &&
        currentTop >= minY
      ) {
        this.element.style.top = `${currentTop - 10}px`;
      }
      if (
        event.key === "ArrowDown" &&
        this.road.isVertical() &&
        currentTop <= maxY
      ) {
        this.element.style.top = `${currentTop + 10}px`;
      }

      const intersections = this.road.getIntersectionsPoints();

      intersections.forEach((point) => {
        if(this.checkIntersection(point)){
          this.element.style.background = 'red';
        }
      });
    }
  }
  checkIntersection(point) {
    const currentLeft = parseInt(this.element.style.left);
    const currentTop = parseInt(this.element.style.top);
    const tolerance = 20;

    return Math.abs(currentLeft - point.x) <= tolerance && Math.abs( currentTop - point.y) <= tolerance;
  }

  isSlected() {
    return this.element.classList.contains("selected");
  }
}

// RoadMap Structure
// Horz
const road1 = new Road(100, 130, 500, 130);
const road2 = new Road(100, 300, 500, 300);
const road3 = new Road(100, 500, 500, 500);

// Vertical
const road4 = new Road(300, 50, 300, 550);

road1.createRoad();
road2.createRoad();
road3.createRoad();
road4.createRoad();

road1.addElements(["item1", "item2"]);
road2.addElements(["item1", "item2"]);
road3.addElements(["item1", "item2"]);
road4.addElements(["item1", "item2"]);



