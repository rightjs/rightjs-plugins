/**
 * The plugin initializtion script
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */

var R        = RightJS,
    $        = RightJS.$,
    $w       = RightJS.$w,
    $A       = RightJS.$A,
    Fx       = RightJS.Fx,
    Class    = RightJS.Class,
    Object   = RightJS.Object,
    Element  = RightJS.Element,
    defined  = RightJS.defined,
    isHash   = RightJS.isHash,
    isString = RightJS.isString;

RightJS.Effects = {
  version: '2.2.0'
};

include_module_files(
  'fx/move',
  'fx/zoom',
  'fx/bounce',
  'fx/run',
  'fx/puff',
  'fx/glow',
  'element'
);