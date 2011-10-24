/**
 * RR is the common ajax operations wrapper for ruby on rails
 *
 * Copyright (C) 2009-2010 Nikolay Nemshilov
 */
var RR = {
  /**
   * Basic options
   *
   * NOTE: DO NOT CHANGE this hash right here
   *       Use your application.js file to alter the options
   */
  Options: {
    format:           'js',      // the working format for remote requests over the application

    flashId:          'flashes', // the flashes element id
    flashHideFx:      'slide',   // use null if you don't want any fx in here
    flashHideDelay:   3200,      // use -1 to disable the flash element hidding

    highlightUpdates: true,

    removeFx:         'fade',    // blocks removing fx
    insertFx:         'fade',    // blocks insertion fx

    insertPosition:   'bottom',  // default insert position

    linkToAjaxEdit:   '.ajax_edit',
    linkToAjaxDelete: '.ajax_delete',

    rescanWithScopes: true       // if it should rescan only updated elements
  },

  /**
   * Updates the flashes block with the source
   *
   * @param String new content
   * @return RR this
   */
  update_flash: function(content) {
    var element = $(this.Options.flashId);
    if (element) {
      this.replace(element, content).hide_flash();
    }
    return this;
  },

  /**
   * Initializes the delayed flashes hide call
   *
   * @return RR this
   */
  hide_flash: function() {
    if (this.Options.flashHideDelay > -1) {
      var element = $(this.Options.flashId);
      if (element && element.visible()) {
        element.hide.bind(element, this.Options.flashHideFx).delay(this.Options.flashHideDelay);
      }
    }
    return this;
  },

  /**
   * Highlights the element according to the options
   *
   * @param String element id
   * @return RR this
   */
  highlight: function(id) {
    if ($(id) && this.Options.highlightUpdates) {
      $(id).highlight();
    }
    return this;
  },

  /**
   * Inserts the content into the given element
   *
   * @param destination String destination id
   * @param content String content
   * @param position String position
   * @return RR this
   */
  insert: function(where, what, in_position) {
    var position  = in_position || this.Options.insertPosition, new_element,
        container = $(where).insert(what, position);

    // trying to find the new block
    switch (position) {
      case 'bottom':  new_element = container.children().last(); break;
      case 'top':     new_element = container.first(); break;
      case 'before':  new_element = container.prev();  break;
      case 'after':   new_element = container.next();  break;
    }

    // necely displaying the new block
    if (new_element && this.Options.insertFx) {
      new_element.hide().show(this.Options.insertFx, {
        onFinish: this.highlight.bind(this, new_element)
      });
    } else {
      this.highlight(new_element);
    }

    return this.rescan(where);
  },

  /**
   * Replaces the given element with a new content
   *
   * @param destination String destination id
   * @param content String content
   * @return RR this
   */
  replace: function(id, source) {
    $(id).replace(source);
    return this.highlight(id).rescan(id);
  },

  /**
   * removes the element by id
   *
   * @param String element id
   * @return RR this
   */
  remove: function(id) {
    if ($(id)) {
      $(id).remove(this.Options.removeFx);
    }
  },

  /**
   * Makes a remote form out of the form
   *
   * @param String form id
   * @return RR this
   */
  remotize_form: function(id) {
    var form = $(id);
    if (form) {
      form.remotize().enable()._.action += '.'+this.Options.format;
    }
    return this;
  },

  /**
   * Replaces the form with new content and makes it remote
   *
   * @param form id String form id
   * @param content String content
   * @return RR this
   */
  replace_form: function(id, source) {
    var form = $(id);
    if (form) {
      form.replace(source);
      this.remotize_form(id);
    }

    return this.rescan(id);
  },

  /**
   * Inserts the form source into the given element
   *
   * @param target id String target id
   * @param source String form source
   * @return RR this
   */
  show_form_for: function(id, source) {
    $(id).find('form').each('remove'); // removing old forms
    $(id).insert(source);

    return this.remotize_form($(id).first('form')).rescan(id);
  },

  /**
   * watches link clicks and processes the ajax edit/delete operations
   *
   * @param Event event
   */
  process_click: function(event) {
    var link;

    if ((link = event.find('a'+ this.Options.linkToAjaxEdit))) {
      event.stop();
      Xhr.load(link.get('href') + '.' + this.Options.format);
    } else if ((link = event.find('a'+ this.Options.linkToAjaxDelete)) && link.has('onclick')) {
      event.stop();
      new Function('return '+ link.onclick.toString().replace('.submit', '.send'))().call(link);
    }
  },

  /**
   * Scans for updated elements
   *
   * @return RR this
   */
  rescan: function(scope) {
    $w('Draggable Droppable Tabs Tags Selectable').each(function(name) {
      if (name in window) {
        window[name].rescan(this.Options.rescanWithScopes ? scope : null);
      }
    }, this);


    return this;
  }
};
