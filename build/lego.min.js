(function(window, undefined){
/**
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
/**
 * @class View
 * @requires lego
 * @param {Object} cfg
 * @param {Number} cfg.x
 * @param {Number} cfg.y
 * @param {Number} cfg.z
 * @param {Number} cfg.pivotX
 * @param {Number} cfg.pivotY
 * @param {Number} cfg.pivotZ
 * @param {Number} cfg.scaleX
 * @param {Number} cfg.scaleY
 * @param {Number} cfg.scaleZ
 * @param {Number} cfg.alpha
 * @param {Number} cfg.visible
 * @param {Number} cfg.parent
 * @param {Number} cfg.children
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
	 * @param {View} child
	*/
	addChild:function(child){
		child.parent = this;
	},
	/**
	 * @param {View} child
	*/
	removeChild:function(child){
		child.parent = null;
	},
	/**
	 * 
	*/
	removeFromParent:function(){
		var parent = this.parent;
		if(parent){
			parent.removeChild(this);
		}
	}

};
})(this);

(function(window, undefined){
var Stage = {};

window.Stage = Stage;
})(this);
