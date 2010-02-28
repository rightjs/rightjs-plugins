/**
 * Underscored aliases for Ruby On Rails
 *
 * Copyright (C) 2009-2010 Nikolay V. Nemshilov
 */

// the language and window level aliases
[String.prototype, Array.prototype, Function.prototype, Object, Options, Observer, Observer.prototype, window, document].each(function(object) {
  for (var key in object) {
    try { // some keys are not accessable
      
      if (/[A-Z]/.test(key) && typeof(object[key]) === 'function') {
        var u_key = key.underscored();
        if (object[u_key] === null || object[u_key] === undefined) {
          object[u_key] = object[key];
        }
      }
    } catch (e) {}
  }
});


// DOM package aliases
[Element, Event, Form, Form.Element].each(function(object) {
  var aliases = {}, methods = object.Methods;
    
  for (var key in methods) {
    if (/[A-Z]/.test(key) && typeof(methods[key]) === 'function') {
      aliases[key.underscored()] = methods[key];
    }
  }
  
  object.include(aliases);
});


// various ruby-like method aliases
$alias(String.prototype, {
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

$alias(Array.prototype, {
  collect:       'map',
  detect:        'filter',
  index_of:      'indexOf',
  last_index_of: 'lastIndexOf',
  index:         'indexOf',
  rindex:        'lastIndexOf'
});