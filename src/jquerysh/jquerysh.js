/**
 * The plugin's definition
 *
 * Copyright (C) 2011 Nikolay Nemshilov
 */
RightJS.jQuerysh = {
  version: '2.2.0',

  // collection methods
  collectionMethods: {
    live: function(event, callback) {
      this.cssRule.on(event, callback);
      return this;
    },

    die: function(event, callback) {
      this.cssRule.stopObserving(event, callback);
      return this;
    }
  }
};