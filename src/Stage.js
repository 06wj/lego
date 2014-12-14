/**
 * @class Stage 舞台类
 * @module lego/Stage
 * @requires lego
 * @requires lego/View
 * @extends View
 * @constructor Stage 
*/
var Stage = function(cfg){
	this.canvas = null;
	this.ctx = null;

	View.call(this, cfg);
	this._init();
};

lego.extend(Stage, View, {
	_lastTime:0,
	_init:function(){
		if(!this.canvas){
			this.canvas = document.createElement("canvas");
			document.body.appendChild(this.canvas);
		}
		this.ctx = this.canvas.getContext("2d");
		this.resize(this.width, this.height);
	},
	_tick:function(){
		var nowTime = +new Date();
		var ctx = this.ctx;
		ctx.clearRect(0, 0, this.width, this.height);
		ctx.moveTo(0, 200);
		ctx.lineTo(550, 200);
		ctx.moveTo(275, 200);
		ctx.lineTo(275, 0);
		ctx.stroke();
		this.render(ctx, nowTime - this._lastTime);
		this._lastTime = nowTime;
	},
	start:function(fps){
		var that = this;
		this.interval = setInterval(function(){
			that._tick();
		}, 1000/fps);
		this._lastTime = +new Date();
		that._tick();
	},
	stop:function(){
		clearInterval(this.interval);
	},
	resize:function(width, height){
		this.width = width;
		this.height = height;
		this.canvas.width = width;
		this.canvas.height = height;
	}
});












