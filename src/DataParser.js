/**
 * 解析3d obj文件
 * @module lego/DataParser 
 * @namespace lego.DataParser
 * @requires lego
 * @requires lego/Group
*/
var DataParser = {
	/**
     * @memberOf lego.DataParser
     * @param {String} url 加载obj文件网址
     * @param {Function} callback
     * @param {lego.Group} callback.group 返回根据obj文件生成的group
	*/
	load:function(url, callback){
		var that = this;
		var xhr = new XMLHttpRequest;
		xhr.open("GET",url,true);
		xhr.onreadystatechange = function(e){
			if(xhr.readyState == 4 && xhr.status == 200){
				callback(that.parse(xhr.response));
			}
		};
		xhr.send();
	},
	/**
     * @memberOf lego.DataParser
     * @param {String} str obj文件文本内容
     * @returns {lego.Group} group 返回根据obj文件生成的group
	*/
	parse:function(str){
		var points = [];
		var vArr = str.match(/[\r\n](v\s[\S\s]+?)\send\s/g);

		vArr.forEach(function(v){
			var isSurface = v.indexOf("surf ") > -1;
			v = v.replace(/cstype[\s\S]+end\s/, '').replace(/^\s/, "").replace(/v\s/g, "[").replace(/[\r\n]+/g, "],").replace(/[\s]/g, ",");

			v = "[" + v.slice(0, -1) + "]";
			v = JSON.parse(v);
			if(isSurface){
				var last = v[3];
				v[3] = v[2];
				v[2] = last;
			}
			points.push(v);
		});
		
		var res = [];
		for(var i = 0, l = points.length;i < l;i ++){
			var ps = points[i];
			for(var j = 0, jl = ps.length;j < jl;j++){
				var p = {
					x:ps[j][0],
					y:ps[j][1],
					z:ps[j][2],
				};
				res.push(p);

				if(j == 0){
					p.move = 1;
				}

				if(j == jl-1){
					res.push({
						x:ps[0][0],
						y:ps[0][1],
						z:ps[0][2],
					})
				}
			}
		}
		res.push(res[0]);

		return new Group({
			points:res
		});
	}
};