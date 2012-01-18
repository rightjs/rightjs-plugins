/**
 * The Rails plugin initialization script
 *
 * Copyright (C) 2010-2012 Nikolay Nemshilov
 */

var R      = RightJS,
    $      = RightJS.$,
    $$     = RightJS.$$,
    $E     = RightJS.$E,
    Xhr    = RightJS.Xhr,
    Object = RightJS.Object,
    Input  = RightJS.Input;

RightJS.Rails = {
  version: '2.3.2'
};

include_module_files(
  'aliases',
  'ujs',
  'rr',
  'document'
);