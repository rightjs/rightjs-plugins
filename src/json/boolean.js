/**
 * The boolean types to prototype export
 *
 * @copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
Boolean.prototype.toJSON = function() { return String(this); };