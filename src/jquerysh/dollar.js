/**
 * jQuery-like '$' function behavior
 *
 * Copyright (C) 2010-2011 Nikolay Nemshilov
 */
var $ = function(something) {
  switch(typeof something) {
    case 'string':
      var hash = something[0], id = something.substr(1);

      if (hash === '#' && (/^[\w\-]+$/).test(id)) {
        return rjs_$(id);
      } else if (hash === '<') {
        return $E('div', {html: something}).first();
      } else {
        hash = $$(something);
        hash.cssRule = RightJS(something);
        return $ext(hash, RightJS.jQuerysh.collectionMethods);
      }

    case 'function':
      return rjs_$(document).onReady(something);

    default:
      return rjs_$(something);
  }
};