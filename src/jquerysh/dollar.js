/**
 * jQuery-like '$' function behavior
 *
 * Copyright (C) 2010-2011 Nikolay Nemshilov
 */
window.$ = function(something) {
  switch(typeof something) {
    case 'string':
        var hash = something[0], id = something.substr(1);
        something = (hash === '#' && (/^[\w\-]+$/).test(id)) ?
          RightJS.$(id) : RightJS.$$(something);
      break;

    case 'function':
      RightJS.$(document).onReady(something);
      break;

    default:
      something = RightJS.$(something);
      break;
  }

  return something;
};