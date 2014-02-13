var gamejs = require('gamejs');
var $v = require('gamejs/utils/vectors');
 
/*
* · Each tile can hold a "block" property detailing its desired
* blocking behaviour. Possible blocking data values are:
* - "none" -> Tile does not block.
* - "always" -> Tile blocks.
* - "north" -> Tile does not allow to go through its north border.
* - "east" -> Tile does not allow to go through its east border.
* - "south" -> Tile does not allow to go through its south border.
* - "west" -> Tile does not allow to go through its west border.
*
* Several restrictions can be added separated by commas; for example,
* an upper left corner should be "west,north". Restrictions are
* cumulative, so, for example, "west,always" would be the same as
* "always" and "east,none,north" would be the same as "east,north".
*
*
* Map layers may have also a "block" property with one of the following
* values:
* - "never" : Tiles in this layer never block.
* - "always" : Tiles in this layer always block.
* - "tileset" : Tiles in this layer block as it is indicated by the tileset.
*
* Note that "never" and "always" override any blocking information associated
* to a tile.
* This property cannot be changed in runtime.
*/
 
var BLOCK = {
none: parseInt('0000', 2),
north: parseInt('0001', 2),
east: parseInt('0010', 2),
south: parseInt('0100', 2),
west: parseInt('1000', 2),
always: parseInt('1111', 2)
};
 
var CollisionMap = exports.CollisionMap = function(tmxMap) {

this.matrix = [];
var i = tmxMap.height;
while (i-->0) {
var j = tmxMap.width;
this.matrix[i] = [];
while (j-->0) {
this.matrix[i][j] = BLOCK.none;
}
}
// set the matrix
// later layers overwrite earlier layers
tmxMap.layers.forEach(function(layer) {
var layerBlock = layer.properties && layer.properties.block;
if (layerBlock === 'never') {
return;
}
layer.gids.forEach(function(row, j) {
row.forEach(function(gid, i) {
var blockString = 'none';
if (layerBlock === 'always' && gid > 0) {
blockString = 'always';
} else if (!layerBlock || layerBlock === 'tileset') {
blockString = tmxMap.tiles.getProperties(gid).block;
}
if (blockString !== undefined && blockString !== 'none') {
if (blockString.indexOf(',') > -1) {
blockString.split(',').map(function(str) {
return str.trim();
}).forEach(function(str) {
console.log("REGISTERED i="+i+", j="+j);
this.matrix[i][j] |= BLOCK[str];
}, this);
} else {
console.log("REGISTERED i="+i+", j="+j);
this.matrix[i][j] |= BLOCK[blockString]; //HERE THERE'S AN ERROR
}
}
}, this);
}, this);
}, this);
return this;
}
CollisionMap.prototype = {
 
moveTest : function(a, b) {
var blockA = this.matrix[a[0]][a[1]];
var blockB = this.matrix[b[0]][b[1]];
// if destination blocks
if (blockA === BLOCK.always || blockB === BLOCK.always) {
return false;
}
// go west
if (b[0] < a[0]) {
if (blockA & BLOCK.west || blockB & BLOCK.east) {
return false;
}
// go east
} else if (b[0] > a[0]) {
if (blockA & BLOCK.east || blockB & BLOCK.west) {
return false;
}
}
// go north
if (b[1] < a[1]) {
if (blockA & BLOCK.north || blockB & BLOCK.south) {
return false;
}
// go south
} else if (b[1] > a[1]) {
if (blockA & BLOCK.south || blockB & BLOCK.north) {
return false;
}
}
return true;
}
 
};
 
var SearchMap = exports.SearchMap = function(collisionMap) {
 
this.collisionMap = collisionMap;
 
var findRoute = function(from, to, timeout) {
gamejs.pathfinding.astar.findRoute(this, a, b, timeout);
}
return findRoute;
};
 
var DIRECTIONS = [
[1,0],
[0,1],
[-1,0],
[0,-1],
[1,1],
[-1,1],
[1,-1],
[-1,-1]
 
];
SearchMap.prototype = {
adjacent: function(point) {
var valid = [];
DIRECTIONS.forEach(function(dir) {
var newPoint = $v.add(point, dir);
if (collisionMap.moveTest(point, newPoint)) {
valid.push(newPoint);
}
}, this);
return newPoint;
},
estimatedDistance: function(a, b) {
return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
},
actualDistance: function(a, b) {
return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}
};