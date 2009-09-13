/**
 * The behavior definition unit
 *
 * Once created will have two methods #start and #stop
 * Once started will be added to all the matching elemnts
 * on the page, and will watch any updates on the page
 * and refresh the behaves automatically
 *
 * Copyright (C) Nikolay V. Nemshilov aka St.
 */
var Behavior = new Class({
  extend: {
    /**
     * Class level behavior creator
     *
     * @param String css-selector
     * @param String event name or a hash of events
     * @param Function callback or a method name or a list of callbacks/names
     * @param mixed optional argument
     * ....
     * @return Behavior instance
     */
    add: function() {
      var args = $A(arguments);
      
      return new Behavior(args.shift()).on(args).start();
    },
    
    /**
     * makes a certain behavior stop
     *
     * @param String css-selector
     * @return Behavior stopped behavior or null if there weren't any
     */
    stop: function(rule) {
      var behavior = Behavior.active(rule);
      if (behavior)  behavior.stop();
      
      return behavior;
    },
    
    /**
     * applies all the active behaviors to the page
     *
     * @return void
     */
    refresh: function() {
      for (var key in Behavior.active) {
        Behavior.active[key].refresh();
      }
    },
    
    // a hash of active behaviors
    active:   {},
  },
  
  
  rule: null, // the css rule
  args: null, // the received arguments
  regs: null, // the list of UID of elements that are already processed
  
  /**
   * The basic constructor
   *
   * @param String css-rule
   * @param String event name or a hash of event definitions
   * @return void
   */
  initialize: function() {
    var args = $A(arguments);
    this.rule = args.shift();
    this.on.apply(this, args);
    
    this.regs = [];
  },
  
  /**
   * makes the behavior active
   *
   * @return Behavior self
   */
  start: function() {
    return Behavior.active[this.rule] = this.refresh();
  },
  
  /**
   * Deactivates the behavior
   *
   * @return Behavior self
   */
  stop: function() {
    var args = this.args;
    
    // converting a non-hash args into a hash
    if (!isHash(args)) {
      var hash = {};
      hash[args.shift()] = args;
      args = hash;
    }
    
    // unregistering the listeners
    $$(this.rule).each(function(element) {
      var uid = $uid(element);
      if (this.regs[uid]) {
        for (var key in args) {
          element.stopObserving.apply(element, [key].concat(args[key]));
        }
      }
    }, this);
    
    this.regs = [];
    return this;
  },
  
// private
  
  /**
   * Defines the behavior options
   *  
   *  Takes all the same type of options as the {Observer#on} method
   *
   * @param String event name or anevents definition hash
   * @param Function callback or method name to call
   * @return Behavior self
   */
  on: function() {
    this.args = $A(arguments);
    
    return this;
  },
  
  /**
   * refreshes the behavior applying on the page elements
   *
   * @return Behavior self
   */
  refresh: function() {
    $$(this.rule).each(function(element) {
      var uid = $uid(element);
      if (!this.regs[uid]) {
        element.on.apply(element, this.args);
        this.regs[uid] = 1;
      }
    }, this);
  }
});

document.onReady(Behavior.refresh);