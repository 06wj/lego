(function(window, undefined){
/**
 * @module lego 乐高
 * @namespace lego
 * @author 06wj
*/
var lego = {
	/**
	 * 继承
	 * @memberOf lego
	 * @name extends
	 * @param {Function} child 子类
	 * @param {Function} parent 父类
	 * @param {Object} cfg
	*/
	extend:function(child, parent, cfg){ 
		child.prototype = Object.create(parent.prototype);
		child.superClass = parent;
		if(cfg){
			this.merge(child.prototype, cfg);
		}
	},
	/**
	 * 合并
	 * @memberOf lego
	 * @name merge
	 * @param {Object} to 要合并的对象
	 * @param {Object} from 要合并的属性
	*/
	merge:function(to, from){
		for(var i in from){
			to[i] = from[i];
		}
	},
	to2d:function(obj){
    	var viewDistance = 1000;
    	var perspective = viewDistance / (viewDistance - obj.z);
       
        return {
        	x:275 + obj.x * perspective,
        	y:200 + obj.y * perspective
        }
	}
};
window.lego = lego;

})(this);

(function(window, undefined){
/**
 * @module lego/Vector3
 * @namespace lego.Vector3
*/
var Vector3 = {
	create:function(){
		return [0, 0, 0];
	}
};
lego.Vector3 = Vector3;

})(this);

