/**
 * The Event class additional functionality
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
Event.extend({
  /**
   * extends a native object with additional functionality
   *
   * @param Event event
   * @return Event same event but extended
   */
  ext: function(event) {
    if (!event.stop) {
      Event._ext(event);
      Event.Base.ext(event);
      
      if (Event.Mouse.NAMES.includes(event.eventName)) {
        Event.Mouse.ext(event);
      } else if (defined(event.keyCode)){
        Event.Keyboard.ext(event);
      }
    }
    
    return event;
  },
  _ext: Event.ext,
  
  // keyboard key codes
  KEYS: {
    BACKSPACE:  8,
    TAB:        9,
    ENTER:     13,
    ESCAPE:    27,
    SPACE:     32,
    PAGE_UP:   33,
    PAGE_DOWN: 34,
    END:       35,
    HOME:      36,
    LEFT:      37,
    UP:        38,
    RIGHT:     39,
    DOWN:      40,
    INSERT:    45,
    DELETE:    46
  },
  
  // mouse button codes
  BUTTONS: {
    LEFT:   0,
    MIDDLE: Browser.IE ? 4 : 1,
    RIGHT:  2
  }
  
});

Event.include({
  /**
   * constructor. pretty much plays a virtual factory, instances new events or extends
   * existing ones and always returns an event instead of void as a normal constructor
   *
   * @param mixed native Event instance or String event name
   * @param Object options
   * @return Event instance
   */
  initialize: function() {
    var args = $A(arguments), event = args.shift(), options = args.pop() || {};

    if (isString(event)) {
      var name = Event.cleanName(event);
      if (Event.Mouse.NAMES.includes(name)) {
        event = new Event.Mouse(name, options);
      } else if (Event.Keyboard.NAMES.includes(name)) {
        event = new Event.Keyboard(name, options);
      } else {
        event = new Event.Custom(name, options);
      }
    }

    return Event.ext(event);
  }
});