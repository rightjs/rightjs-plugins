/**
 * The generic JSON interface
 *
 * Credits:
 *   Based on the original JSON escaping implementation
 *     http://www.json.org/json2.js
 *
 * @copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
var JSON = {
  encode: function(value) {
    var result;
    
    if (value === null) {
      result = 'null';
    } else if (value.toJSON) {
      result = value.toJSON();
    } else if (isHash(value)){
      result = [];
      for (var key in value) {
        result.push(key.toJSON()+":"+JSON.encode(value[key]));
      }
      result = '{'+result+'}';
    } else {
      throw "JSON can't encode: "+value;
    }
    
    return result;
  },
  
  // see the original JSON decoder implementation for descriptions http://www.json.org/json2.js
  cx: /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
  
  decode: function(string) {
    if (isString(string) && string) {
      // getting back the UTF-8 symbols
      string = string.replace(JSON.cx, function (a) {
        return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      });
      
      // checking the JSON string consistency
      if (/^[\],:{}\s]*$/.test(string.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, '')))

          return eval('('+string+')');
    }
    
    throw "JSON parse error: "+string;
  }
};