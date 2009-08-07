/**
 * Zoom visual effect, graduately zoom and element in or out
 *
 * @copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
Fx.Zoom = new Class(Fx.Move, {
  PROPERTIES: $w('width height lineHeight paddingTop paddingRight paddingBottom paddingLeft fontSize borderWidth'),
  
  extend: {
    Options: Object.merge(Fx.Move.Options, {
      position: 'relative', // overriding the Fx.Move default
      duration: 'normal',
      from:     'center'
    })
  },
  
  prepare: function(size) {
    var proportion = this._getProportion(size);

    return this.$super(Object.merge(
      this._getBasicStyle(proportion),
      this._getEndPosition(proportion)
    ));
  },
  
// private

  // calculates the zooming proportion
  _getProportion: function(size) {
    if (isHash(size)) {
      var sizes = $E('div').insertTo(
        $E('div', {style: "visibility:hidden;float:left;height:0;width:0"}).insertTo(document.body)
      ).setStyle(size).sizes();
      
      if ('height' in size) size = sizes.y / this.element.sizes().y;
      else                  size = sizes.x / this.element.sizes().x;
    } else if (isString(size)) {
      size  = size.endsWith('%') ? size.toFloat() / 100 : size.toFloat();
    }
    
    return size;
  },
  
  // getting the basic end style
  _getBasicStyle: function(proportion) {
    var style = this._getStyle(this.element, this.PROPERTIES);
    
    this._cleanStyle(style);
    
    for (var key in style) {
      if (style[key][0] > 0) {
        style[key] = (style[key][0] * proportion) + style[key][1];
      } else {
        delete(style[key]);
      }
    }
    
    return style;
  },
  
  // getting the position adjustments
  _getEndPosition: function(proportion) {
    var position = {x: undefined, y: undefined};
    var sizes    = this.element.sizes();
    var x_diff   = sizes.x * (proportion - 1);
    var y_diff   = sizes.y * (proportion - 1);
    
    switch (this.options.from.replace('-', ' ').split(' ').sort().join('_')) {
      case 'top':
        position.x = - x_diff / 2;
        break;
        
      case 'right':
        position.x = - x_diff;
        position.y = - y_diff / 2;
        break;
        
      case 'bottom':
        position.x = - x_diff / 2;
      case 'bottom_left':
        position.y = - y_diff;
        break;
        
      case 'bottom_right':
        position.y = - y_diff;
      case 'right_top':
        position.x = - x_diff;
        break;
        
      case 'center':
        position.x = - x_diff / 2;
      case 'left':
        position.y = - y_diff / 2;
        break;
        
      default: // left_top or none, do nothing, let the thing expand as is
    }
    
    return position;
  }
});