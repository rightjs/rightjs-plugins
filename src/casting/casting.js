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
 * Copyright (C) 2010-2011 Alexey Dubinin <LemmingKing at ya dot ru>
 * Copyright (C) 2010-2011 Nikolay Nemshilov
 */

var id_matchers    = null,
    css_matchers   = null,
    class_matchers = null,
    current_doc    = RightJS.$(document),
    Wrappers       = RightJS.Element.Wrappers;

RightJS.$ext(Wrappers, {

  /**
   * Register a new wrapper
   *
   * @param String css-rule
   * @param Function dom-wrapper
   * @return Element.Wrappers object
   */
  add: function(css_rule, klass) {
    var match = css_rule.match(/^[a-z]+$/i);

    if (match) { // Tag-name
      Wrappers[css_rule.toUpperCase()] = klass;
    } else if ((match = css_rule(/^([a-z])?\#[a-z0-9_\-]+$/))) {
      if (id_matchers === null) { id_matchers = {}; }
      id_matchers[css_rule] = klass;
    } else if ((match = css_rule(/^([a-z])?\.[a-z0-9_\-]+$/))) {
      if (class_matchers === null) { class_matchers = {}; }
      class_matchers[css_rule] = klass;
    } else {
      if (css_matchers === null) { css_matchers = {}; }
      css_matchers[css_rule] = klass;
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
    if (css_rule.toUpperCase() in Wrappers) {
      delete(Wrappers[css_rule.toUpperCase()]);
    } else if (id_matchers !== null && (css_rule in id_matchers)) {
      delete(id_matchers[css_rule]);
    } else if (class_matchers !== null && (css_rule in class_matchers)) {
      delete(class_matchers[css_rule]);
    } else if (css_matchers !== null && (css_rule in css_matchers)) {
      delete(css_matchers[css_rule]);
    }

    return Wrappers;
  },

  /**
   * Checks if the css-rule is registered
   *
   * @param String css_rule
   * @return Boolean check result
   */
  has: function(css_rule) {
    return (css_rule.toUpperCase() in Wrappers) ||
      (id_matchers !== null && (css_rule in id_matchers)) ||
      (css_matchers !== null && (css_rule in css_matchers)) ||
      (class_matchers !== null && (css_rule in class_matchers));
  }
});


/**
 * Replacing the original casting method
 * with a new one that supporst all the other types of casting
 *
 * @param HTMLElement raw dom-element
 * @return Function wrapper class or undefined
 */
RightJS.Wrapper.Cast = function(element) {
  if (css_matchers !== null) {
    for (var css_rule in css_matchers) {
      if (current_doc.find(css_rule, true).indexOf(element) !== -1) {
        return css_matchers[css_rule];
      }
    }
  }

  var key, tag;

  if (class_matchers !== null && element.className) {
    var classes = element.className.split(/\s+/), i=0;

    tag = element.tagName.toLowerCase();

    for (; i < classes.length; i++) {
      key = "." + classes[i];
      if (key in class_matchers) {
        return class_matchers[key];
      }

      key = tag + key;
      if (key in class_matchers) {
        return class_matchers[key];
      }
    }
  }

  if (id_matchers !== null && element.id) {
    key = '#'+ element.id;
    tag = element.tagName.toLowerCase();

    if (key in id_matchers) {
      return id_matchers[key];
    }

    key = tag + key;
    if (key in id_matchers) {
      return id_matchers[key];
    }
  }

  return (element.tagName in Wrappers) ? Wrappers[element.tagName] : undefined;
};
