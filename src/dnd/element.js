/**
 * Element level hooks for drag'n'drops
 *
 * Don't use the this.draggable and this.droppable attributes
 *   case FF uses them for native drag-n-drop support and won't
 *   let you assign an object to those attributes
 *
 * Copyright (C) Nikolay V. Nemshilov aka St.
 */
Element.addMethods({
  
  makeDraggable: function(options) {
    this._draggable = new Draggable(this, options);
    return this;
  },
  
  undoDraggable: function() {
    if (this._draggable) this._draggable.destroy();
    return this;
  },
  
  makeDroppable: function(options) {
    this._droppable = new Droppable(this, options);
    return this;
  },
  
  undoDroppable: function() {
    if (this._droppable) this._droppable.destroy();
    return this;
  }
});