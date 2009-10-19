/**
 * The ruby on rails extensions test
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
var RailsTest = TestCase.create({
  name: 'RailsTest',
  
  assertAliases: function(object, names) {
    if (isArray(names)) {
      names.each(function(name) {
        this.assert(object[name.underscored()] === object[name], "checking alias for '"+name+"' -> '"+name.underscored()+"'");
      }, this);
    } else {
      for (new_name in names) {
        this.assert(object[new_name] === object[names[new_name]], "checking alias for '"+name+"' -> '"+new_name+"'");
      }
    }
    
  },
  
  testStringAliases: function() {
    this.assertAliases(String.prototype, $w('startsWith endsWith indexOf lastIndexOf evalScripts'));
  },
  
  testArrayAliases: function() {
    this.assertAliases(Array.prototype, $w('sortBy indexOf lastIndexOf'));
  },
  
  testGlobalAliases: function() {
    this.assertAliases(window, $w('isArray isHash isFunction'));
  },
  
  testOptionsAliases: function() {
    this.assertAliases(Options, $w('setOptions'));
  },
  
  testObserverAliases: function() {
    this.assertAliases(Observer.prototype, $w('stopObserving'));
  },
  
  testElementAliases: function() {
    this.assertAliases(Element.Methods, $w('addClass hasClass setClass removeClass'));
  },
  
  testFormAliases: function() {
    this.assertAliases(Form.Methods, $w('onSubmit'));
  },
  
  testFormElementAliases: function() {
    this.assertAliases(Form.Element.Methods, $w('onChange'));
  },
  
  testRubyAliases: function() {
    this.assertAliases(String.prototype, {
      to_f:     'toFloat',
      to_i:     'toInt',
      gsub:     'replace',
      downcase: 'toLowerCase',
      upcase:   'toUpperCase',
      index:    'indexOf',
      rindex:   'lastIndexOf',
      strip:    'trim'
    });
    
    this.assertAliases(Array.prototype, {
      collect:  'map',
      detect:   'filter',
      index:    'indexOf',
      rindex:   'lastIndexOf'
    });
  }
});