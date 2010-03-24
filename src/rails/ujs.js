/**
 * Rails 3 UJS support module
 *
 * Copyright (C) 2010 Nikolay V. Nemshilov
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
  
  // processes link clicks
  var try_link_submit = function(event, link) {
    if (user_cancels(event, link)) return;
    
    var method = link.get('data-method'), remote = link.get('data-remote');
    
    if (method || remote) event.stop();
    
    if (remote)
      Xhr.load(link.href, {
        method:     method || 'get',
        spinner:    link.get('data-spinner'),
        onCreate:   function() { link.fire('ajax:loading',  this) },
        onComplete: function() { link.fire('ajax:complete', this) },
        onSuccess:  function() { link.fire('ajax:success',  this) },
        onFailure:  function() { link.fire('ajax:failure',  this) }
      });
      
    else if (method) {
      var param = $$('meta[name=csrf-param]')[0],
          token = $$('meta[name=csrf-token]')[0],
          form  = $E('form', {action: link.href, method: 'post'});
      
      if (param && token)
        form.insert('<input type="hidden" name="'+param.get('content')+'" value="'+token.get('content')+'" />');
      form.insert('<input type="hidden" name="_method" value="'+method+'"/>')
        .insertTo(document.body).submit();
    }
  };

  // processes form submits
  var try_form_submit = function(event, button) {
    if (!user_cancels(event, button) && $(button.form).has('data-remote')) {
      event.stop();
      button.form.send(); // oh yeah baby!
    }
  };

  // global events listeners
  document.on({
    click: function (event) {
      var target = event.target, form = target.form,
        link = [target].concat(target.parents()).first('match', 'a');
      
      if (form && ['submit', 'image'].include(target.type))
        try_form_submit(event, target);
      else if (link)
        try_link_submit(event, link);
    },

    keydown: function(event) {
      var target = event.target, form = target.form;
      
      // trying to catch form submit via Enter pressing in an input field
      if (form && target.tagName === 'INPUT' && event.keyCode == 13) {
        try_form_submit(event, target);
      }
    }
  });
})();
