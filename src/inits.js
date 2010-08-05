/**
 * Hooks up all the scripts
 *
 * Copyright (C) 2008-2010 Nikolay V. Nemshilov
 */

function include_js(name) {
  document.writeln('<scr'+'ipt src="'+ RIGHTJS_GOODS_ROOT + name +'.js"></scr'+'ipt>');
}

include_js('util/right');
include_js('util/testcase');

var files = {
  effects: [
    'fx/move',
    'fx/zoom',
    'fx/bounce',
    'fx/run',
    'fx/puff',
    'fx/css',
    'element'
  ],
  
  lang: [
    'hash',
    'num_range',
    'string',
    'shortcuts'
  ],
  
  json: [
    'json',
    'cookie',
    'xhr'
  ],
  
  dnd: [
    'draggable',
    'droppable',
    'document',
    'element'
  ],
  
  rails: [
    'rr',
    'ujs',
    'document',
    'aliases'
  ]
};

for (var pack in files) {
  for (var i=0; i < files[pack].length; i++) {
    include_js('src/'+pack+'/'+files[pack][i]);
  };  
};

