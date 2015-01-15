/**
 * @class Stage 舞台类
 * @module lego/Stage
 * @memberof lego
 * @requires lego
 * @requires lego/View
 * @property {Canvas} canvas
 * @property {CavansContext2d} ctx
 * @property {Number} _lastTime 上次执行时间
 * @extends lego.View
 * @constructor Stage
*/
var Stage = function(cfg){
	this.canvas = null;
	this.ctx = null;
	this._lastTime = 0;

	View.call(this, cfg);
	this._init();
};

lego.extend(Stage, View,
	/** @lends lego.Stage.prototype */
	{
	/**
     * @function
	*/
	_init:function(){
		if(!this.canvas){
			this.canvas = document.createElement("canvas");
			document.body.appendChild(this.canvas);
		}
		this.ctx = this.canvas.getContext("2d");
		this.resize(this.width, this.height);
	},
	/**
     * @function
	*/
	_tick:function _tick(){
		var nowTime = +new Date();
		var ctx = this.ctx;
		ctx.clearRect(0, 0, this.width, this.height);
		this.render(ctx, nowTime - this._lastTime);
		this._lastTime = nowTime;
	},
	/**
     * @function
	*/
	start:function(fps){
		var that = this;
		this.interval = setInterval(function(){
			that._tick();
		}, 1000/fps);
		this._lastTime = +new Date();
		that._tick();
	},
	/**
     * @function
	*/
	stop:function(){
		clearInterval(this.interval);
	},
	/**
     * @function
	*/
	resize:function(width, height){
		this.width = width;
		this.height = height;
		this.canvas.width = width;
		this.canvas.height = height;
	}
});












