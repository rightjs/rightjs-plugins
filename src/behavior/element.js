/**
 * The Element unit wrapups for automaticall behaves processing on the page updates
 *
 * Copyright (C) 2009-2010 Nikolay V. Nemshilov
 */
Element.include((function(old_methods) {
  var old_insert = old_methods.insert;
  var old_update = old_methods.update;
  
return {
  insert: function() {
    old_insert.apply(this, arguments);
    Behavior.refresh();
    
    return this;
  },
  
  update: function(content) {
    old_update.apply(this, arguments);
    if (isString(content)) Behavior.refresh();
    
    return this;
  }
};
  
})(Element.Methods));