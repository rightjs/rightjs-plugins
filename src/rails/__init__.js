/**
 * The Rails plugin initialization script
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */

var R      = RightJS,
    $      = RightJS.$,
    $$     = RightJS.$$,
    $E     = RightJS.$E,
    Xhr    = RightJS.Xhr,
    Object = RightJS.Object;

include_module_files(
  'aliases',
  'ujs',
  'rr',
  'document'
);