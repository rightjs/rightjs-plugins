/**
 * Droppable unit
 *
 * Copyright (C) Nikolay V. Nemshilov aka St.
 */
var Droppable = new Class(Observer, {
  extend: {
    EVENTS: $w('drop hover leave'),
    
    Options: {
      accept:     '*',
      
      allowClass: 'droppable-allow',
      denyClass:  'droppable-deny'
    }
  },
  
  initialize: function(element, options) {
    this.$super(options);
    this.element = $(element);
  }
});