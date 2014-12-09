(function(window, undefined){
/**
 * @module lego 
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
	 * @param {Object} cfg 扩展的原型方法
	*/
	extend:function(child, parent, cfg){
		child.prototype = Object.create(parent.prototype, cfg);
		child.superClass = parent;
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
	}
};
window.lego = lego;

})(this);

(function(window, undefined){

var lego = window.lego;
/** 
 * @class View 渲染基类
 * @module lego/View
 * @requires lego
 * @property {Number} x x坐标
 * @property {Number} y y坐标
 * @property {Number} z z坐标
 * @property {Number} pivotX x中心点
 * @property {Number} pivotY y中心点
 * @property {Number} pivotZ z中心点
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

	this.alpha = 1;
	this.visible = true;
	this.parent = null;
	this.children = [];

	lego.merge(this, cfg);
};

View.prototype = {
	constructor:View,
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
	 * @param {Number} dt 时间间隔
	**/
	render:function(dt){
		var children = this.children;
		this.onUpdate && this.onUpdate(dt);
		this._render();

		for(var i = 0, l = children.length;i < l;i ++){
			var child = children[i];
			child.render(dt);
		}
	},
	/**
     * 子类自己实现渲染方法
	*/
	_render:function(){

	}
};
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
	lego.merge(this, cfg);
};
lego.Stage = Stage;

})(this);
