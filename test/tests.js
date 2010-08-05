/**
 * Hooks up all the tests
 *
 * Copyright (C) 2008-2010 Nikolay Nemshilov
 */
var tests = {
  StringTest:        'lang/string',
  JsonTest:          'json/json',
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