/**
 * Handles the to-class and from-class visual effects
 *
 * Copyright (C) 2009-2010 Nikolay V. Nemshilov
 */
Fx.CSS = new Class(Fx.Morph, {
  STYLES: $w('width height lineHeight opacity border padding margin color fontSize background top left right bottom'),
  
// protected
  
  prepare: function(add_class, remove_class) {
    this.addClass    = add_class    || '';
    this.removeClass = remove_class || '';
    
    // wiring the classes add/remove on-finish
    if (add_class)    this.onFinish(this.element.addClass.bind(this.element, add_class));
    if (remove_class) this.onFinish(this.element.removeClass.bind(this.element, remove_class));
    
    return this.$super({});
  },
  
  // hacking the old method to make it apply the classes
  _endStyle: eval("({f:"+Fx.Morph.prototype._endStyle.toString().replace(/(\.setStyle\(\w+\))/,
    '$1.addClass(this.addClass).removeClass(this.removeClass)'
  )+"})").f,
  
  // replacing the old method to make it return our own list of properties
  _styleKeys: function() {
    var hash = {};
    this.STYLES.each(function(name) {
      hash[name] = 1;
    });
    
    return this.$super(hash);
  }
});