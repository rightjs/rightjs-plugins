/**
 * Wraps up the Cooke set/get methods so that the values
 * were automatically exported/imported into JSON strings
 * and it allowed transparent objects and arrays saving
 *
 * @copyright (C) 2009-2010 Nikolay V. Nemshilov
 */

if (RightJS.Cookie) {
  var old_set = RightJS.Cookie.prototype.set,
      old_get = RightJS.Cookie.prototype.get;

  RightJS.Cookie.include({
    set: function(value) {
      return old_set.call(this, JSON.stringify(value));
    },

    get: function() {
      return JSON.parse(old_get.call(this) || 'null');
    }
  });
}
