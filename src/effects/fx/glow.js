/**
 * Glow effect, kinda the same thing as Hightlight, but changes the text color
 *
 * Copyright (C) 2011 Nikolay Nemshilov
 */
Fx.Glow = new Class(Fx.Morph, {
  extend: {
    Options: Object.merge(Fx.Options, {
      color:      '#FF8',
      transition: 'Exp'
    })
  },

  // protected

  /**
   * starts the transition
   *
   * @param high String the hightlight color
   * @param back String optional fallback color
   * @return self
   */
  prepare: function(start, end) {
    var element       = this.element,
        element_style = element._.style,
        style_name    = 'color',
        end_color     = end || element.getStyle(style_name);

    // trying to find the end color
    end_color = [element].concat(element.parents())
      .map('getStyle', style_name)
      .compact().first() || '#FFF';

    element_style[style_name] = (start || this.options.color);

    return this.$super({color: end_color});
  }
});