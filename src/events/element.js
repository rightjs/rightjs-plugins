/**
 * Reassigning the element #fire method to support the native events dispatching
 *
 * @copyright 2009 Nikolay V. Nemshilov aka St.
 */
Element.addMethods({
  fire: function() {
    var args = $A(arguments), event = new Event(args.shift(), Object.merge(args.shift(), {element: this}));
    
    if (event instanceof Event.Custom) {
      (this.$listeners || []).each(function(i) {
        if (i.e == event.eventName) {
          i.f.apply(this, [event].concat(i.a).concat(args));
        }
      }, this);
    } else if (this.dispatchEvent) {
      this.dispatchEvent(event);
    } else {
      this.fireEvent(event.eventType, event);
    }
    
    return this;
  }
});