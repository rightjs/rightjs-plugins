/**
 * Event.Keyboard unit tests
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
var EventKeyboardTest = TestCase.create({
  name: 'EventKeyboardTest',
  
  methodName: function(key) {
    return ('is_'+key.toLowerCase()).camelize();
  },
  
  testExt: function() {
    for (var key in Event.KEYS) {
      this.assertTypeOf('function', Event.Methods[this.methodName(key)], "Testing method: "+this.methodName(key));
    }
  },
  
  testKeyRecognitionMethods: function() {
    if (Browser.WebKit) return; // webkit doesn't let you set the key-code attribute
    
    var ev = null;
    var el = $E('div').insertTo(document.body).onKeypress(function(e) { ev = e; })
    for (var key in Event.KEYS) {
      el.fire('keypress', {keyCode: Event.KEYS[key]});
      
      this.assertEqual(Event.KEYS[key], ev.keyCode);
      
      for (var name in Event.KEYS) {
        this.assertEqual(name == key, ev[this.methodName(name)](), "checking "+key+" -> "+name);
      }
    }
    
    el.remove();
  }
});