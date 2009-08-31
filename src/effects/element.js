/**
 * Element shortcuts for the additional effects
 *
 * @copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
Element.addMethods({
  /**
   * The move visual effect shortcut
   *
   * @param Object end position x/y or top/left
   * @param Object fx options
   * @return Element self
   */
  move: function(position, options) {
    return this.fx('move', [position, options || {}]); // <- don't replace with arguments
  },
  
  /**
   * The bounce effect shortcut
   *
   * @param Number optional bounce size
   * @param Object fx options
   * @return Element self
   */
  bounce: function() {
    return this.fx('bounce', arguments);
  },
  
  /**
   * The zoom effect shortcut
   *
   * @param mixed the zooming value, see Fx.Zoom#start options
   * @param Object fx options
   * @return Element self
   */
  zoom: function(size, options) {
    return this.fx('zoom', [size, options || {}]);
  },
  
  /**
   * Initiates the Fx.Run effect
   *
   * @param String running direction
   * @param Object fx options
   * @return Element self
   */
  run: function() {
    return this.fx('run', arguments);
  },
  
  /**
   * The puff effect shortcut
   *
   * @param String running direction in|out|toggle
   * @param Object fx options
   * @return Element self
   */
  puff: function() {
    return this.fx('puff', arguments);
  }
});