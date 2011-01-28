/**
 * Overloading the Element#on method to handle those fancy names
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
[RightJS.Document, RightJS.Element, RightJS.Window].each('include', {
  on: function() {
    var args = RightJS.$A(arguments), name = args[0];

    if (typeof(name) === 'string') {
      var key = name.split(/[\+\-\_ ]+/);
      key = (key[key.length - 1] || '').toUpperCase();

      if (key in RightJS.Event.Keys || /^[A-Z0-9]$/.test(key)) {
        var meta   = /(^|\+|\-| )(meta)(\+|\-| )/i.test(name),
            alt    = /(^|\+|\-| )(alt)(\+|\-| )/i.test(name),
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
            (!alt   || raw.altKey) &&
            (!meta  || raw.metaKey) &&
            (!ctrl  || raw.ctrlKey) &&
            (!shift || raw.shiftKey)
          ) {
            return method.call(this, [event].concat(orig));
          }
        }];
      }
    }

    return this.$super.apply(this, args);
  }
});
