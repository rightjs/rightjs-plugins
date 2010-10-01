RightJS([RightJS.Document, RightJS.Element]).each('include', {
  first: function(rule) {
    return this.find(rule)[0];
  },

  find: function(rule) {
    return RightJS(Sizzle(rule, this._)).map(RightJS.$);
  }
});