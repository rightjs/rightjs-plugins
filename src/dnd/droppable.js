/**
 * Droppable unit
 *
 * Copyright (C) Nikolay V. Nemshilov aka St.
 */
var Droppable = new Class(Observer, {
  extend: {
    EVENTS: $w('drop hover leave'),
    
    Options: {
      accept:      '*',
      containment: null,    // the list of elements (or ids) that should to be accepted
      
      overlap:     null,    // 'x', 'y', 'horizontal', 'vertical', 'both'  makes it respond only if the draggable overlaps the droppable
      overlapSize: 0.5,     // the overlapping level 0 for nothing 1 for the whole thing
      
      allowClass:  'droppable-allow',
      denyClass:   'droppable-deny',
      
      relName:     'droppable'   // automatically discovered feature key
    },
    
    // See the Draggable rescan method, case we're kinda hijacking it in here
    rescan: eval('({f:'+Draggable.rescan.toString().replace(/\._draggable/g, '._droppable')+'})').f,
    
    /**
     * Checks for hoverting draggable
     *
     * @param Event mouse event
     * @param Draggable draggable
     */
    checkHover: function(event, draggable) {
      for (var i=0, length = this.active.length; i < length; i++)
        this.active[i].checkHover(event, draggable);
    },
    
    /**
     * Checks for a drop
     * 
     * @param Event mouse event
     * @param Draggable draggable
     */
    checkDrop: function(event, draggable) {
      for (var i=0, length = this.active.length; i < length; i++)
        this.active[i].checkDrop(event, draggable);
    },
    
    active: []
  },
  
  /**
   * Basic cosntructor
   *
   * @param mixed the draggable element reference
   * @param Object options
   */
  initialize: function(element, options) {
    this.element = $(element);
    this.$super(options);
    
    Droppable.active.push(this);
  },
  
  /**
   * Detaches the attached events
   *
   * @return self
   */
  destroy: function() {
    Droppable.active = Droppable.active.without(this);
    return this;
  },
  
  /**
   * checks the event for hovering
   *
   * @param Event mouse event
   * @param Draggable the draggable object
   */
  checkHover: function(event, draggable) {
    if (this.hoveredBy(event, draggable)) {
      if (!this._hovered) {
        this._hovered = true;
        this.element.addClass(this.options[this.allows(draggable) ? 'allowClass' : 'denyClass']);
        this.fire('hover', draggable, this, event);
      }
    } else if (this._hovered) {
      this._hovered = false;
      this.reset().fire('leave', draggable, this, event);
    }
  },
  
  /**
   * Checks if it should process the drop from draggable
   *
   * @param Event mouse event
   * @param Draggable draggable
   */
  checkDrop: function(event, draggable) {
    this.reset();
    if (this.hoveredBy(event, draggable) && this.allows(draggable)) {
      draggable.fire('drop', this, draggable, event);
      this.fire('drop', draggable, this, event);
    }
  },
  
  /**
   * resets the element state
   *
   * @return self
   */
  reset: function() {
    this.element.removeClass(this.options.allowClass).removeClass(this.options.denyClass);
    return this;
  },
  
// protected

  // checks if the element is hovered by the event
  hoveredBy: function(event, draggable) {
    var dims     = this.element.dimensions(),
        t_top    = dims.top,
        t_left   = dims.left,
        t_right  = dims.left + dims.width,
        t_bottom = dims.top  + dims.height,
        event_x  = event.pageX,
        event_y  = event.pageY;
    
    // checking the overlapping
    if (this.options.overlap) {
      var drag_dims = draggable.element.dimensions(),
          level     = this.options.overlapSize,
          top       = drag_dims.top,
          left      = drag_dims.left,
          right     = drag_dims.left + drag_dims.width,
          bottom    = drag_dims.top  + drag_dims.height;
      
      
      switch (this.options.overlap) {
        // horizontal overlapping only check
        case 'x':
        case 'horizontal':
          return (
            (top    > t_top    && top      < t_bottom) ||
            (bottom > t_top    && bottom   < t_bottom)
          ) && (
            (left   > t_left   && left    < (t_right - dims.width * level)) ||
            (right  < t_right  && right   > (t_left  + dims.width * level))
          );
          
        // vertical overlapping only check
        case 'y':
        case 'vertical':
          return (
            (left   > t_left   && left   < t_right) ||
            (right  > t_left   && right  < t_right)
          ) && (
            (top    > t_top    && top    < (t_bottom - dims.height * level)) ||
            (bottom < t_bottom && bottom > (t_top + dims.height * level))
          );
          
        // both overlaps check
        default:
          return (
            (left   > t_left   && left    < (t_right - dims.width * level)) ||
            (right  < t_right  && right   > (t_left  + dims.width * level))
          ) && (
            (top    > t_top    && top    < (t_bottom - dims.height * level)) ||
            (bottom < t_bottom && bottom > (t_top + dims.height * level))
          );
      }
      
    } else {
      // simple check agains the event position
      return event_x > t_left && event_x < t_right && event_y > t_top && event_y < t_bottom;
    }
  },
  
  // checks if the object accepts the draggable
  allows: function(draggable) {
    if (this.options.containment && !this._scanned) {
      this.options.containment.walk($);
      this._scanned = true;
    }
    
    // checking the invitations list
    var welcomed = this.options.containment ? this.options.containment.includes(draggable.element) : true;
    
    return welcomed && (this.options.accept == '*' ? true : draggable.element.match(this.options.accept));
  }
  
});