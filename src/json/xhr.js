/**
 * Better JSON sanitizing for the Xhr requests
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov
 */
Xhr.prototype.sanitizedJSON = function() {
  try {
    return JSON.decode(this.text);
  } catch(e) {
    if (this.secureJSON) {
      throw e;
    } else {
      return null;
    }
  }
};