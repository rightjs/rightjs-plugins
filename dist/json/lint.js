/**
 * JSLint check
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
load('util/test/jslint.js')
load('util/test/rightly_check.js')

rightly_check('build/right-json-src.js', [
  "Redefinition of 'JSON'."
]);
