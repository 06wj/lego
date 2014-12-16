/**
 * @class Group 渲染基类
 * @module lego/Group
 * @requires lego
 * @requires lego/View
*/
var Group = function(cfg){
	this.points = [];
	this.views = [];
	View.call(this, cfg);

	this.init();
};
lego.extend(Group, View, {
	init:function(){
		for(var i = 0, l = this.points.length;i < l;i ++){
			var v = new View(this.points[i]);
			this.views.push(v);
			this.addChild(v);
			v._draw = function(ctx){
				var r = 2;
				ctx.beginPath();
				ctx.arc(this._pos.x, this._pos.y, r, 0, Math.PI*2);
				ctx.stroke();
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
		ctx.stroke();
	}
});