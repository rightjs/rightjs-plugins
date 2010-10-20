/**
 * Document level hooks for the table plugin
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
$(document).onClick(function(event) {
  var th = event.find('th.sortable');

  if (th) {
    th.parent('table').sort(th);
  }
});