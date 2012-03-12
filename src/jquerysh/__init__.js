/**
 * jquerysh initialization script
 *
 * Copyright (C) 2010-2011 Nikolay Nemshilov
 */
var _jQuery = window.jQuery,
    _$      = window.$,
    rjs_$   = RightJS.$,
    $$      = RightJS.$$,
    $E      = RightJS.$E,
    $A      = RightJS.$A,
    $ext    = RightJS.$ext,
    Xhr     = RightJS.Xhr,
    Browser = RightJS.Browser,
    Object  = RightJS.Object;


include_module_files(
  'jquerysh',
  'dollar',
  'jquery',
  'element',
  'ajax'
);