/**
 * The behavior module tests
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
var BehaviorTest = TestCase.create({
  name: 'BehaviorTest',
  
  setUp: function() {
    this.container = $E('div', {style: 'visibility:hidden;height:0px;overflow:hidden'}).insertTo(document.body);
    
    this.container.appendChild(this.el = $E('input', {'class': this.name}).insertTo(this.container));
  },
  
  tearDown: function() {
    this.container.remove();
  },
  
  testInstance: function() {
    var b = new Behavior('boo boo boo', 'click', 'disable');
    
    this.assertEqual('boo boo boo', b.rule);
    this.assertEqual(['click', 'disable'], b.args);
  },
  
  testStart: function() {
    var f = function() {};
    
    var b = new Behavior("."+this.el.className, 'click', f);
    
    this.assertFalse(this.el.observes('click', f));
    
    b.start();
    
    this.assert(this.el.observes('click', f));
  },
  
  testStartHash: function() {
    var f1 = function() {};
    var f2 = function() {};
    
    var b = new Behavior("."+this.el.className, {
      click: f1, mouseover: f2
    });
    
    this.assertFalse(this.el.observes('click', f1));
    this.assertFalse(this.el.observes('mouseover', f2));
    
    b.start();
    
    this.assert(this.el.observes('click', f1));
    this.assert(this.el.observes('mouseover', f2));
  },
  
  testStartByName: function() {
    this.el.something = function() {};
    
    new Behavior("."+this.el.className, 'click', 'something').start();
    
    this.assert(this.el.observes('click', 'something'));
  },
  
  testElementUpdate: function() {
    var f = function() {};
    
    new Behavior("."+this.el.className, 'click', f).start();
    
    var e = $E('div', {'class': this.el.className}).insertTo(this.el.parent());
    this.assert(e.observes('click', f), 'should have the behavior once inserted');
  },
  
  testStop: function() {
    var f = function() {};
    
    var b = new Behavior("."+this.el.className, 'click', f).start();
    
    this.assert(this.el.observes('click', f));
    
    b.stop();
    
    this.assertFalse(this.el.observes('click', f));
    
    // checking that the new elements ain't getting hooked after the stop
    var e = $E('div', {'class': this.el.className}).insertTo(this.el.parent());
    this.assertFalse(e.observes('click', f), 'should not have the behavior anymore');
  },
  
  testStopByName: function() {
    this.el.something = function() {};
    
    var b = new Behavior("."+this.el.className, 'click', 'something').start();
    
    this.assert(this.el.observes('click', 'something'));
    
    b.stop();
    
    this.assertFalse(this.el.observes('click', 'something'));
  },
  
  testStopForHash: function() {
    var f1 = function() {};
    var f2 = function() {};
    
    var b = new Behavior("."+this.el.className, {
      mouseover: f1,
      mouseout:  f2
    }).start();
    
    this.assert(this.el.observes('mouseover', f1));
    this.assert(this.el.observes('mouseout',  f2));
    
    b.stop();
    
    this.assertFalse(this.el.observes('mouseover', f1));
    this.assertFalse(this.el.observes('mouseout',  f2));
  },
  
  testActive: function() {
    var b = new Behavior("something", "something", "something");
    
    this.assertFalse(b.active());
    
    b.start();
    
    this.assert(b.active());
    
    b.stop();
    
    this.assertFalse(b.active());
  },
  
  testBehaviorAdd: function() {
    var f = function() {};
    var b = Behavior.add("."+this.el.className, 'click', f);
    
    this.assert(b instanceof Behavior);
    this.assertEqual(['click', f], b.args);
    
    // it should automatically initialize it
    this.assertSame(Behavior.active[b.rule], b);
    
    this.assert(this.el.observes('click', f));
  },
  
  testBehaviorStop: function() {
    var f = function() {};
    var b = new Behavior('.'+this.el.className, 'click', f).start();
    
    this.assertSame(b, Behavior.stop(b.rule));
    
    this.assertFalse(this.el.observes('click', f));
  },
  
  testBehaviorStopNonExisting: function() {
    var f = function() {};
    var b = new Behavior('.'+this.el.className, 'click', f).start();
    
    this.assertNull(Behavior.stop('something non existing'));
    
    this.assert(this.el.observes('click', f));
  },
  
  testStringBehave: function() {
    var f = function() {};
    var b = ('.'+this.el.className).behave('click', f);
    
    this.assert(b instanceof Behavior);
    this.assertEqual(['click', f], b.args);
    
    // it should automatically initialize it
    this.assertSame(Behavior.active[b.rule], b);
    
    this.assert(this.el.observes('click', f));
  },
  
  testStringStopBehave: function() {
    var f = function() {};
    var b = new Behavior('.'+this.el.className, 'click', f).start();
    
    this.assert(this.el.observes('click', f));
    
    this.assertSame(b, ('.'+this.el.className).stopBehave());
    
    this.assertFalse(this.el.observes('click', f));
  },
  
  testStringStopBehaveNonExisting: function() {
    var f = function() {};
    var b = new Behavior('.'+this.el.className, 'click', f).start();
    
    this.assertNull('something non existing'.stopBehave());
    
    this.assert(this.el.observes('click', f));
  }
  
});