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