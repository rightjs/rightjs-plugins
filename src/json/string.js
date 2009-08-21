/**
 * String to JSON export
 *
 * Credits:
 *   Based on the original JSON escaping implementation
 *     http://www.json.org/json2.js
 *
 * @copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
(function(String_proto) {
  var specials = {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\'},
  quotables = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  
  // quotes the string
  function quote(string) {
    return string.replace(quotables, function(chr) {
      return specials[chr] || '\\u' + ('0000' + chr.charCodeAt(0).toString(16)).slice(-4);
    });
  };
  
  String_proto.toJSON = function() {
    return '"'+ quote(this) + '"';
  }
  
})(String.prototype);