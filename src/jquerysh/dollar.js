/**
 * jQuery-like '$' function behavior
 *
 * Copyright (C) 2010-2011 Nikolay Nemshilov
 */
window.$ = function(something) {
  switch(typeof something) {
    case 'string':
        var hash = something[0], id = something.substr(1);
        if (hash === '#' && (/^[\w\-]+$/).test(id)) {
          something = RightJS.$(id);
        } else if (hash === '<') {
          something = RightJS.$E('div', {html: something}).first();
        } else {
          something = RightJS.$$(something);
        }
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