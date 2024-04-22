
const ELEMENT_WIDTH = 50;
class Road {
    constructor(startX , startY , endX , endY) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        // clac the distance bettween 2 diffrents points
    this.distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    // the angle between 2 points relative to the postive axis
    this.angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
    // to Keep track of the road that inserted dynamiclly
    this.road = null ;

    }

    createRoad() {
    let road = document.createElement("div");
    road.className = "road";
        // Vertical Approach
    if(this.startX === this.endX){
        road.style.width = "20px";
        // endX - startX = 0
        road.style.height = Math.abs(this.endY - this.startY) + "px";
        // road.style.transform = "rotate(90deg)";
    
        road.style.left = Math.min(this.startX , this.endX) + "px";
        road.style.top = Math.min(this.startY, this.endY) + "px";
    }
    // Horizontal Approach
    else {
        // endY - startY = 0
        road.style.width = Math.abs(this.endX - this.startX) + 'px';
        road.style.height = '20px';

        road.style.left = Math.min(this.startX, this.endX) + "px";
        road.style.top = Math.min(this.startY, this.endY) + "px";
    }

    this.road = road;

    document.getElementById("road-container").appendChild(road);
    }
    // arr
    addElements(elments){
        if(elments.length < 2)
            throw new Error('at least two elemets are required.');

        let firstElmX = this.startX - ELEMENT_WIDTH;
        let firstElmY = this.startY;

        let secondElmX = this.endX;
        let secondElmY = this.endY;

        const firstElm = new RoadElement(firstElmX,firstElmY);
        const secondElm = new RoadElement(secondElmX,secondElmY);
            
        document.getElementById('road-container').appendChild(firstElm.element);
        document.getElementById('road-container').appendChild(secondElm.element);
        }


    }

class RoadElement {
    constructor(x, y) {
        this.element = document.createElement("div");
        this.element.className = "road-element";
        this.element.style.left = x + "px";
        this.element.style.top = y + "px";
    }
}

// RoadMap Structure
// Horz
const road1 = new Road(100 ,130 , 500 ,130);
const road2 = new Road(100 ,300 , 500 ,300);
const road3 = new Road(100 ,500 , 500 ,500);

// Vertical
const road4 = new Road(300 ,70 , 300 ,600);

road1.createRoad();
road2.createRoad();
road3.createRoad();
road4.createRoad();


road1.addElements(['item1','item2']);
road2.addElements(['item1','item2']);
road3.addElements(['item1','item2']);
road4.addElements(['item1','item2']);