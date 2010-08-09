/**
 * Element level hooks for drag'n'drops
 *
 * Copyright (C) 2009-2010 Nikolay Nemshilov
 */
Element.include({
  
  makeDraggable: function(options) {
    new Draggable(this, options);
    return this;
  },
  
  undoDraggable: function() {
    if ('draggable' in this) {
      this.draggable.destroy();
    }
    
    return this;
  },
  
  makeDroppable: function(options) {
    new Droppable(this, options);
    return this;
  },
  
  undoDroppable: function() {
    if ('droppable' in this) {
      this.droppable.destroy();
    }
    
    return this;
  }
  
});