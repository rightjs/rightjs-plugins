/**
 * Handles the to-class and from-class visual effects
 *
 * Copyright (C) Nikolay V. Nemshilov aka St.
 */
Fx.CSS = new Class(Fx.Morph, {
  
// protected
  
  prepare: function(add_class, remove_class) {
    this.addClass    = add_class    || '';
    this.removeClass = remove_class || '';
    
    // wiring the classes add/remove on-finish
    if (add_class)    this.onFinish(this.element.addClass.bind(this.element, add_class));
    if (remove_class) this.onFinish(this.element.removeClass.bind(this.element, remove_class));
    
    return this.$super({});
  },
  
  _endStyle: eval("({f:"+Fx.Morph.prototype._endStyle.toString().replace(/(\.setStyle\(\w+\))/,
    '$1.addClass(this.addClass).removeClass(this.removeClass)'
  )+"})").f
});