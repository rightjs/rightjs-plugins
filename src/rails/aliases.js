/**
 * Underscored aliases for Ruby On Rails
 *
 * Copyright (C) 2009-2011 Nikolay Nemshilov
 */

// the language and window level aliases
R([
  RightJS.String.prototype,
  RightJS.Array.prototype,
  RightJS.Function.prototype,
  RightJS.Object,
  RightJS.Options,
  RightJS.Observer,
  RightJS.Observer.prototype,
  RightJS.Window.prototype,
  RightJS.Document.prototype
]).each(function(object) {
  for (var key in object) {
    try { // some keys are not accessable

      if (/[A-Z]/.test(key) && typeof(object[key]) === 'function') {
        var u_key = R(key).underscored();
        if (object[u_key] === null || object[u_key] === undefined) {
          object[u_key] = object[key];
        }
      }
    } catch (e) {}
  }
});


// DOM package aliases
R([
  RightJS.Element,
  RightJS.Event,
  RightJS.Form,
  RightJS.Input
]).each(function(object) {
  if (!object) { return; }

  var aliases = {}, methods = object.prototype;

  for (var key in methods) {
    if (/[A-Z]/.test(key) && typeof(methods[key]) === 'function') {
      object.prototype[R(key).underscored()] = methods[key];
    }
  }
});

// various ruby-like method aliases
RightJS.$alias(RightJS.String.prototype, {
  index_of:      'indexOf',
  last_index_of: 'lastIndexOf',
  to_f:          'toFloat',
  to_i:          'toInt',
  gsub:          'replace',
  downcase:      'toLowerCase',
  upcase:        'toUpperCase',
  index:         'indexOf',
  rindex:        'lastIndexOf',
  strip:         'trim'
});

RightJS.$alias(RightJS.Array.prototype, {
  collect:       'map',
  detect:        'filter',
  index_of:      'indexOf',
  last_index_of: 'lastIndexOf',
  index:         'indexOf',
  rindex:        'lastIndexOf'
});