/**
 * The basic move visual effect
 *
 * @copyright (C) 2009-2010 Nikolay V. Nemshilov
 */
Fx.Move = new Class(Fx.Morph, {
  extend: {
    Options: Object.merge(Fx.Options, {
      duration: 'long',
      position: 'absolute' // <- defines the positions measurment principle, not the element positioning
    })
  },
  
  prepare: function(end_position) {
    return this.$super(this.getEndPosition(end_position));
  },
  
  // moved to a separated method to be able to call it from subclasses
  getEndPosition: function(end_position) {
    var position = this.element.getStyle('position'), end_style = {};
    
    if (position != 'absolute' || position != 'relative') {
      this.element.style.position = position = position == 'fixed' ? 'absolute' : 'relative';
    }
    
    if (end_position.top)  end_position.y = end_position.top.toInt();
    if (end_position.left) end_position.x = end_position.left.toInt();
    
    // adjusting the end position
    var cur_position = this.element.position();
    var par_position = this.getParentPosition();
    var rel_left     = cur_position.x - par_position.x;
    var rel_top      = cur_position.y - par_position.y;
    
    if (this.options.position == 'relative') {
      if (position == 'absolute') {
        if (defined(end_position.x)) end_position.x += cur_position.x;
        if (defined(end_position.y)) end_position.y += cur_position.x;
      } else {
        if (defined(end_position.x)) end_position.x += rel_left;
        if (defined(end_position.y)) end_position.y += rel_top;
      }
    } else if (position == 'relative') {
      if (defined(end_position.x)) end_position.x += rel_left - cur_position.x;
      if (defined(end_position.y)) end_position.y += rel_top  - cur_position.y;
    }
    
    // need this to bypass the other styles from the subclasses
    for (var key in end_position) {
      switch (key) {
        case 'top': case 'left': break;
        case 'y':   end_style.top  = end_position.y + 'px'; break;
        case 'x':   end_style.left = end_position.x + 'px'; break;
        default:    end_style[key] = end_position[key];
      }
    }
    
    return end_style;
  },
  
  getParentPosition: function() {
    Fx.Move.Dummy = Fx.Move.Dummy || new Element('div', {style: 'width:0;height:0;visibility:hidden'});
    this.element.insert(Fx.Move.Dummy, 'before');
    var position = Fx.Move.Dummy.position();
    Fx.Move.Dummy.remove();
    return position;
  }
});