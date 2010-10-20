/**
 * Advanced Elements typecasting feature.
 * Basically it allows you to handle all sorts of css-rules with dom-wrappers
 *
 * USAGE:
 *
 *   Element.Wrappers.add('div#boo.hoo', new Class(Element, {
 *     // here you go
 *   }));
 *
 *   Element.Wrappers.remove('div#boo.hoo');
 *
 *
 * Copyright (C) 2010 Alexey Dubinin <LemmingKing at ya dot ru>
 * Copyright (C) 2010 Nikolay Nemshilov
 */

$ext(Wrappers, {

  _id:    null,
  _css:   null,
  _class: null,

  /**
   * Register a new wrapper
   *
   * @param String css-rule
   * @param Function dom-wrapper
   * @return Element.Wrappers object
   */
  add: function(css_rule, klass) {
    var match = css_rule.match(/^[a-z]+$/);

    if (match) {
      Wrappers[css_rule.toUpperCase()] = klass;
    } else if ((match = css_rule(/^([a-z])?\#[a-z0-9_\-]+$/))) {
      if (!('_id' in Wrappers)) { Wrappers._id = {}; }
      Wrappers._id[css_rule] = klass;
    } else if ((match = css_rule(/^([a-z])?\.[a-z0-9_\-]+$/))) {
      if (!('_class' in Wrappers)) { Wrappers._class = {}; }
      Wrappers._class[css_rule] = klass;
    } else {
      if (!('_css' in Wrappers)) { Wrappers._css = {}; }
      Wrappers._css[css_rule] = klass;
    }

    return Wrappers;
  },

  /**
   * Removes the dom-wrapper
   *
   * @param String css-rule
   * @return Element.Wrappers object
   */
  remove: function(css_rule) {

    if (css_rule in Wrappers) {
      delete(Wrappers[css_rule]);
    } else if (Wrappers._id && (css_rule in Wrappers._id)) {
      delete(Wrappers._id[css_rule]);
    } else if (Wrappers._css && (css_rule in Wrappers._css)) {
      delete(Wrappers._css[css_rule]);
    } else if (Wrappers._class && (css_rule in Wrappers._class)) {
      delete(Wrappers._class[css_rule]);
    }

    return Wrappers;
  }
});


/**
 * Replacing the original casting method
 * with a new one that supporst all the other types of casting
 *
 * @param HTMLElement raw dom-element
 * @return Function wrapper class or undefined
 */
Wrapper.Cast = function(element) {

  if (Wrappers._css !== null) {
    for (var css_rule in Wrappers._css) {
      if (element_match(css_rule, element)) {
        return Wrappers._css[css_rule];
      }
    }
  }

  if (Wrappers._class !== null && element.className) {
    var classes = element.className.split(/\s+/), key, i=0, tag = element.tagName.toLowerCase();

    for (; i<classes.length; i++) {
      key = "." + classes[i];
      if (key in Wrappers._class) {
        return Wrappers._class[key];
      }

      key = tag + key;
      if (key in Wrappers._class) {
        return Wrappers._class[key];
      }
    }
  }

  if (Wrappers._id !== null && element.id) {
    var key = '#'+ element.id, tag = element.tagName.toLowerCase();

    if (key in Wrappers._id) {
      return Wrappers._id[key];
    }

    key = tag + key;
    if (key in Wrappers._id) {
      return Wrappers._id[key];
    }
  }

  return (element.tagName in Wrappers) ? Wrappers[element.tagName] : undefined;
};


function element_match(css_rule, element) {
  // todo, make it happen
}