/**
 * The document events hooker
 *
 * Copyright (C) 2009-2012 Nikolay Nemshilov
 */
$(document).on({
  // parocesses the automatically discovered elements
  ready: function() {
    Draggable.rescan();
    Droppable.rescan();
  },

  mousemove: document_mousemove,
  touchmove: document_mousemove,

  mouseup:   document_mouseup,
  touchend:  document_mouseup
});


// watch the draggables moving arond
function document_mousemove(event) {
  if (Draggable.current !== null) {
    Draggable.current.dragProcess(event);
    Droppable.checkHover(event, Draggable.current);
  }
}

// releases the current draggable on mouse up
function document_mouseup(event) {
  if (Draggable.current !== null) {
    Draggable.current.dragStop(event);
  }
}