(function(window, undefined){

var Vector3 = lego.Vector3;
var identityMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
/**
 * @namespace lego.Matrix4
 * @module lego/Matrix4
 * @requires lego/Vector3
 */
var Matrix4 = {
	create: function() {
		return identityMatrix.concat();
	},
	clone: function(mat) {
		return mat.concat();
	},
	setIdentity: function(mat) {
		this.set(mat, identityMatrix);
	},
	set: function(mat0, mat1) {
		for (var i = 0; i < 16; i++) {
			mat0[i] = mat1[i];
		}
	},
	concat: function(mat0, mat1) {
		var i, e, a, b, ai0, ai1, ai2, ai3;

		e = mat0;
		a = mat0;
		b = mat1;

		if (e === b) {
			b = this.clone(e);
		}

		for (i = 0; i < 4; i++) {
			ai0 = a[i];
			ai1 = a[i + 4];
			ai2 = a[i + 8];
			ai3 = a[i + 12];
			e[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
			e[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
			e[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
			e[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
		}
	},
	multiplyVector3: function(mat, vec) {
		var result = Vector3.create();

		result[0] = vec[0] * mat[0] + vec[1] * mat[4] + vec[2] * mat[8] + mat[12];
		result[1] = vec[0] * mat[1] + vec[1] * mat[5] + vec[2] * mat[9] + mat[13];
		result[2] = vec[0] * mat[2] + vec[1] * mat[6] + vec[2] * mat[10] + mat[14];

		return result;
	},
	transpose: function(mat) {
		var t;
		t = mat[1];
		mat[1] = mat[4];
		mat[4] = t;
		t = mat[2];
		mat[2] = mat[8];
		mat[8] = t;
		t = mat[3];
		mat[3] = mat[12];
		mat[12] = t;
		t = mat[6];
		mat[6] = mat[9];
		mat[9] = t;
		t = mat[7];
		mat[7] = mat[13];
		mat[13] = t;
		t = mat[11];
		mat[11] = mat[14];
		mat[14] = t;
	},
	setScale:function(mat, x, y, z) {
		mat[0] = x;
		mat[4] = 0;
		mat[8] = 0;
		mat[12] = 0;
		mat[1] = 0;
		mat[5] = y;
		mat[9] = 0;
		mat[13] = 0;
		mat[2] = 0;
		mat[6] = 0;
		mat[10] = z;
		mat[14] = 0;
		mat[3] = 0;
		mat[7] = 0;
		mat[11] = 0;
		mat[15] = 1;
	},
	scale:function(mat, x, y, z) {
		mat[0] *= x;
		mat[4] *= y;
		mat[8] *= z;
		mat[1] *= x;
		mat[5] *= y;
		mat[9] *= z;
		mat[2] *= x;
		mat[6] *= y;
		mat[10] *= z;
		mat[3] *= x;
		mat[7] *= y;
		mat[11] *= z;
	},
	setTranslate: function(mat, x, y, z) {
		mat[0] = 1;
		mat[4] = 0;
		mat[8] = 0;
		mat[12] = x;
		mat[1] = 0;
		mat[5] = 1;
		mat[9] = 0;
		mat[13] = y;
		mat[2] = 0;
		mat[6] = 0;
		mat[10] = 1;
		mat[14] = z;
		mat[3] = 0;
		mat[7] = 0;
		mat[11] = 0;
		mat[15] = 1;
	},
	translate: function(mat, x, y, z) {
		mat[12] += mat[0] * x + mat[4] * y + mat[8] * z;
		mat[13] += mat[1] * x + mat[5] * y + mat[9] * z;
		mat[14] += mat[2] * x + mat[6] * y + mat[10] * z;
		mat[15] += mat[3] * x + mat[7] * y + mat[11] * z;
	},
	setRotate: function(mat, angle, x, y, z) {
		var e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;

		angle = Math.PI * angle / 180;

		s = Math.sin(angle);
		c = Math.cos(angle);

		if (0 !== x && 0 === y && 0 === z){
			// Rotation around X axis
			if (x < 0) {
				s = -s;
			}
			mat[0] = 1;
			mat[4] = 0;
			mat[8] = 0;
			mat[12] = 0;
			mat[1] = 0;
			mat[5] = c;
			mat[9] = -s;
			mat[13] = 0;
			mat[2] = 0;
			mat[6] = s;
			mat[10] = c;
			mat[14] = 0;
			mat[3] = 0;
			mat[7] = 0;
			mat[11] = 0;
			mat[15] = 1;
		} 
		else if (0 === x && 0 !== y && 0 === z){
			// Rotation around Y axis
			if (y < 0) {
				s = -s;
			}
			mat[0] = c;
			mat[4] = 0;
			mat[8] = s;
			mat[12] = 0;
			mat[1] = 0;
			mat[5] = 1;
			mat[9] = 0;
			mat[13] = 0;
			mat[2] = -s;
			mat[6] = 0;
			mat[10] = c;
			mat[14] = 0;
			mat[3] = 0;
			mat[7] = 0;
			mat[11] = 0;
			mat[15] = 1;
		} 
		else if (0 === x && 0 === y && 0 !== z){
			// Rotation around Z axis
			if (z < 0){
				s = -s;
			}
			mat[0] = c;
			mat[4] = -s;
			mat[8] = 0;
			mat[12] = 0;
			mat[1] = s;
			mat[5] = c;
			mat[9] = 0;
			mat[13] = 0;
			mat[2] = 0;
			mat[6] = 0;
			mat[10] = 1;
			mat[14] = 0;
			mat[3] = 0;
			mat[7] = 0;
			mat[11] = 0;
			mat[15] = 1;
		} 
		else {
			// Rotation around another axis
			len = Math.sqrt(x * x + y * y + z * z);
			if (len !== 1) {
				rlen = 1 / len;
				x *= rlen;
				y *= rlen;
				z *= rlen;
			}
			nc = 1 - c;
			xy = x * y;
			yz = y * z;
			zx = z * x;
			xs = x * s;
			ys = y * s;
			zs = z * s;

			mat[0] = x * x * nc + c;
			mat[1] = xy * nc + zs;
			mat[2] = zx * nc - ys;
			mat[3] = 0;

			mat[4] = xy * nc - zs;
			mat[5] = y * y * nc + c;
			mat[6] = yz * nc + xs;
			mat[7] = 0;

			mat[8] = zx * nc + ys;
			mat[9] = yz * nc - xs;
			mat[10] = z * z * nc + c;
			mat[11] = 0;

			mat[12] = 0;
			mat[13] = 0;
			mat[14] = 0;
			mat[15] = 1;
		}
	},
	rotate: function(mat, angle, x, y, z) {
		var m = this.create();
		this.setRotate(m, angle, x, y, z);
		this.concat(mat, m);
	}
};
lego.Matrix4 = Matrix4;

})(this);

(function(window, undefined){

var lego = window.lego;

var Matrix4 = lego.Matrix4;

var Vector3 = lego.Vector3;
/** 
 * @class View 渲染基类
 * @module lego/View
 * @requires lego
 * @requires lego/Matrix4
 * @requires lego/Vector3
 * @property {Number} x x坐标
 * @property {Number} y y坐标
 * @property {Number} z z坐标
 * @property {Number} pivotX x中心点
 * @property {Number} pivotY y中心点
 * @property {Number} pivotZ z中心点
 * @property {Number} rotationX 绕x轴旋转
 * @property {Number} rotationY 绕y轴旋转
 * @property {Number} rotationZ 绕z轴旋转
 * @property {Number} scaleX x缩放
 * @property {Number} scaleY y缩放
 * @property {Number} scaleZ z缩放
 * @property {Number} alpha 透明度 0~1
 * @property {Boolean} visible 是否显示
 * @property {View} parent 父容器
 * @property {View} children 子容器
 * @constructor View 
 * @param {Object} cfg 传入属性
*/
var View = function(cfg){
	this.x = 0;
	this.y = 0;
	this.z = 0;

	this.pivotX = 0;
	this.pivotY = 0;
	this.pivotZ = 0;

	this.scaleX = 1;
	this.scaleY = 1;
	this.scaleZ = 1;

	this.rotationX = 0;
	this.rotationY = 0;
	this.rotationZ = 0;

	this.mat = Matrix4.create();

	this.alpha = 1;
	this.visible = true;
	this.parent = null;
	this.children = [];

	lego.merge(this, cfg);
};

lego.merge(View.prototype, {
	/**
	 * 添加对象
	 * @param {View} child
	*/
	addChild:function(child){
		child.removeFromParent();
		if(this.children.indexOf(child) < 0){
			this.children.push(child);
			child.parent = this;
		}
	},
	/**
	 * 移除对象
	 * @param {View} child
	*/
	removeChild:function(child){
		var index = this.children.indexOf(child);
		if(index > -1){
			child.parent = null;
			this.children.splice(index, 1);
		}
	},
	/**
	 * 从父容器中移除
	*/
	removeFromParent:function(){
		var parent = this.parent;
		if(parent){
			parent.removeChild(this);
		}
	},
	/*
	 * 渲染
	 * @param {Number} ctx 绘图上下文
	 * @param {Number} dt 时间间隔
	**/
	render:function(ctx, dt){
		var children = this.children;
		this.onUpdate && this.onUpdate(dt);

		for(var i = 0, l = children.length;i < l;i ++){
			var child = children[i];
			child.render(ctx, dt);
		}

		ctx.save();
		this._transform(ctx);
		this._draw(ctx);
		ctx.restore();
	},
	getVector:function(){
		var finalMat = Matrix4.create();
		var parent = this.parent;
		while(parent){
			var mat = Matrix4.create();
			// mat[13] -= parent.pivotY;
			// mat[12] -= parent.pivotX;
			Matrix4.translate(mat, parent.x, parent.y, parent.z);
			Matrix4.rotate(mat, parent.rotationY, 0, 1, 0);
			Matrix4.rotate(mat, parent.rotationX, 1, 0, 0);
			Matrix4.rotate(mat, parent.rotationZ, 0, 0, 1);
			Matrix4.scale(mat, parent.scaleX, parent.scaleY, parent.scaleZ);
			Matrix4.translate(mat, -parent.pivotX, -parent.pivotY, parent.z);


			Matrix4.concat(finalMat, mat);

			parent = parent.parent;
		}

		window.finalMat = finalMat;
		return Matrix4.multiplyVector3(finalMat, [this.x, this.y, this.z]);
	},
	_transform:function(ctx){
		var vec = this.getVector();
		var pos = lego.to2d({
			x:vec[0],
			y:vec[1],
			z:vec[2]
		});
		this._pos = pos;
	},
	/**
     * 子类自己实现渲染方法
	*/
	_draw:function(ctx){

	}
});
lego.View = View;

})(this);

(function(window, undefined){

var lego = window.lego;

var View = lego.View;
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













lego.Stage = Stage;

})(this);

(function(window, undefined){

var lego = window.lego;

var View = lego.View;
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
				var r = 10;
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
			ctx.lineTo(this.views[i]._pos.x - offset.x, this.views[i]._pos.y - offset.y);
		}
		ctx.lineTo(this.views[0]._pos.x - offset.x, this.views[0]._pos.y - offset.y);
		ctx.stroke();
	}
});
lego.Group = Group;

})(this);
