/**
 * jQuery like ajax interfaces
 *
 * Copyright (C) 2011 Nikolay Nemshilov
 */
$ext($, {

  param: function(object) {
    return Object.toQueryString(object);
  },

  ajax: function(url, options) {
    options = options || {};

    if (typeof(url) === 'string') {
      options.url = url;
    } else {
      options = url;
    }

    var xhr_options = {};

    function callback(original, xhr) {
      original(
        options.dataType === 'json' ? xhr.json : xhr.text,
        xhr.successful() ? 'success' : 'error',
        xhr
      );
    }

    if (options.success) {
      xhr_options.onSuccess = function() {
        callback(options.success, this);
      };
    }

    if (options.error) {
      xhr_options.onFailure = function() {
        callback(options.error, this);
      };
    }

    if (options.complete) {
      xhr_options.onComplete = function() {
        callback(options.complete, this);
      };
    }

    xhr_options.method  = options.type;

    if (options.headers) {
      xhr_options.headers = options.headers;
    }
    if (options.jsonp) {
      xhr_options.jsonp = options.jsonp;
    }
    if (options.url.indexOf('callback=?') > 0) {
      xhr_options.jsonp = true;
      options.url = options.url.replace(/(\?|\&)callback=\?/, '');
    }

    return new Xhr(options.url, xhr_options).send(options.data);
  },

  get: function() {
    return make_ajax_call({type: 'get'}, arguments);
  },

  post: function(url, data, success, data_type) {
    return make_ajax_call({type: 'post'}, arguments);
  },

  getJSON: function(url, data, success) {
    return make_ajax_call({dataType: 'json'}, arguments);
  },

  getScript: function(url, success) {
    return make_ajax_call({dataType: 'script'}, arguments);
  }

});

function make_ajax_call(opts, args) {
  return $.ajax($ext(ajax_options.apply(this, args), opts));
}

function ajax_options(url, data, success, data_type) {
  if (typeof(data) === 'function') {
    data_type = success;
    success   = data;
    data      = undefined;
  }

  return {
    url:      url,
    data:     data,
    success:  success,
    dataType: data_type
  };
}

Xhr.include({
  success: function(callback) {
    return this.on('success', callback);
  },

  error: function(callback) {
    return this.on('failure', callback);
  },

  complete: function(callback) {
    return this.on('complete', callback);
  }
});