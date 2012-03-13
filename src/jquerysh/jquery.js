/**
 * jQuery core methods emulation
 *
 * Copyright (C) 2011 Nikolay Nemshilov
 */
$ext($, {

  browser: {
    webkit:  Browser.WebKit,
    opera:   Browser.Opera,
    msie:    Browser.IE,
    mozilla: Browser.Gecko
  },

// Type checks

  isFunction: function(value) {
    return RightJS.isFunction(value);
  },

  isArray: function(value) {
    return RightJS.isArray(value);
  },

  isPlainObject: function(value) {
    return RightJS.isHash(value);
  },

  isEmptyObject: function(value) {
    return Object.empty(value);
  },

  globalEval: function(script) {
    return RightJS.$eval(script);
  },

// Array stuff

  makeArray: function(value) {
    return $A(value);
  },

  each: function(list, callback) {
    return $A(list, function(item, index) {
      callback(index, item);
    });
  },

  map: function(callback) {
    return $A(value).map(callback);
  },

  unique: function(array) {
    return $A(array).uniq();
  },

  merge: function(first, second) {
    return $A(first).merge(second);
  },


// the rest of the things

  extend: function() {
    return Object.merge.apply(Object, arguments);
  },

  proxy: function(func, context) {
    return RightJS(func).bind(context);
  },

  noop: function() {
    return RightJS(function() {});
  },

  noConflict: function( deep ) {
    if ( window.$ === jQuery ) {
      window.$ = _$;
    }

    if ( deep && window.jQuery === jQuery ) {
      window.jQuery = _jQuery;
    }

    return $;
  }

});