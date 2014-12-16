/**
 * @class Cube 立方体
 * @module lego/Cube
 * @memberof lego
 * @requires lego
 * @requires lego/Group
 * @property {Number} w 宽
 * @property {Number} h 高
 * @property {Number} l 长
 * @extends lego.Group
 * @constructor Cube 
*/
var Cube = function(cfg){
	this.w = 0;
	this.h = 0;
	this.l = 0;
	Group.call(this, cfg);
};

lego.extend(Cube, Group, {
	init:function(){
		var w = this.w;
		var h = this.h;
		var l = this.l;

		this.points = [
			{x:0, y:0, z:0},
			{x:w, y:0, z:0},
			{x:w, y:h, z:0},
			{x:0, y:h, z:0},

			{x:0, y:0, z:0},
			{x:0, y:0, z:l},
			{x:0, y:h, z:l},
			{x:0, y:h, z:0},

			{x:w, y:0, z:0, move:1},
			{x:w, y:0, z:l},
			{x:w, y:h, z:l},
			{x:w, y:h, z:0},

			{x:0, y:0, z:l, move:1},
			{x:w, y:0, z:l},

			{x:0, y:h, z:l, move:1},
			{x:w, y:h, z:l},

			{x:0, y:0, z:0, move:1}
		];
		Group.prototype.init.call(this);
	}
});