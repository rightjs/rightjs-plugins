/**
 * the Event unit tests
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
var EventTest = TestCase.create({
  name: 'EventTest',
  
  testMouseEventInstance: function() {
    for (var i=0; i < Event.Mouse.NAMES.length; i++) {
      var event_name = Event.Mouse.NAMES[i];
      
      this.event = new Event(event_name);
      
      if (!this.util.Browser.Konqueror) {
        if (event_name == 'rightclick') {
          event_name = 'contextmenu';
        }
        if (this.util.Browser.IE && event_name != 'contextmenu')
          event_name = 'on'+event_name;
      }
      
      this.assertEqual(event_name, this.event.type);
    }
  },
  
  testKeyboardEventInstance: function() {
    for (var i=0; i < Event.Keyboard.NAMES.length; i++) {
      var event_name = Event.Keyboard.NAMES[i];
      this.event = new Event(event_name);
    }
  },
    
  testInstanceWithOptions: function() {
    var event = new Event('click', {
      altKey: true,
      ctrlKey: true,
      shiftKey: true
    });
    
    this.assert(event.altKey);
    this.assert(event.ctrlKey);
    this.assert(event.shiftKey);
  }
});