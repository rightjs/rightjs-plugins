/**
 * The Event class additional functionality
 *
 * Copyright (C) 2008-2010 Nikolay V. Nemshilov
 */
Event.extend({
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
  BUTTONS: (Browser.IE || Browser.Konqueror) ? {
    LEFT:   1,
    MIDDLE: 4,
    RIGHT:  2
  } : {
    LEFT:   0,
    MIDDLE: 1,
    RIGHT:  2
  }
  
});


/**
 * constructor. pretty much plays a virtual factory, instances new events or extends
 * existing ones and always returns an event instead of void as a normal constructor
 *
 * @param mixed native Event instance or String event name
 * @param Object options
 * @return Event instance
 */
Event.prototype.initialize = function() {
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
};
