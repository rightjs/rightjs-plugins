/**
 * Dates to JSON convertion
 *
 * Credits:
 *   Based on the original JSON escaping implementation
 *     http://www.json.org/json2.js
 *
 * @copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
(function(Date_proto) {
  var z = function(num) {
    return (num < 10 ? '0' : '')+num;
  };
  
  
  Date_proto.toJSON = function() {
    return this.getUTCFullYear() + '-' +
      z(this.getUTCMonth() + 1)  + '-' +
      z(this.getUTCDate())       + 'T' +
      z(this.getUTCHours())      + ':' +
      z(this.getUTCMinutes())    + ':' +
      z(this.getUTCSeconds())    + 'Z';
  };
  
})(Date.prototype);