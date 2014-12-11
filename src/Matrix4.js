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

		result[0] = vec[0] * mat[0] + vec[1] * mat[4] + vec[2] * mat[8] + mat[11];
		result[1] = vec[0] * mat[1] + vec[1] * mat[5] + vec[2] * mat[9] + mat[12];
		result[2] = vec[0] * mat[2] + vec[1] * mat[6] + vec[2] * mat[10] + mat[13];

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
		var m = this().create();
		this.setRotate(angle, x, y, z);
		this.concat(mat, m);
	}
};