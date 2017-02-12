// native js typeof is not enough to determine the type, such as array
// jquery type method uses below method:
console.log({}.toString.call([]) == '[object Array]');
console.log({}.toString.call(new Date())); //[object Date]

// jquery type function:
function getType(obj) {

    var class2type = [];
    /*[ '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regexp',
    '[object Object]': 'object',
    '[object Error]': 'error' ]*/
    var keywords = "Boolean Number String Function Array Date RegExp Object Error".split(' ');
    for (var i = 0; i < keywords.length; i++) {
        class2type['[object ' + keywords[i] + ']'] = keywords[i].toLowerCase();
    }

    if (obj == null) {
        return String(obj); //undefined or null => "undefined"/"null"
    }
    if (typeof obj === 'object' || typeof obj == 'function') {
        // return {}.toString.call(obj) || 'object';
        return class2type[{}.toString.call(obj)] || 'object';
    } else {
        return typeof obj;
    }
}
console.log(getType([]));   //array
