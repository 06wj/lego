/**
 * @class Group 集合
 * @module lego/Group
 * @memberof lego
 * @requires lego
 * @requires lego/View
 * @property {Array} points 
 * @property {lego.View} views 
 * @property {Number} pointSize 点大小 默认为0 
 * @property {Number} lineWidth 线宽 默认为1
 * @extends lego.View
 * @constructor Group
*/
var Group = function(cfg){
	this.points = [];
	this.views = [];
	this.pointSize = 0;
	this.lineWidth = 1;
	View.call(this, cfg);

	this.init();
};
lego.extend(Group, View, 
	{
		
	init:function(){
		var that = this;
		for(var i = 0, l = this.points.length;i < l;i ++){
			var v = new View(this.points[i]);
			this.views.push(v);
			this.addChild(v);
			if(that.pointSize){
				v._draw = function(ctx){
					var r = that.pointSize;
					ctx.beginPath();
					ctx.arc(this._pos.x, this._pos.y, r, 0, Math.PI*2);
					ctx.stroke();
				}
			}
		}
	},
	_render:function(ctx){
		
	},
	_draw:function(ctx){
		ctx.beginPath();
		var offset = {
			x:0,
			y:0
		};
		ctx.moveTo(this.views[0]._pos.x - offset.x, this.views[0]._pos.y - offset.y);
		for(var i = 1, l = this.views.length;i < l;i ++){
			var v = this.views[i];
			if(v.move){
				ctx.moveTo(v._pos.x - offset.x, v._pos.y - offset.y);
			}
			else{
				ctx.lineTo(v._pos.x - offset.x, v._pos.y - offset.y);
			}
		}
		ctx.lineTo(this.views[0]._pos.x - offset.x, this.views[0]._pos.y - offset.y);
		ctx.lineWidth = this.lineWidth;
		ctx.stroke();
	}
});