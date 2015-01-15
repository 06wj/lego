/**
 * lego 工具类
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
