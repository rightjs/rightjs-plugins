/**
 * presents the Range unit
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
var NumRange = new Class({
  /**
   * basic constructor
   *
   * @param Number start
   * @param Number end
   */
  initialize: function(start, end, step) {
    this.start = start;
    this.end   = end;
    this.step  = (step || 1).abs() * ( start > end ? 1 : -1);
  },
  
  each: function(callback, scope) {
    var scope = scope || this;
    for (var value=this.start, i=0; value < this.end; value += this.step) {
      callback.call(scope, value, i++, this);
    }
  },
  
  map: function(callback, scope) {
    var result = [], scope = scope || this;
    
    this.each(function(value, i) {
      result.push(callback.call(scope, value, i, this));
    });
    
    return result;
  },
  
  filter: function(callback, scope) {
    var result = [], scope = scope || this;
    
    this.each(function(value, i) {
      if (callback.call(scope, value, i, this)) {
        result.push(value);
      }
    });
    
    return result;
  },
  
  reject: function(callback, scope) {
    var result = [], scope = scope || this;
    
    this.each(function(value, i) {
      if (!callback.call(scope, value, i, this)) {
        result.push(value);
      }
    });
    
    return result;
  }
});