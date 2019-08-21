function deep_print(object) {
	// Copyright (c) 2019, Leonid Titov, Mentions Highly Appreciated.

	var level = 1;
	var id_cnt = 1;
	var all_old_objects = {};

	print_obj(object);
	
	for (var id in all_old_objects) {
		delete all_old_objects[id].__temp_prn_id;
	}
	
	return;
	//

	function print_obj(o) {
		if (o.__temp_prn_id === undefined) {
			o.__temp_prn_id = id_cnt;
			all_old_objects[id_cnt] = o;
			id_cnt ++;

			for (var prop in o) {
				pr_lev(prop);
				level ++;
				if (o[prop] instanceof Array) {
					print_array(o[prop]);
				}
				else if (o[prop] instanceof Object) {
					print_obj(o[prop]);
				}
				else {
					pr_lev(o[prop]);
				}
				level --;
			}
		}
		else {
			pr_lev(`recursive link to id=${o.__temp_prn_id}`);
		}
	}
	function print_array(a) {
		if (a.__temp_prn_id === undefined) {
			a.__temp_prn_id = id_cnt;
			all_old_objects[id_cnt] = a;
			id_cnt ++;

			pr_lev(`array, id=${id_cnt - 1}:`);
			level ++;
			a.forEach( v => {
				if (v instanceof Array) {
					print_array(v);
				}
				else if (v instanceof Object) {
					print_object(v);
				}
				else {
					pr_lev(v);
				}
			});
			level --;
		}
		else {
			pr_lev(`recursive link to id=${a.__temp_prn_id}`);
		}
	}
	function pr_lev (text) {
		var lev = level;
		for (; lev > 0; lev--) {
			printarea.innerHTML += "\t";
		}
		printarea.innerHTML += text + "\n";
	}
}
