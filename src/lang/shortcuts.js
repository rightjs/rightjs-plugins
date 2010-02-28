/**
 * Additional language unit shortcuts
 *
 * Copyright (C) 2009-2010 Nikolay V. Nemshilov
 */
function $H(object) {
  return new Hash(object);
};

function $R(start, end, step) {
  return new NumRange(start, end, step);
};