/**
 * Hooks up all the scripts
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */

function include_js(name) {
  document.writeln('<scr'+'ipt src="'+ RIGHTJS_GOODS_ROOT + name +'.js"></scr'+'ipt>');
}

include_js('lib/right');
include_js('lib/testcase');

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
  
  events: [
    'event',
    'event/base',
    'event/mouse',
    'event/keyboard',
    'element'
  ],
  
  lang: [
    'hash',
    'num_range',
    'string',
    'shortcuts'
  ],
  
  json: [
    'string',
    'date',
    'number',
    'boolean',
    'array',
    'hash',
    'json',
    'cookie',
    'xhr'
  ],
  
  behavior: [
    'behavior',
    'element',
    'string'
  ],
  
  dnd: [
    'draggable',
    'droppable',
    'document',
    'element'
  ],
  
  rails: [
    'rr',
    'document',
    'aliases'
  ]
};

for (var pack in files) {
  for (var i=0; i < files[pack].length; i++) {
    include_js('src/'+pack+'/'+files[pack][i]);
  };  
};

