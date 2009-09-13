/**
 * The bahave library string level shortcuts, mean to create behaviors like that
 *
 * USAGE:
 *   "div#sidebar ul li".behave('click', function() {...});
 *
 *   "div#sidebar ul li".stopBehave('click', function() {...});
 *
 * Copyright (C) 2009 Nikolay V Nemshilov aka St.
 */
$ext(String.prototype, {
  /**
   * Starts behavior
   *
   * Takes all the same params as the {Behavior#on} method
   */
  behave: function() {
    return Behavior.add.apply(Behavior, [''+this].concat($A(arguments)));
  },
  
  /**
   * Stops a behavior
   *
   * Takes all the same params as the {Behavior#stop} method
   */
  stopBehave: function() {
    return Behavior.stop.apply(Behavior, [''+this].concat($A(arguments)));
  }
});