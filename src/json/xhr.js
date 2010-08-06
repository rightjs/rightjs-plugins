/**
 * Better JSON sanitizing for the Xhr requests
 *
 * Copyright (C) 2009-2010 Nikolay Nemshilov
 */
if (RightJS.Xhr) {
  RightJS.Xhr.prototype.sanitizedJSON = function() {
    try {
      return JSON.decode(this.text);
    } catch(e) {
      if (this.secureJSON) { throw e; }
      return null;
    }
  };
}
