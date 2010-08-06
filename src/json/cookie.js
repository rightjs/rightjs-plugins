/**
 * Wraps up the Cooke set/get methods so that the values
 * were automatically exported/imported into JSON strings
 * and it allowed transparent objects and arrays saving
 *
 * @copyright (C) 2009-2010 Nikolay V. Nemshilov
 */

if (RightJS.Cookie) {
  (function(Cookie_prototype) {
    var old_set = Cookie_prototype.set,
        old_get = Cookie_prototype.get;
        
    $ext(Cookie_prototype, {
      set: function(value) {
        return old_set.call(this, JSON.stringify(value));
      },
      
      get: function() {
        return JSON.parse(old_get.call(this));
      }
    });
  })(RightJS.Cookie.prototype);
}
