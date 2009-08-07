/**
 * Bounce visual effect, slightly moves an element forward and back
 *
 * @copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
Fx.Bounce = new Class(Fx, {
  extend: {
    Options: Object.merge(Fx.Options, {
      duration:  'short',
      direction: 'top',
      value:     10 // the shake distance
    })
  },
  
  prepare: function(value) {
    value = value || this.options.value;
    
    var position = this.element.position();
    var duration = Fx.Durations[this.options.duration]     || this.options.duration;
    var move_options = {duration: duration, position: 'relative'};
    
    var key = 'y'; // top bounce by default
    
    switch (this.options.direction) {
      case 'right':
        value = -value;
      case 'left':
        key = 'x';
        break;
      case 'bottom':
        value = -value;
    }
    
    var up_pos = {}, down_pos = {};
    up_pos[key]   = -value;
    down_pos[key] = value;
    
    this.fxUp   = new Fx.Move(this.element, move_options).start(up_pos);
    this.fxDown = new Fx.Move(this.element, move_options).start(down_pos);
    
    return this.finish();
  }
});