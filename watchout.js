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
////------------ d3 event handlers --------
//-----------------------------------------
var drag = d3.behavior.drag().on('drag', function(d) {
  debugger;
  d.x = d3.event.dx + d.x;
  d.y = d3.event.dy + d.y;
  d3.select(this).attr('transform', 'translate(' + [d.x,d.y] +')');
});


//------------ d3 display -----------------
//-----------------------------------------


var board = d3.select('body')
  .append('svg:svg')
  .attr('height', options.height)
  .attr('width', options.width);


//player
var player = board.append('polygon')
  .data([{x: options.width / 2, y: options.height / 2}])
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
    // .ease('elastic')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });


  //enter = create new enemies

  enemies.enter().append('svg:circle')
    .attr('r', function(d) { return d.r; })
    .attr('fill', function(d) { return d.color; })
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });

  //update and enter with current positions
};

setInterval(moveEnemies, 1000);
























