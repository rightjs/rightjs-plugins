/**
 * Number to JSON export
 *
 * @copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
Number.prototype.toJSON = function() { return String(this+0); };