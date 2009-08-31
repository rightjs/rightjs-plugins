/**
 * run out and run in efffects
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
Fx.Run = new Class(Fx.Move, {
  extend: {
    Options: Object.merge(Fx.Move.Options, {
      direction: 'left'
    })
  },
  
  prepare: function(how) {
    var how = how || 'toggle', position = {}, dimensions = this.element.dimensions(), threshold = 80;
    
    if (how == 'out' || (how == 'toggle' && this.element.visible())) {
      if (this.options.direction == 'left') {
        position.x = -dimensions.width - threshold;
      } else {
        position.y = -dimensions.height - threshold;
      }
      this.onFinish(function() {
        this.element.hide().setStyle(this.getEndPosition({x: dimensions.left, y: dimensions.top}));
      })
    } else {
      dimensions = this.element.setStyle('visibility: hidden').show().dimensions();
      var pre_position = {};
      
      if (this.options.direction == 'left') {
        pre_position.x = - dimensions.width - threshold;
        position.x = dimensions.left;
      } else {
        pre_position.y = - dimensions.height - threshold;
        position.y = dimensions.top;
      }
      
      this.element.setStyle(this.getEndPosition(pre_position)).setStyle('visibility: visible');
    }
    
    return this.$super(position);
  }
});