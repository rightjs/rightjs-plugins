/**
 * Hooks up all the tests
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
var tests = {
  
  EventTest:         'events/event',
  EventBaseTest:     'events/event/base',
  EventMouseTest:    'events/event/mouse',
  EventKeyboardTest: 'events/event/keyboard',
  
  
  StringTest:        'lang/string',
  
  
  JsonTest:          'json/json',
  
  BehaviorTest:      'behavior/behavior',
  
  RailsTest:         'rails/rails'
};

var test_names = [];

for (var key in tests) {
  test_names.push(key);
  document.writeln('<scr'+'ipt src="'+tests[key]+'_test.js"></scr'+'ipt>');
}

document.onReady(function() {
  eval('new TestSuite('+test_names.join(',')+').run()');
});