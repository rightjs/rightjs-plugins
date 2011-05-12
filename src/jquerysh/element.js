/**
 * Element level jQuery like aliases
 *
 * Copyright (C) 2011 Nikolay Nemshilov
 */
RightJS.Element.include({

  appendTo: function(target) {
    return this.insertTo(target);
  },

  prepend: function(content) {
    return this.insert(content, 'top');
  },

  before: function(content) {
    return this.insert(content, 'before');
  },

  after: function(content) {
    return this.insert(content, 'after');
  },

  insertBefore: function(target) {
    return this.insertTo(target, 'before');
  },

  attr: function(name, value) {
    return value === undefined ? this.get(name) : this.set(name, value);
  },

  css: function(name, value) {
    return (typeof(name) === 'string' && value === undefined) ?
      this.getStyle(name) : this.setStyle(name, value);
  },

  offset: function() {
    var position = this.position();
    return {
      left: position.x,
      top:  position.y
    };
  },

  width: function() {
    return this.size().x;
  },

  height: function() {
    return this.size().y;
  },

  scrollLeft: function() {
    return this.scrolls().x;
  },

  scrollTop: function() {
    return this.scrolls().y;
  },

  bind: function() {
    return this.on.apply(this, arguments);
  },

  unbind: function() {
    return this.stopObserving.apply(this, arguments);
  },

  trigger: function(name, options) {
    return this.fire(name, options);
  },

  animate: function(style, time, finish) {
    return this.morph(style, {duration: time, onFinish: finish});
  },

  fadeIn: function() {
    return this.fade('in');
  },

  fadeOut: function() {
    return this.fade('out');
  },

  slideDown: function() {
    return this.slide('in');
  },

  slideUp: function() {
    return this.slide('out');
  }

});