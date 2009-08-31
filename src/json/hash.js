/**
 * The Hash instances to JSON export
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov
 */
if (window['Hash']) {
  window['Hash'].prototype.toJSON = function() {
    return window['JSON'].encode(this.toObject());
  };
}