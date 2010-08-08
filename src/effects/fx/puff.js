/**
 * The puff visual effect
 *
 * Copyright (C) 2009-2010 Nikolay V. Nemshilov
 */
Fx.Puff = new Class(Fx.Zoom, {
  extend: {
    Options: Object.merge(Fx.Zoom.Options, {
      size: 1.4  // the end/initial size of the element
    })
  },
  
// protected

  prepare: function(in_how) {
    var how = in_how || 'toggle', opacity = 0, size = this.options.size, initial_style;
    
    if (how == 'out' || (how == 'toggle' && this.element.visible())) {
      initial_style = this.getEndPosition(this._getZoomedStyle(1));
      this.onFinish(function() {
        initial_style.opacity = 1;
        this.element.hide().setStyle(initial_style);
      });
      
    } else {
      this.element.setStyle('visibility: visible').show();
      
      var width = this.element.offsetWidth;
      initial_style = this.getEndPosition(this._getZoomedStyle(1));
      
      this.onFinish(function() {
        this.element.setStyle(initial_style);
      });
      
      this.element.setStyle(Object.merge(
        this.getEndPosition(this._getZoomedStyle(size)), {
          opacity: 0,
          visibility: 'visible'
        }
      ));
      
      size = width / this.element.offsetWidth;
      opacity = 1;
    }
    
    
    return this.$super(size, {opacity: opacity});
  }
  
});