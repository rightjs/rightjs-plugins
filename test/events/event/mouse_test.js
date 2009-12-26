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
    this.assertNotNull(Event.Methods.isLeftClick);
    this.assertNotNull(Event.Methods.isRightClick);
    this.assertNotNull(Event.Methods.over);
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
    this.el.onContextmenu(function(e) { ev = e }).fire('contextmenu');
    
//    this.assertEqual(3, ev.which);
//    this.assert(ev.isRightClick());
//    this.assertFalse(ev.isLeftClick());
  },
  
  testOver: function() {
    var event = {
      pageX: 10,
      pageY: 10,
      over:  Event.Methods.over
    };
    
    this.assert(event.over({
      dimensions: function() {
        return {
          left: 0,
          top: 0,
          width: 20,
          height: 20
        };
      }
    }));
    
    this.assertFalse(event.over({
      dimensions: function() {
        return {
          left: 20
        }
      }
    }));
    
    this.assertFalse(event.over({
      dimensions: function() {
        return {
          top: 20
        }
      }
    }));
  }
});