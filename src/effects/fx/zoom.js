/**
 * Zoom visual effect, graduately zoom and element in or out
 *
 * @copyright (C) 2009-2010 Nikolay V. Nemshilov
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
  
  prepare: function(size, additional_styles) {
    return this.$super(this._getZoomedStyle(size, additional_styles));
  },
  
// private

  // calculates the end zoommed style
  _getZoomedStyle: function(size, additional_styles) {
    var proportion = this._getProportion(size);
    
    return Object.merge(
      this._getBasicStyle(proportion),
      this._getEndPosition(proportion),
      additional_styles || {}
    );
  },

  // calculates the zooming proportion
  _getProportion: function(size) {
    if (isHash(size)) {
      var sizes = $E('div').insertTo(
        $E('div', {style: "visibility:hidden;float:left;height:0;width:0"}).insertTo(document.body)
      ).setStyle(size).sizes();
      
      if (size.height) { size = sizes.y / this.element.sizes().y; }
      else             { size = sizes.x / this.element.sizes().x; }
    } else if (isString(size)) {
      size  = R(size).endsWith('%') ? R(size).toFloat() / 100 : R(size).toFloat();
    }
    
    return size;
  },
  
  // getting the basic end style
  _getBasicStyle: function(proportion) {
    var style = this._cloneStyle(this.element, this.PROPERTIES), re = /([\d\.]+)/g;
    
    function adjust_value(m) {
      return ''+ (R(m).toFloat() * proportion);
    }
    
    for (var key in style) {
      if (key === 'width' || key === 'height') {
        style[key] = style[key] || (this.element['offset'+R(key).capitalize()]+'px');
      }
      
      if (style[key].match(re)) {
        style[key] = style[key].replace(re, adjust_value);
      } else {
        delete(style[key]);
      }
    }
    
    // preventing the border disappearance
    if (style.borderWidth && R(style.borderWidth).toFloat() < 1) {
      style.borderWidth = '1px';
    }
    
    return style;
  },
  
  // getting the position adjustments
  _getEndPosition: function(proportion) {
    var position = {};
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