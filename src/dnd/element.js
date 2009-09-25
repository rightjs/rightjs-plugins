/**
 * Element level hooks for drag'n'drops
 *
 * Copyright (C) Nikolay V. Nemshilov aka St.
 */
Element.addMethods({
  
  makeDraggable: function(options) {
    new Draggable(this, options);
    return this;
  },
  
  undoDraggable: function() {
    if (this.draggable) this.draggable.destroy();
    return this;
  },
  
  makeDroppable: function(options) {
    new Droppable(this, options);
    return this;
  },
  
  undoDroppable: function() {
    if (this.droppable) this.droppable.destroy();
    return this;
  }
});