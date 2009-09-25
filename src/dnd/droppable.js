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
      
      acceptClass: 'droppable-accept',
      denyClass:   'droppable-deny'
    },
    
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
    
    Droppable.active.push(this.element.droppable = this);
  },
  
  /**
   * Detaches the attached events
   *
   * @return self
   */
  destroy: function() {
    Droppable.active = Droppable.active.without(this);
    this.element.droppable = null;
  },
  
  /**
   * checks the event for hovering
   *
   * @param Event mouse event
   * @param Draggable the draggable object
   */
  checkHover: function(event, draggable) {
    if (this.hoveredBy(event)) {
      if (!this._hovered) {
        this._hovered = true;
        this.element.addClass(this.options[this.accepts(draggable) ? 'acceptClass' : 'denyClass']);
      }
    } else if (this._hovered) {
      this._hovered = false;
      this.reset().fire('leave');
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
    if (this.hoveredBy(event) && this.accepts(draggable)) {
      draggable.fire('drop', this);
      this.fire('drop', draggable);
    }
  },
  
  /**
   * resets the element state
   *
   * @return self
   */
  reset: function() {
    this.element.removeClass(this.options.acceptClass).removeClass(this.options.denyClass);
    return this;
  },
  
// protected

  // checks if the element is hovered by the event
  hoveredBy: function(event) {
    var dims = this.element.dimensions(), event_x = event.pageX, event_y = event.pageY;
    
    return event_x > dims.left && event_x < (dims.left + dims.width) && event_y > dims.top && event_y < (dims.top + dims.height);
  },
  
  // checks if the object accepts the draggable
  accepts: function(draggable) {
    return this.options.accept == '*' ? true : draggable.element.match(this.options.accept);
  }
  
});