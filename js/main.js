
let clickedPoints = [];

window.addEventListener('click' , (event) => {
    let postionX = event.clientX;
    let postionY = event.clientY;

    clickedPoints.push({x:postionX , y: postionY});

    console.log(`{x:${postionX} y:${postionY}}`);
});


function createRoad(pointsArr){

    for(let i = 0 ; i < pointsArr.length - 1 ; i++){
        let startPoint = pointsArr[i];
        let endPoint = pointsArr[i + 1];
    
        let startX = startPoint.x;
        let startY = startPoint.y;
    
        let endX = endPoint.x;
        let endY = endPoint.y;
    
        const road = new Road(startX,startY,endX,endY);
        road.createRoad();
    }
}
function clearPonisArr(pointsArr){
    pointsArr.length = 0;
}
function displayRoad(){
    createRoad(clickedPoints);
    clearPonisArr(clickedPoints);
}



