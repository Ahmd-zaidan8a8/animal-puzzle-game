
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

    }

    createRoad() {
    let road = document.createElement("div");
    road.className = "road";
        // Vertical Approach
    if( this.isVertical()){
        road.style.width = "20px";
        // endX - startX = 0
        road.style.height = Math.abs(this.endY - this.startY) + "px";
        // road.style.transform = "rotate(90deg)";
    
        road.style.left = Math.min(this.startX , this.endX) + "px";
        road.style.top = Math.min(this.startY, this.endY) + "px";
    }
    // Horizontal Approach
    if( this.isHorizontal()) {
        // endY - startY = 0
        road.style.width = Math.abs(this.endX - this.startX) + 'px';
        road.style.height = '20px';

        road.style.left = Math.min(this.startX, this.endX) + "px";
        road.style.top = Math.min(this.startY, this.endY) + "px";
    }

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

        // passing reffrence to the current object in order to check if the elm
        // on a vertical or Horizontal road to restrict movments.
        const firstElm = new RoadElement(firstElmX,firstElmY,this);
        const secondElm = new RoadElement(secondElmX,secondElmY,this);
            
        document.getElementById('road-container').appendChild(firstElm.element);
        document.getElementById('road-container').appendChild(secondElm.element);
        }
        isHorizontal(){
            return this.startY === this.endY;
        }
        isVertical(){
            return this.startX === this.endX;
        }

    }

class RoadElement {
    constructor(x, y , road) {
        this.element = document.createElement("div");
        this.element.className = "road-element";
        this.element.style.left = x + "px";
        this.element.style.top = y + "px";

        this.road = road;
        // bydefault div elments doesn't reciev key events
        this.element.setAttribute('tabindex', '0');

        // changing this to reffer to the instance object
        this.handleClick = this.handleClick.bind(this);
        this.handlekey = this.handlekey.bind(this);

        this.element.addEventListener('click' , this.handleClick);

        this.element.addEventListener('keydown', this.handlekey);
    }
    handleClick(){
        // to select only one at the time
        // remove selected class from all the elements
        const allElem = document.querySelectorAll('.road-element');
        allElem.forEach((elm) => {
            elm.classList.remove('selected');
        });

        this.element.classList.toggle('selected');
    }
    handlekey(event){
        if(this.isSlected()){
            let currentLeft = parseInt(this.element.style.left);
            let currentTop = parseInt(this.element.style.top);

            // Road Range:
            let minX = Math.min(this.road.startX , this.road.endX);
            let maxX = Math.max(this.road.startX , this.road.endX);
            let minY = Math.min(this.road.startY , this.road.endY);
            let maxY = Math.max(this.road.startY , this.road.endY);

            if(event.key === 'ArrowRight' 
            && this.road.isHorizontal()){
                if(currentLeft <= maxX)
                    this.element.style.left = `${currentLeft + 10}px`;
            }
            if(event.key === 'ArrowLeft' 
            && this.road.isHorizontal()){
                if( currentLeft >= minX)
                    this.element.style.left = `${currentLeft - 10}px`;
            }
            if(event.key === 'ArrowUp' 
            && this.road.isVertical()){
                if( currentTop >= minY)
                    this.element.style.top = `${currentTop - 10}px`
            }
            if(event.key === 'ArrowDown' 
            && this.road.isVertical()){
                if(currentTop <= maxY)
                    this.element.style.top = `${currentTop + 10}px`
            }
        }
    }
    
    isSlected(){
        return this.element.classList.contains('selected');
    }
}

// RoadMap Structure
// Horz
const road1 = new Road(100 ,130 , 500 ,130);
const road2 = new Road(100 ,300 , 500 ,300);
const road3 = new Road(100 ,500 , 500 ,500);

// Vertical
const road4 = new Road(300 ,50 , 300 ,550);

road1.createRoad();
road2.createRoad();
road3.createRoad();
road4.createRoad();


road1.addElements(['item1','item2']);
road2.addElements(['item1','item2']);
road3.addElements(['item1','item2']);
road4.addElements(['item1','item2']);