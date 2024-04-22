

class Road {
    constructor(startX , startY , endX , endY) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    this.distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    // the angle between 2 points relative to the postive axis
    this.angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

    // this.createRoad();


    }

    createRoad() {
    let road = document.createElement("div");
    road.className = "road";


    road.style.width = this.distance + "px";
    road.style.transform = "rotate(" + this.angle + "deg)";

    road.style.left = this.startX + "px";
    road.style.top = this.startY + "px";

    document.getElementById("road-container").appendChild(road);
    }
    // arr
    addElements(elments){
        const elementsContainer = document.createElement('div');
        elementsContainer.className = 'elments-container';
        document.getElementById("road-container").appendChild(elementsContainer);

        let spacing = this.distance / (elments.length + 1);
        for(let i = 0 ; i < elments.length ; i++){
            let elementDistance = (i + 1) * spacing;
            let elementX = this.startX + (elementDistance * Math.cos(this.angle * Math.PI / 180));
            let elementY = this.startY + (elementDistance * Math.sin(this.angle * Math.PI / 180));

            const element = new RoadElement(elementX,elementY);
            elementsContainer.appendChild(element.element);
        }


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



const road1 = new Road(70 ,130 , 500 ,130);
const road2 = new Road(70 ,300 , 500 ,300);
const road3 = new Road(70 ,500 , 500 ,500);

const road4 = new Road(70 ,500 , 70 ,120);



road1.createRoad();
road2.createRoad();
road3.createRoad();
road4.createRoad();

// road.addElements(['item1','item2','item3']);