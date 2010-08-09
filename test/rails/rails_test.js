/**
 * The ruby on rails extensions test
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
var RailsTest = TestCase.create({
  name: 'RailsTest',
  
  assertAliases: function(object, names) {
    if (RightJS.isString(names)) {
      RightJS.$w(names).each(function(name) {
        this.assert(object[RightJS(name).underscored()] === object[name],
          "checking alias for '"+name+"' -> '"+RightJS(name).underscored()+"'");
      }, this);
    } else {
      for (new_name in names) {
        this.assert(object[new_name] === object[names[new_name]], "checking alias for '"+name+"' -> '"+new_name+"'");
      }
    }
    
  },
  
  testStringAliases: function() {
    this.assertAliases(RightJS.String.prototype, 'startsWith endsWith indexOf lastIndexOf evalScripts');
  },
  
  testArrayAliases: function() {
    this.assertAliases(RightJS.Array.prototype, 'sortBy indexOf lastIndexOf');
  },
  
  testGlobalAliases: function() {
    this.assertAliases(window, 'isArray isHash isFunction');
  },
  
  testOptionsAliases: function() {
    this.assertAliases(RightJS.Options, 'setOptions');
  },
  
  testObserverAliases: function() {
    this.assertAliases(RightJS.Observer.prototype, 'stopObserving');
  },
  
  testElementAliases: function() {
    this.assertAliases(RightJS.Element.prototype, 'addClass hasClass setClass removeClass');
  },
  
  testFormAliases: function() {
    this.assertAliases(RightJS.Form.prototype, 'onSubmit');
  },
  
  testFormElementAliases: function() {
    this.assertAliases(RightJS.Input.prototype, 'onChange');
  },
  
  testRubyAliases: function() {
    this.assertAliases(RightJS.String.prototype, {
      to_f:     'toFloat',
      to_i:     'toInt',
      gsub:     'replace',
      downcase: 'toLowerCase',
      upcase:   'toUpperCase',
      index:    'indexOf',
      rindex:   'lastIndexOf',
      strip:    'trim'
    });
    
    this.assertAliases(RightJS.Array.prototype, {
      collect:  'map',
      detect:   'filter',
      index:    'indexOf',
      rindex:   'lastIndexOf'
    });
  }
});