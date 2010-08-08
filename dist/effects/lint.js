/**
 * Additional FX module JSLint check
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
load('util/test/rightly_check.js');

rightly_check('build/right-effects-src.js', [
  "Expected a 'break' statement before 'case'."
]);