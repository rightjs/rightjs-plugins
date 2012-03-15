/**
 * Draggable unit
 *
 * Copyright (C) 2009-2012 Nikolay Nemshilov
 */
var Draggable = new Class(Observer, {
  extend: {
    version: '2.2.4',

    EVENTS: $w('before start drag stop drop'),

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
    rescan: function(scope) {
      var key = this.Options.relName, ref = this === Draggable ? 'draggable' : 'droppable';

      ($(scope)||$(document)).find('*[rel^="'+key+'"]').each(function(element) {
        if (!element[ref]) {
          new this(element, new Function('return '+element.get('data-'+key))() || {});
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

    this._dragStart = R(function(event) {
      if (event.which === 1) {
        this.dragStart(event);
      }
    }).bind(this);
    this.handle.on({
      mousedown:  this._dragStart,
      touchstart: this._dragStart
    });

    this.element.draggable = this;
  },

  /**
   * detaches the mouse observers out of the draggable element
   *
   * @return this
   */
  destroy: function() {
    this.handle
      .stopObserving('mousedown',  this._dragStart)
      .stopObserving('touchstart', this._dragStart);
    delete(this.element.draggable);

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
      top:  (position.y + this.ryDiff) + 'px',
      left: (position.x + this.rxDiff) + 'px'
    };

    if (this.options.revertDuration && this.element.morph) {
      this.element.morph(end_style, {
        duration: this.options.revertDuration,
        onFinish: R(this.swapBack).bind(this)
      });
    } else {
      this.element.setStyle(end_style);
      this.swapBack();
    }

    return this;
  },

// protected

  // handles the event start
  dragStart: function(event) {
    if (this._drag) { return false; } else { this._drag = true; }

    this.fire('before', this, event.stop());

    // calculating the positions diff
    var position = this.element.position();

    this.xDiff = event.pageX - position.x;
    this.yDiff = event.pageY - position.y;

    // grabbing the relative position diffs for nested spaces
    this.rxDiff = this.ryDiff = 0;
    this.element.parents().reverse().each(function(parent) {
      if (parent.getStyle('position') !== 'static') {
        parent = parent.position();

        this.rxDiff = - parent.x;
        this.ryDiff = - parent.y;
      }
    }, this);

    // preserving the element sizes
    var size = {
      x: this.element.getStyle('width'),
      y: this.element.getStyle('height')
    };

    if (size.x == 'auto') { size.x = this.element._.offsetWidth  + 'px'; }
    if (size.y == 'auto') { size.y = this.element._.offsetHeight + 'px'; }

    // building a clone element if necessary
    if (this.options.clone || this.options.revert) {
      this.clone = new Element(this.element._.cloneNode(true)).setStyle({
        visibility: this.options.clone ? 'visible' : 'hidden'
      }).insertTo(this.element, 'before');
    }

    // reinserting the element to the body so it was over all the other elements
    this.element.setStyle({
      position: 'absolute',
      zIndex:   Draggable.Options.zIndex++,
      top:      (position.y + this.ryDiff) + 'px',
      left:     (position.x + this.rxDiff) + 'px',
      width:    size.x,
      height:   size.y
    }).addClass(this.options.dragClass);

    if (this.options.moveOut) {
      this.element.insertTo(document.body);
    }

    // caching the window scrolls
    this.winScrolls = $(window).scrolls();
    this.winSizes   = $(window).size();

    Draggable.current = this.calcConstraints().fire('start', this, event);

    this.style = this.element._.style;
  },

  // catches the mouse move event
  dragProcess: function(event) {
    var page_x = event.pageX, page_y = event.pageY, x = page_x - this.xDiff, y = page_y - this.yDiff;

    // checking the range
    if (this.ranged) {
      if (this.minX > x) { x = this.minX; }
      if (this.maxX < x) { x = this.maxX; }
      if (this.minY > y) { y = this.minY; }
      if (this.maxY < y) { y = this.maxY; }
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

      if (scrolls.y < 0) { scrolls.y = 0; }
      if (scrolls.x < 0) { scrolls.x = 0; }

      if (scrolls.y < this.winScrolls.y || scrolls.y > this.winScrolls.y ||
        scrolls.x < this.winScrolls.x || scrolls.x > this.winScrolls.x) {

          $(window).scrollTo(this.winScrolls = scrolls);
      }
    }

    // checking the snaps
    if (this.snapX) { x = x - x % this.snapX; }
    if (this.snapY) { y = y - y % this.snapY; }

    // checking the constraints
    if (!this.axisY) { this.style.left = (x + this.rxDiff) + 'px'; }
    if (!this.axisX) { this.style.top  = (y + this.ryDiff) + 'px'; }

    this.fire('drag', this, event);
  },

  // handles the event stop
  dragStop: function(event) {
    this.element.removeClass(this.options.dragClass);

    // notifying the droppables for the drop
    Droppable.checkDrop(event, this);

    if (this.options.revert) {
      this.revert();
    } else {
      this._drag = false;
    }

    Draggable.current = null;

    this.fire('stop', this, event);
  },

  // swaps the clone element to the actual element back
  swapBack: function() {
    if (this.clone) {
      this.clone.replace(
        this.element.setStyle({
          width:    this.clone.getStyle('width'),
          height:   this.clone.getStyle('height'),
          position: this.clone.getStyle('position'),
          zIndex:   this.clone.getStyle('zIndex') || ''
        })
      );
    }
    this._drag = false;
  },

  // calculates the constraints
  calcConstraints: function() {
    var axis = this.options.axis;
    this.axisX = R(['x', 'horizontal']).include(axis);
    this.axisY = R(['y', 'vertical']).include(axis);

    this.ranged = false;
    var range = this.options.range;
    if (range) {
      this.ranged = true;

      // if the range is defined by another element
      var element = $(range);
      if (element instanceof Element) {
        var dims = element.dimensions();

        range = {
          x: [dims.left, dims.left + dims.width],
          y: [dims.top,  dims.top + dims.height]
        };
      }

      if (isHash(range)) {
        var size = this.element.size();

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