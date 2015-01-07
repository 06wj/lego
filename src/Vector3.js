/**
 * @module lego/Vector3
 * @namespace lego.Vector3
*/
var Vector3 = {
	/**
     * @memberOf lego.Vector3
     *
	*/
	create:function(x, y, z){
		return [x||0, y||0, z||0];
	},
	/**
     * @memberOf lego.Vector3
     *
	*/
	dot:function(v0, v1){
		return v0[0] * v1[0] + v0[1] * v1[1] + v0[2] * v1[2];
	},
	/**
     * @memberOf lego.Vector3
     *
	*/
	cross:function(v0, v1){
		return [
			v0[1]*v1[2] - v0[2]*v1[1],
			v0[2]*v1[0] - v0[0]*v1[2],
			v0[0]*v1[1] - v0[1]*v1[0]
		];
	},
	/**
     * @memberOf lego.Vector3
     *
	*/
	scale:function(v, scale){
		return [
			v[0] * scale,
			v[1] * scale,
			v[2] * scale
		];
	},
	/**
     * @memberOf lego.Vector3
     *
	*/
	plus:function(v0, v1){
		return [
			v0[0] + v1[0],
			v0[1] + v1[1],
			v0[2] + v1[2]
		];
	},
	/**
     * @memberOf lego.Vector3
     *
	*/
	minus:function(v0, v1){
		return [
			v0[0] - v1[0],
			v0[1] - v1[1],
			v0[2] - v1[2]
		];
	},
	/**
     * @memberOf lego.Vector3
     *
	*/
	normal:function(v){
		var scale = 1/v.getLength();
		return [
			v[0]*scale,
			v[1]*scale,
			v[2]*scale
		];
	},
	/**
     * @memberOf lego.Vector3
     *
	*/
	getLength:function(v){
		return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
	},
	/**
     * @memberOf lego.Vector3
     *
	*/
	getLengthSquared:function(v){
		return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
	},
	/**
     * @memberOf lego.Vector3
     *
	*/
	distance:function(v0, v1){
		return this.getLength(
			v0[0] - v1[0],
			v0[1] - v1[1],
			v0[2] - v1[2]
		);
	},
	/**
     * @memberOf lego.Vector3
     *
	*/
	distanceSquared:function(v0, v1){
		return this.getLengthSquared(
			v0[0] - v1[0],
			v0[1] - v1[1],
			v0[2] - v1[2]
		);
	},
	getAngle:func
};