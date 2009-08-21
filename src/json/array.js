/**
 * Array instances to JSON export
 *
 * @copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
Array.prototype.toJSON = function() {
  return '['+this.map(JSON.encode).join(',')+']'
};