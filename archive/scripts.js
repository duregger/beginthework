var svgEl = document.querySelector(".animated-lines");

// var randomRange = function(min, max) {
//   return ~~(Math.random() * (max - min + 1)) + min;
// };

var randomRange = function(min) {
  return min;
};

var numberOfLines = 1,
  lineDataArr = [];

var createPathString = function() {
  var completedPath = "",
    comma = ",",
    ampl = 10; // pixel range from 0, aka how deeply they bend

  for (var i = 0; i < numberOfLines; i++) {
    var path = lineDataArr[i];

    var current = {
      x: ampl * Math.sin(path.counter / path.sin),
      y: ampl * Math.cos(path.counter / path.cos),
    };

    var newPathSection =
      "M" +
      // starting point
      path.startX +
      comma +
      path.startY +
      // quadratic control point
      " Q" +
      path.pointX +
      comma +
      (current.y * 1.5).toFixed(3) + // 1.5 to amp up the bend a little
      // center point intersection
      " " +
      (current.x / 10 + path.centerX).toFixed(3) +
      comma +
      (current.y / 5 + path.centerY).toFixed(3) +
      // end point with quadratic reflection (T) (so the bottom right mirrors the top left)
      " T" +
      path.endX +
      comma +
      path.endY;
    path.counter++;

    completedPath += newPathSection;
  }

  return completedPath;
};

var createLines = function() {
  var newPathEl = document.createElementNS("http://www.w3.org/2000/svg", "path"),
    // higher is slower
    minSpeed = 85,
    maxSpeed = 150;

  // create an arr which contains objects for all lines
  // createPathString() will use this array
  for (var i = 0; i < numberOfLines; i++) {
    var lineDataObj = {
      counter: randomRange(1, 1), // a broad counter range ensures lines start at different cycles (will look more random)
      startX: randomRange(-2000, -2000),
      startY: randomRange(100, 100),
      endX: randomRange(2000, 2000), // viewbox = 200
      endY: randomRange(100, 100), // viewbox = 120
      sin: randomRange(minSpeed, maxSpeed),
      cos: randomRange(minSpeed, maxSpeed),
      pointX: randomRange(30, 55),
      centerX: randomRange(120, 150),
      centerY: randomRange(60, 70),
    };

    lineDataArr.push(lineDataObj);
  }

  var animLoop = function() {
    newPathEl.setAttribute("d", createPathString());
    // requestAnimationFrame(animLoop);
  };

  // once the path elements are created, start the animation loop
  svgEl.appendChild(newPathEl);
  animLoop();
};

createLines();

// M-2000,80 T2000,80
