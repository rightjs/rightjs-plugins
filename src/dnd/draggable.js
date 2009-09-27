/**
 * Draggable unit
 *
 * Copyright (C) Nikolay V. Nemshilov aka St.
 */
var Draggable = new Class(Observer, {
  extend: {
    EVENTS: $w('start drag stop drop'),
    
    Options: {
      handle:            null,        // a handle element that will start the drag
                                      
      snap:              0,           // a number in pixels or [x,y]
      axis:              null,        // null or 'x' or 'y' or 'vertical' or 'horizontal'
      range:             null,        // {x: [min, max], y:[min, max]} or reference to another element
                                      
      dragClass:         'dragging',  // the in-process class name
                                      
      clone:             false,       // if should keep a clone in place
      revert:            false,       // marker if the object should be moved back on finish
      revertDuration:    'normal',    // the moving back fx duration
                                      
      scroll:            true,        // if it should automatically scroll        
      scrollSensitivity: 32,          // the scrolling area size in pixels
      
      zIndex:            10000000,    // the element's z-index
      moveOut:           false,       // marker if the draggable should be moved out of it's context (for overflown elements)
      
      relName:           'draggable'  // the audodiscovery feature key
    },
    
    // referenece to the currently active draggable
    current: null,
    
    // scans the document for auto-processed draggables with the rel="draggable" attribute
    rescan: function() {
      var key = this.Options.relName;
      $$('*[rel^="'+key+'"]').each(function(element) {
        if (!element._draggable) {
          var data = element.get('data-'+key+'-options');
          new this(element, eval('('+data+')') || {});
        }
      }, this);
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
    
    this.element._draggable = this.init();
  },
  
  /**
   * detaches the mouse observers out of the draggable element
   *
   * @return this
   */
  destroy: function() {
    this.handle.stopObserving('mousedown', this._dragStart);
    delete(this.element._draggable);
    
    return this;
  },
  
  // additional options processing
  setOptions: function(options) {
    this.$super(options);
    
    // checking the handle
    this.handle = this.options.handle ? $(this.options.handle) : this.element;
    
    // checking the spappings
    if (isArray(this.options.snap)) {
      this.snapX = this.options.snap[0];
      this.snapY = this.options.snap[1];
    } else {
      this.snapX = this.snapY = this.options.snap;
    }
    
    return this;
  },
  
  /**
   * Moves the element back to the original position
   *
   * @return this
   */
  revert: function() {
    var position  = this.clone.position();
    var end_style = {
      top:  position.y + 'px',
      left: position.x + 'px'
    };
    
    if (this.options.revertDuration && this.element.morph) {
      this.element.morph(end_style, {
        duration: this.options.revertDuration,
        onFinish: this.swapBack.bind(this)
      });
    } else {
      this.element.setStyle(end_style);
      this.swapBack();
    }
    
    return this;
  },
  
// protected

  init: function() {
    // caching the callback so that we could detach it later
    this._dragStart = this.dragStart.bind(this);
    
    this.handle.onMousedown(this._dragStart);
    
    return this;
  },
  
  // handles the event start
  dragStart: function(event) {
    event.stop(); // prevents the text selection
    
    // calculating the positions diff
    var position  = this.element.position();
    
    
    this.xDiff = event.pageX - position.x;
    this.yDiff = event.pageY - position.y;
    
    // preserving the element sizes
    var size = {
      x: this.element.getStyle('width'),
      y: this.element.getStyle('height')
    };
    
    if (size.x == 'auto') size.x = this.element.offsetWidth  + 'px';
    if (size.y == 'auto') size.y = this.element.offsetHeight + 'px';
    
    // building a clone element if necessary
    if (this.options.clone || this.options.revert) {
      this.clone = $(this.element.cloneNode(true)).setStyle({
        visibility: this.options.clone ? 'visible' : 'hidden'
      }).insertTo(this.element, 'before');
    }
    
    // reinserting the element to the body so it was over all the other elements
    this.element.setStyle({
      position: 'absolute',
      zIndex:   Draggable.Options.zIndex++,
      top:      position.y + 'px',
      left:     position.x + 'px',
      width:    size.x,
      height:   size.y
    }).addClass(this.options.dragClass);
    
    if (this.options.moveOut) this.element.insertTo(document.body);
    
    
    // caching the window scrolls
    this.winScrolls = window.scrolls();
    this.winSizes   = window.sizes();
    
    Draggable.current = this.calcConstraints().fire('start', this, event);
  },
  
  // catches the mouse move event
  dragProcess: function(event) {
    var page_x = event.pageX, page_y = event.pageY, x = page_x - this.xDiff, y = page_y - this.yDiff, position = {};
    
    // checking the range
    if (this.ranged) {
      if (this.minX > x) x = this.minX;
      if (this.maxX < x) x = this.maxX;
      if (this.minY > y) y = this.minY;
      if (this.maxY < y) y = this.maxY;
    }
    
    // checking the scrolls
    if (this.options.scroll) {
      var scrolls = {x: this.winScrolls.x, y: this.winScrolls.y},
        sensitivity = this.options.scrollSensitivity;
      
      if ((page_y - scrolls.y) < sensitivity) {
        scrolls.y = page_y - sensitivity;
      } else if ((scrolls.y + this.winSizes.y - page_y) < sensitivity){
        scrolls.y = page_y - this.winSizes.y + sensitivity;
      }
      
      if ((page_x - scrolls.x) < sensitivity) {
        scrolls.x = page_x - sensitivity;
      } else if ((scrolls.x + this.winSizes.x - page_x) < sensitivity){
        scrolls.x = page_x - this.winSizes.x + sensitivity;
      }
      
      if (scrolls.y < 0) scrolls.y = 0;
      if (scrolls.x < 0) scrolls.x = 0;
      
      if (scrolls.y < this.winScrolls.y || scrolls.y > this.winScrolls.y ||
        scrolls.x < this.winScrolls.x || scrolls.x > this.winScrolls.x) {
        
          window.scrollTo(this.winScrolls = scrolls);
      }
    }
    
    // checking the snaps
    if (this.snapX) x = x - x % this.snapX;
    if (this.snapY) y = y - y % this.snapY;
    
    // checking the constraints
    if (!this.axisY) position.left = x + 'px';
    if (!this.axisX) position.top  = y + 'px';
    
    this.element.setStyle(position);
    
    this.fire('drag', this, event);
  },
  
  // handles the event stop
  dragStop: function(event) {
    this.element.removeClass(this.options.dragClass);
    
    // notifying the droppables for the drop
    Droppable.checkDrop(event, this);
    
    if (this.options.revert) {
      this.revert();
    }
    
    Draggable.current = null;
    
    this.fire('stop', this, event);
  },
  
  // swaps the clone element to the actual element back
  swapBack: function() {
    if (this.clone) {
      this.clone.insert(
        this.element.setStyle({
          width:    this.clone.getStyle('width'),
          height:   this.clone.getStyle('height'),
          position: this.clone.getStyle('position'),
          zIndex:   this.clone.getStyle('zIndex')
        }), 'before'
      ).remove();
    }
  },
  
  // calculates the constraints
  calcConstraints: function() {
    var axis = this.options.axis;
    this.axisX = ['x', 'horizontal'].include(axis);
    this.axisY = ['y', 'vertical'].include(axis);
    
    this.ranged = false;
    var range = this.options.range;
    if (range) {
      this.ranged = true;
      
      // if the range is defined by another element
      var element = $(range);
      if (isElement(element)) {
        var dims = element.dimensions();
        
        range = {
          x: [dims.left, dims.left + dims.width],
          y: [dims.top,  dims.top + dims.height]
        };
      }

      if (isHash(range)) {
        var size = this.element.sizes();
        
        if (range.x) {
          this.minX = range.x[0];
          this.maxX = range.x[1] - size.x;
        }
        if (range.y) {
          this.minY = range.y[0];
          this.maxY = range.y[1] - size.y;
        }
      }
    }
    
    return this;
  }
});