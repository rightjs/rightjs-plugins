/**
 * Event.Mouse unit tests
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
var EventMouseTest = TestCase.create({
  name: 'EventMouseTest',
  
  testExt: function() {
    var mock_event = {mock: 'event'};
    
    this.assertSame(mock_event, Event.Mouse.ext(mock_event));
    
    this.assertNotNull(mock_event.isLeftClick);
    this.assertNotNull(mock_event.isRightClick);
  }
});