/**
 * The document events hooker
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
document.on({
  // parocesses the automatically discovered elements
  ready: function() {
    Draggable.rescan();
    Droppable.rescan();
  },
  
  // watch the draggables moving arond
  mousemove: function(event) {
    if (Draggable.current) {
      Draggable.current.dragProcess(event);
      Droppable.checkHover(event, Draggable.current);
    }
  },
  
  // releases the current draggable on mouse up
  mouseup: function(event) {
    if (Draggable.current) {
      Draggable.current.dragStop(event);
    }
  }
});