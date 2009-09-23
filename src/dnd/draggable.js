/**
 * Draggable unit
 *
 * Copyright (C) Nikolay V. Nemshilov aka St.
 */
var Draggable = new Class(Observer, {
  extend: {
    EVENTS: $w('start drag finish drop'),
    
    Options: {
      handle:         null,            // a handle element that will start the drag
      
      snap:           0,               // a number in pixels or [x,y]
      restrict:       null,            // null or 'x' or 'y'
      
      dragClass:      'dragging',      // the in-process class name
      
      clone:          false,           // if should keep a clone in place
      revert:         false,           // marker if the object should be moved back on finish
      revertDuration: self.Fx ? 'normal' : 0,  // the moving back fx duration
      
      relName:        'draggable'      // the audodiscovery feature key
    }
  },
  
  /**
   * Basic controller
   *
   * @param mixed element reference
   * @param Object options
   */
  initialize: function(element, options) {
    this.element = $(element);
    this.$super(options);
    
    this.init();
  },
  
  /**
   * detaches the mouse observers out of the draggable element
   *
   * @return this
   */
  destroy: function() {
    this.options.handle.stopObserving('mousedown', this._dragStart).stopObserving('mouseup', this._dragStop);
    return this;
  },
  
  // additional options processing
  setOptions: function(options) {
    this.$super(options);
    
    // checking the handle
    this.options.handle = this.options.handle ? $(this.options.handle) : this.element;
    
    return this;
  },
  
// protected

  init: function() {
    // caching the callbacks so that we could call them later
    this._dragStart = this.dragStart.bind(this);
    this._dragStop  = this.dragStop.bind(this);
    this._dragProc  = this.dragProcess.bind(this);
    
    this.options.handle.onMousedown(this._dragStart).onMouseup(this._dragStop);
  },
  
  // handles the event start
  dragStart: function(event) {
    event.stop(); // prevents the text selection
    
    // calculating the positions
    var el_position = this.element.position();
    var ev_position = event.position();
    
    this.xDiff = ev_position.x - el_position.x;
    this.yDiff = ev_position.y - el_position.y;
    
    
    // building a clone element if necessary
    if (this.options.clone || this.options.revert) {
      this.clone = $(this.element.cloneNode(true)).setStyle({
        visibility: this.options.clone ? 'visible' : 'hidden'
      }).insertTo(this.element, 'before');
    }
    
    // reinserting the element to the body so it was over all the other elements
    this.element.setStyle({
      position: 'absolute',
      left:      el_position.x + 'px',
      top:       el_position.y + 'px'
    }).addClass(this.options.dragClass).insertTo(document.body);
    
    document.on('mousemove', this._dragProc);
    
    this.fire('start');
  },
  
  // catches the mouse move event
  dragProcess: function(event) {
    var x = event.pageX, y = event.pageY;
    
    this.element.setStyle({
      left: (x - this.xDiff) + 'px',
      top:  (y - this.yDiff) + 'px'
    });
    
    this.fire('drag');
  },
  
  // handles the event stop
  dragStop: function(event) {
    document.stopObserving('mousemove', this._dragProc);
    this.element.removeClass(this.options.dragClass);
    
    if (this.options.revert) {
      var end_position = this.clone.position();
      var end_style = {
        left: end_position.x + 'px',
        top:  end_position.y + 'px'
      };
      
      if (this.options.revertDuration) {
        this.element.morph(end_style, {
          duration: this.options.revertDuration,
          onFinish: this.getItBack.bind(this)
        })
      } else {
        this.element.setStyle(end_style);
        this.getItBack();
      }
    }
    
    this.fire('finish');
  },
  
  // restores the before style
  getItBack: function() {
    this.element.setStyle({
      position: this.clone.getStyle('position')
    }).insertTo(this.clone, 'before');
    
    this.clone.remove();
  }
});