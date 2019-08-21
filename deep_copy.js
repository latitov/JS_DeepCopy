function deep_copy() {
	'use strict';	// required for undef test of 'this' below

	// Copyright (c) 2019, Leonid Titov, Mentions Highly Appreciated.

	var id_cnt = 1;
	var all_old_objects = {};
	var all_new_objects = {};
	var root_obj = this;
	
	if (root_obj === undefined) {
		console.log(`deep_copy() error: wrong call context`);
		return;
	}

	var new_obj = copy_obj(root_obj);
	
	for (var id in all_old_objects) {
		delete all_old_objects[id].__temp_id;
	}
	
	return new_obj;
	//

	function copy_obj(o) {
		var new_obj = {};
		if (o.__temp_id === undefined) {
			o.__temp_id = id_cnt;
			all_old_objects[id_cnt] = o;
			all_new_objects[id_cnt] = new_obj;
			id_cnt ++;

			for (var prop in o) {
				if (o[prop] instanceof Array) {
					new_obj[prop] = copy_array(o[prop]);
				}
				else if (o[prop] instanceof Object) {
					new_obj[prop] = copy_obj(o[prop]);
				}
				else if (prop === '__temp_id') {
					continue;
				}
				else {
					new_obj[prop] = o[prop];
				}
			}
		}
		else {
			new_obj = all_new_objects[o.__temp_id];
		}
		return new_obj;
	}
	function copy_array(a) {
		var new_array = [];
		if (a.__temp_id === undefined) {
			a.__temp_id = id_cnt;
			all_old_objects[id_cnt] = a;
			all_new_objects[id_cnt] = new_array;
			id_cnt ++;

			a.forEach((v,i) => {
				if (v instanceof Array) {
					new_array[i] = copy_array(v);
				}
				else if (v instanceof Object) {
					new_array[i] = copy_object(v);
				}
				else {
					new_array[i] = v;
				}
			});
		}
		else {
			new_array = all_new_objects[a.__temp_id];
		}
		return new_array;
	}
}

