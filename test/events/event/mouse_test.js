/**
 * Event.Mouse unit tests
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
var EventMouseTest = TestCase.create({
  name: 'EventMouseTest',
  
  setup: function() {
    this.el = $E('div').insertTo(document.body);
  },
  
  tearDown: function() {
    this.el.remove();
  },
  
  testExt: function() {
    var mock_event = {mock: 'event'};
    
    this.assertSame(mock_event, Event.Mouse.ext(mock_event));
    
    this.assertNotNull(mock_event.isLeftClick);
    this.assertNotNull(mock_event.isRightClick);
  },
  
  testLeftClick: function() {
    var ev = null;
    this.el.onClick(function(e) { ev = e }).click();
    
    this.assertEqual(1, ev.which);
    this.assert(ev.isLeftClick());
    this.assertFalse(ev.isRightClick());
  },
  
  testRightClick: function() {
    var ev = null;
    this.el.onRightclick(function(e) { ev = e }).rightclick();
    
    this.assertEqual(3, ev.which);
    this.assert(ev.isRightClick());
    this.assertFalse(ev.isLeftClick());
  }
});