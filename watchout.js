// start slingin' some d3 here.
var options = {
  height: $(window).height(),
  width: $(window).width(),
  enemies: 43
};

//enemies
//id, location(x,y), r, color
var Enemy = function (i) {
  this.i = i;
  this.x = Math.floor(Math.random() * options.width);
  this.y = Math.floor(Math.random() * options.height);
  this.r = Math.floor(Math.random() * 15) + 15;
  this.color = this.makeColor();

};

Enemy.prototype.makeColor = function() {
  var randC = function() {
    return Math.floor(Math.random() * 256);
  };
  return 'rgb(' + randC() + ',' + randC() + ',' + randC() + ')';
};

var generateEnemies = function(numberOfEnemies) {
  var results = [];
  for (var i = 0; i < numberOfEnemies; i++) {
    results.push(new Enemy(i));
  }
  return results;
};
////------------ d3 helper functions--------
//-----------------------------------------
var drag = d3.behavior.drag().on('drag', function(d) {
  d.x = d3.event.dx + d.x;
  d.y = d3.event.dy + d.y;
  d3.select(this).attr('transform', 'translate(' + [d.x,d.y] +')');
});


var tweenFactoryFunction = function(newData) {
  var enemy = d3.select(this);
  var startLoc = {
    x: parseFloat(enemy.attr('cx')),
    y: parseFloat(enemy.attr('cy'))
  };
  var endLoc = {
    x: newData.x,
    y: newData.y
  };
  return function(t) {
    checkCollision(enemy);
    var nextLoc = {
      x: startLoc.x + (endLoc.x - startLoc.x) * t,
      y: startLoc.y + (endLoc.y - startLoc.y) * t
    };
    return enemy.attr('cx', nextLoc.x).attr('cy', nextLoc.y);
  };
};

var checkCollision = function(enemy) {
  var radiusSum, separation, xDiff, yDiff;
  var d = player[0][0].__data__;
  radiusSum = parseFloat(enemy.attr('r')) + d.r;
  // debugger;
  xDiff = parseFloat(enemy.attr('cx')) - d.x;
  yDiff = parseFloat(enemy.attr('cy')) - d.y;
  separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  if (separation < radiusSum) {
    console.log('BOOM!!!!!');
  }
};
//------------ d3 display -----------------
//-----------------------------------------


var board = d3.select('body')
  .append('svg:svg')
  .attr('height', options.height)
  .attr('width', options.width);


//player
var player = board.append('polygon')
  .data([{x: options.width / 2, y: options.height / 2, r: 16}])
  .attr('stroke', '#000000')
  .attr('stroke-width', 2)
  .attr('points', '18,0 6,16 -13,10 -13,-10 6,-16 18,0')
  .attr('fill', '#7f7f7f')
  .attr('transform', 'translate( '+ options.width / 2 + ',' + options.height / 2 + ')')
  .call(drag);

  //move player on drag


var moveEnemies = function() {

  //join our data with the enemies on the board
  var enemies = board.selectAll('circle')
    .data(generateEnemies(options.enemies), function(d) { return d.i; });



  //update existing enemies with transitions for relocation
  enemies.transition().duration(1000)
    .tween('custom', tweenFactoryFunction);
    // .ease('elastic')
    // .attr('cx', function(d) { return d.x; })
    // .attr('cy', function(d) { return d.y; });


  //enter = create new enemies

  enemies.enter().append('svg:circle')
    .attr('r', function(d) { return d.r; })
    .attr('fill', function(d) { return d.color; })
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });

  //update and enter with current positions
};

moveEnemies();
setInterval(moveEnemies, 1000);



// On page load, and again, every 1000 ms, call moveEnemies
  // selects all circles
  // binds enemy objects, created with 'generateEnemies' as data
    // each enemy has:
      // radius, color, cx, cy;
  // if d3 nodes bound to data don't yet exist
    // set d3 node attributes to enemies radius, color, cx and cy
  // if d3 nodes already existed (i.e. number of enemies still map to data set)
    // transition d3 nodes x and y over 1000ms new enemy data x and y
    //  using tween factory function for granular change and collision detection
      // store the current enemy d3 node
      // store enemy d3 node position
      // store incoming data (end) position
      // return tweeningFunction(t) where t is interpolated time
        // call checkcollision
        // calculate next position
          // start + (end - start) * t
        // return d3 enemy node positions with next positions

// CHECK COLISION
// pass in current d3 enemy
//





















