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
  return "rgb(" + randC() + "," + randC() + "," + randC() + ")";
};

var generateEnemies = function(numberOfEnemies) {
  var results = [];
  for (var i = 0; i < numberOfEnemies; i++) {
    results.push(new Enemy(i));
  }
  return results;
};


var board = d3.select('body')
  .append('svg:svg')
  .attr('height', options.height)
  .attr('width', options.width);


var moveEnemies = function() {

  //join our data with the enemies on the board
  var enemies = board.selectAll('circle')
    .data(generateEnemies(options.enemies), function(d) { return d.i; });



  //update existing enemies with transitions for relocation
  enemies.transition().duration(1000)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });


  //enter = create new enemies

  enemies.enter().append('svg:circle')
    .attr('r', function(d) { return d.r; })
    .attr('fill', function(d) { return d.color; })
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });

  //update and enter with current positions
  enemies
};

setInterval(moveEnemies, 1000);
























