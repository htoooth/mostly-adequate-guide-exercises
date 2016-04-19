requirejs.config({
  paths: {
    ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
    jquery: 'https://code.jquery.com/jquery-2.2.3.min'
  }
});

require([
    'ramda',
    'jquery'
  ],
  function(_, $) {
    var trace = _.curry(function(tag, x) {
      console.log(tag, x);
      return x;
    });
    // app goes here

    var Impure = {
      getJSON: _.curry(function(callback, url) {
        $.getJSON(url, callback);
      }),

      setHtml: _.curry(function(sel, html) {
        $(sel).html(html);
      })
    };

    var img = function(url) {
      return $('<img />', { src: url });
    };

    ///////////////////////////////////////

    var url = function(term) {
      return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=?';
    };

    var mediaUrl = _.compose(_.prop('m'), _.prop("media"));

    var meidaToImg = _.compose(img, mediaUrl);

    var images = _.compose(_.map(meidaToImg), _.prop("items"));

    var renderImagers = _.compose(Impure.setHtml("body"), images);

    var app = _.compose(Impure.getJSON(renderImagers), url);

    app("cats")
  });
