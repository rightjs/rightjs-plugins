/**
 * Handles the to-class and from-class visual effects
 *
 * Copyright (C) 2009-2010 Nikolay Nemshilov
 */
Fx.Css = Fx.CSS = new Class(Fx.Morph, {
  STYLES: $w('width height lineHeight opacity border padding margin color fontSize background top left right bottom'),
  
// protected
  
  prepare: function(add_class, remove_class) {
    this.addClass    = add_class    || '';
    this.removeClass = remove_class || '';
    
    // wiring the classes add/remove on-finish
    if (add_class)    { this.onFinish(this.element.addClass.bind(this.element, add_class));       }
    if (remove_class) { this.onFinish(this.element.removeClass.bind(this.element, remove_class)); }
    
    return this.$super({});
  },
  
  // hacking the old method to make it apply the classes
  _endStyle: function(style, keys) {
    var element = this.element, dummy  = $(element._.cloneNode(true))
        .setStyle('position:absolute;z-index:-1;visibility:hidden')
        .setWidth(element.sizes().x)
        .addClass(this.addClass).removeClass(this.removeClass);
        
    if (element._.parentNode) { element.insert(dummy, 'before'); }
    
    var after  = this._cloneStyle(dummy, keys);
    
    dummy.remove();
    
    return after;
  },
  
  // replacing the old method to make it return our own list of properties
  _styleKeys: function() {
    var hash = {};
    this.STYLES.each(function(name) {
      hash[name] = 1;
    });
    
    return this.$super(hash);
  }
});