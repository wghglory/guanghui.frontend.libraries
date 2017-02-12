/**
 * get querystring value by key
 * @method getQueryString
 * @param  {[string]}       key
 * @param  {[string]}       url
 * @return {[string]}       value
 * usage:
 * 			// file:///C:/Users/xu98826/Desktop/1.html?name=guanghui
			  console.log(getQueryString('name'));
 */
function getQueryString(key, url) {
		var href = url ? url : window.location.href;
		var reg = new RegExp('[?&]' + key + '=([^&#]*)', 'i');
		var value = reg.exec(href); //["?name=guanghui", "guanghui"]
		return value ? value[1] : null;
}
