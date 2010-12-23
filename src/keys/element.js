/**
 * Overloading the Element#on method to handle those fancy names
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
var old_on = RightJS.Element.prototype.on;

RightJS.Document.prototype.on =
RightJS.Element.prototype.on  =
RightJS.Window.prototype.on   = function() {
  var args = RightJS.$A(arguments), name = args[0];

  if (typeof(name) === 'string') {
    var key = name.split(/[\+\-\_ ]+/);
    key = (key[key.length - 1] || '').toUpperCase();

    if (key in RightJS.Event.Keys || /^[A-Z0-9]/.test(key)) {
      var meta   = /(^|\+|\-| )(alt|meta)(\+|\-| )/i.test(name),
          ctrl   = /(^|\+|\-| )(ctl|ctrl)(\+|\-| )/i.test(name),
          shift  = /(^|\+|\-| )(shift)(\+|\-| )/i.test(name),
          code   = RightJS.Event.Keys[key] || key.charCodeAt(0),
          orig   = args.slice(1),
          method = orig.shift();

      if (typeof(method) === 'string') {
        method = this[method] || function() {};
      }

      // replacing the arguments
      args = ['keydown', function(event) {
        var raw = event._;
        if (
          (raw.keyCode === code) &&
          (!meta  || raw.metaKey) &&
          (!ctrl  || raw.ctrlKey) &&
          (!shift || raw.shiftKey)
        ) {
          return method.call(this, [event].concat(orig));
        }
      }];
    }
  }

  return old_on.apply(this, args);
};