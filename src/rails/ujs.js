/**
 * Rails 3 UJS support module
 *
 * Copyright (C) 2010-2012 Nikolay Nemshilov
 */
// tries to cancel the event via confirmation
function user_cancels(event, element) {
  var message = element.get('data-confirm');
  if (message && !confirm(message)) {
    event.stop();
    return true;
  }
}

// adds XHR events to the element
function add_xhr_events(element, options) {
  return Object.merge({
    onCreate:   function() {
      disable_with(element);
      element.fire('ajax:loading',  {xhr: this});
    },
    onComplete: function() {
      enable_with(element);
      element.fire('ajax:complete', {xhr: this});
    },
    onSuccess:  function() { element.fire('ajax:success',  {xhr: this}); },
    onFailure:  function() { element.fire('ajax:failure',  {xhr: this}); }
  }, options);
}

// handles the data-disable-with option
function disable_with(element) {
  get_disable_with_elements(element).each(function(element) {
    var method = element instanceof Input ? 'value' : 'html';
    element.__disable_with_html = element[method]();
    element[method](element.get('data-disable-with'));
  });
}

// restores the elements state after the data-disable-with option
function enable_with(element) {
  get_disable_with_elements(element).each(function(element) {
    if (element.__disable_with_html !== undefined) {
      var method = element instanceof Input ? 'value' : 'html';
      element[method](element.__disable_with_html);
      delete(element.__disable_with_html);
    }
  });
}

// finds all the suitable disable-with targets
function get_disable_with_elements(element) {
  return element.has('data-disable-with') ?
    R([element]) : element.find('*[data-disable-with]');
}

// processes link clicks
function try_link_submit(event, link) {
  var url    = link.get('href'),
      method = link.get('data-method'),
      remote = link.get('data-remote'),
      token  = get_csrf_token();

  if (user_cancels(event, link)) { return; }
  if (method || remote) { event.stop(); }

  if (remote) {
    Xhr.load(url, add_xhr_events(link, {
      method:  method || 'get',
      spinner: link.get('data-spinner'),
      params:  new Function('return {"'+ token[0] +'": "'+ token[1] +'"}')()
    }));

  } else if (method) {
    var form  = $E('form', {action: url, method: 'post'});

    if (token) {
      form.insert('<input type="hidden" name="'+token[0]+'" value="'+token[1]+'" />');
    }

    form.insert('<input type="hidden" name="_method" value="'+method+'"/>')
      .insertTo(document.body).submit();

    disable_with(link);
  }
}

function get_csrf_token() {
  var param, token;

  param = $$('meta[name=csrf-param]')[0];
  token = $$('meta[name=csrf-token]')[0];

  param = param && param.get('content');
  token = token && token.get('content');

  if (param && token) {
    return [param, token];
  }
}

// global events listeners
$(document).on({
  ready: function() {
    var token   = get_csrf_token(), i = 0, xhr,
        modules = ['InEdit', 'Rater', 'Sortable'];

    if (token) {
      for (; i < modules.length; i++) {
        if (modules[i] in RightJS) {
          xhr = RightJS[modules[i]].Options.Xhr;

          if (RightJS.isHash(xhr)) {
            xhr.params = Object.merge(xhr.params, {});
            xhr.params[token[0]] = token[1];
          }
        }
      }
    }
  },

  click: function(event) {
    var link = event.find('a');
    if (link) {
      try_link_submit(event, link);
    }
  },

  submit: function(event) {
    var form = event.target;
    if (form.has('data-remote') && !user_cancels(event, form)) {
      event.stop();
      form.send(add_xhr_events(form, {
        spinner:  form.get('data-spinner') || form.first('.spinner')
      }));
    }
  }
});