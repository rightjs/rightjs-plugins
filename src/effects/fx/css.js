/**
 * Handles the to-class and from-class visual effects
 *
 * Copyright (C) Nikolay V. Nemshilov aka St.
 */
Fx.CSS = new Class(Fx.Morph, {
  // the list of styles to watch
  STYLES: $w('width height lineHeight opacity borderWidth borderColor padding margin color fontSize backgroundColor marginTop marginLeft marginRight marginBottom top left right bottom'),
  
// protected
  
  prepare: function(add_class, remove_class) {
    // grabbing the end style
    var dummy = this._dummy().addClass(add_class||'').removeClass(remove_class||'');
    var style = this._getStyle(dummy, this.STYLES);
    dummy.remove();
    
    // wiring the classes add/remove on-finish
    if (add_class)    this.onFinish(this.element.addClass.bind(this.element, add_class));
    if (remove_class) this.onFinish(this.element.removeClass.bind(this.element, remove_class));
    
    return this.$super(style);
  }
});