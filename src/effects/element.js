/**
 * Element shortcuts for the additional effects
 *
 * @copyright (C) 2009-2011 Nikolay Nemshilov
 */
RightJS.Element.include({
  /**
   * The move visual effect shortcut
   *
   * @param position Object end position x/y or top/left
   * @param options Object fx options
   * @return Element self
   */
  move: function(position, options) {
    return call_fx(this, 'move', [position, options || {}]); // <- don't replace with arguments
  },

  /**
   * The bounce effect shortcut
   *
   * @param Number optional bounce size
   * @param Object fx options
   * @return Element self
   */
  bounce: function() {
    return call_fx(this, 'bounce', arguments);
  },

  /**
   * The zoom effect shortcut
   *
   * @param mixed the zooming value, see Fx.Zoom#start options
   * @param Object fx options
   * @return Element self
   */
  zoom: function(size, options) {
    return call_fx(this, 'zoom', [size, options || {}]);
  },

  /**
   * Initiates the Fx.Run effect
   *
   * @param String running direction
   * @param Object fx options
   * @return Element self
   */
  run: function() {
    return call_fx(this, 'run', arguments);
  },

  /**
   * The puff effect shortcut
   *
   * @param String running direction in|out|toggle
   * @param Object fx options
   * @return Element self
   */
  puff: function() {
    return call_fx(this, 'puff', arguments);
  },

  /**
   * The Fx.Class effect shortcut
   *
   * @param add String css-class name to add
   * @param remove String css-class name to remove
   * @param Object fx options
   */
  morphToClass: function() {
    var args = $A(arguments);
    if (args[0] === null) { args[0] = ''; }

    return call_fx(this, 'CSS', args);
  }
});

/**
 * Runs Fx on the element
 *
 * @param Element element reference
 * @param String fx name
 * @param Array effect arguments
 * @return the element back
 */
function call_fx(element, name, params) {
  var args    = $A(params).compact(),
      options = isHash(args.last()) ? args.pop() : {},
      fx      = new Fx[name.capitalize()](element, options);

  fx.start.apply(fx, args);

  return element;
}
