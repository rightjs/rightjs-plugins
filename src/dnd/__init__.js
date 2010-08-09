/**
 * The DND module initialization script
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
var R        = RightJS,
    $        = RightJS.$,
    $w       = RightJS.$w,
    Class    = RightJS.Class,
    isHash   = RightJS.isHash,
    isArray  = RightJS.isArray,
    Element  = RightJS.Element,
    Observer = RightJS.Observer;

include_module_files(
  'draggable',
  'droppable',
  'document',
  'element'
);