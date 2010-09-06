/**
 * Rails 3 UJS support module
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
(function() {
  // tries to cancel the event via confirmation
  var user_cancels = function(event, element) {
    var message = element.get('data-confirm');
    if (message && !confirm(message)) {
      event.stop();
      return true;
    }
  };
  
  // adds XHR events to the element
  var add_xhr_events = function(element, options) {
    return Object.merge({
      onCreate:   function() { element.fire('ajax:loading',  this); },
      onComplete: function() { element.fire('ajax:complete', this); },
      onSuccess:  function() { element.fire('ajax:success',  this); },
      onFailure:  function() { element.fire('ajax:failure',  this); }
    }, options);
  };
  
  // processes link clicks
  var try_link_submit = function(event) {
    var link   = event.target,
        method = link.get('data-method'),
        remote = link.get('data-remote'),
        url    = link.get('href');
    
    if (user_cancels(event, link)) { return; }
    if (method || remote) { event.stop(); }
    
    if (remote) {
      Xhr.load(url, add_xhr_events(link, {
        method:     method || 'get',
        spinner:    link.get('data-spinner')
      }));
      
    } else if (method) {
      var param = $$('meta[name=csrf-param]')[0],
          token = $$('meta[name=csrf-token]')[0],
          form  = $E('form', {action: url, method: 'post'});
      
      if (param && token) {
        form.insert('<input type="hidden" name="'+param.get('content')+'" value="'+token.get('content')+'" />');
      }
      
      form.insert('<input type="hidden" name="_method" value="'+method+'"/>')
        .insertTo(document.body).submit();
    }
  };

  // global events listeners
  $(document).on({
    click: function(event) {
      var tag = event.target._.tagName;
      if (tag === 'A' || tag === 'BUTTON') {
        try_link_submit(event);
      }
    },
    
    submit: function(event) {
      var form = event.target;
      if (form.has('data-remote') && !user_cancels(event, form)) {
        event.stop();
        form.send(add_xhr_events(form));
      }
    }
  });
})();
