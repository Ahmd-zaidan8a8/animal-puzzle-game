const ELEMENT_WIDTH = 50;
class Utils {
  static intersectionPoints = [];

  static intersects(line1, line2) {
    const x1 = line1.startX;
    const y1 = line1.startY;
    const x2 = line1.endX;
    const y2 = line1.endY;

    const x3 = line2.startX;
    const y3 = line2.startY;
    const x4 = line2.endX;
    const y4 = line2.endY;
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
      const intersectionPoints = [];
    }
  }

  static collectIntersectionsPoints(roads) {
    const length = roads.length;
    for (let i = 0; i < length; i++) {
      for (let j = i + 1; j < length; j++) {
        const intersection = Utils.intersects(roads[i], roads[j]);
        if (intersection && !Utils.isDuplicated(intersection)) {
          Utils.intersectionPoints.push(intersection);
        }
      }
    }
    return this.intersectionPoints;
  }

  static isDuplicated(intersectionPoint) {
    return Utils.intersectionPoints.some(
      (point) =>
        point.x === intersectionPoint.x && point.y === intersectionPoint.y
    );
  }
  // static checkIntersection(element , intersectionPoint) {
  //   // collect postion
  //   const currentLeft = parseInt(element.style.left);
  //   const currentTop = parseInt(element.style.top);
  //   const tolerance = 30;

  //   return (
  //     Math.abs(currentLeft - intersectionPoint.x) <= tolerance &&
  //     Math.abs(currentTop - intersectionPoint.y) <= tolerance);
  // }
  static checkIntersection(element, road) {
    const currentLeft = parseInt(element.style.left);
    const currentTop = parseInt(element.style.top);
  
    const tolerance = 50;
  
    // Determine the boundaries of the road
    let minX = Math.min(road.startX, road.endX) - ELEMENT_WIDTH;
    let maxX = Math.max(road.startX, road.endX);
    let minY = Math.min(road.startY, road.endY);
    let maxY = Math.max(road.startY, road.endY);
  
    // Check if the element's position intersects with the boundaries of the road within the tolerance range
    return (
      currentLeft >= minX - tolerance &&
      currentLeft <= maxX + tolerance &&
      currentTop >= minY - tolerance &&
      currentTop <= maxY + tolerance
    );
  }
  


}

export default Utils;
