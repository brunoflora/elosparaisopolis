//Google Maps API
//Author: Junior Magalhães

function initialize() {

 var pinkParksStyles = [
  {
    featureType: "all",
    stylers: [
      { saturation: -10 }
    ]
  },
  {
    featureType: "poi.park",
    stylers: [
      { hue: "#ed125f" },
      { saturation: 100 }
    ]
  }
  ];
  var pinkMapType = new google.maps.StyledMapType(pinkParksStyles,
    {name: "Interface Parks"});

var mapOptions = {
  center: new google.maps.LatLng(-23.614565,-46.726154),
  zoom: 15,
  scrollwheel: false,   
  mapTypeControl: true,
  mapTypeIds: [google.maps.MapTypeId.SATELLITE, 'green_parks']
};

var map = new google.maps.Map(document.getElementById("map_canvas"),
    mapOptions);

var image = 'img/place.png';
var projectspin = 'img/pin_25_30.png';

var marker = new google.maps.Marker({
    position: map.getCenter(),
    map: map,
    icon: image,
    title: 'Paraisópolis'
  });

var markers = [
      ['Balé Paraisópolis', -23.614938,-46.72432],
      ['Capoeira Thiago Camilo', -23.61655,-46.727389],
      ['Orquestra Sinfônica', -23.617592,-46.725586]
    ];

var infowindow = new google.maps.InfoWindow(), marker, i;
for (i = 0; i < markers.length; i++) {  
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(markers[i][1], markers[i][2]),
        map: map,
        icon: projectspin,
    });
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            infowindow.setContent(markers[i][0]);
            infowindow.open(map, marker);
        }
    })(marker, i));
}

google.maps.event.addListener(map, 'center_changed', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(function() {
      map.panTo(marker.getPosition());
    }, 3000);
  });

  google.maps.event.addListener(marker, 'click', function() {
    map.setZoom(17);
    map.setCenter(marker.getPosition());
    mapTypeId: google.maps.MapTypeId.SATELLITE
  });

  //use mapTypes to register pinkMapType
  map.mapTypes.set('green_parks', pinkMapType);
    
  //Insert styled map in overlayMapTypes.
  map.overlayMapTypes.insertAt(0, pinkMapType);
    
  //map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
  map.setMapTypeId(google.maps.MapTypeId.SATELLITE);

}

//Instagram

var feed = new Instafeed({
        get: 'tagged',
        tagName: 'paraisópolis',
        clientId: 'f5fdd1f6668d47c9801fe2127e8ef36a',
        limit: '23'
    });
    feed.run();

//Angular.js

function ProjectsController($scope) {
    $scope.projects = [
        {
          nome: 'Projeto Balé',
          author: 'Joildo Santos',
          contact: '(11) 9999-9999',
          desc: '100 crianças na faixa etária de 9 a 12 anos, moradoras de Paraisópolis (São Paulo - SP), aprenderão balé clássico na própria comunidade. O projeto de ensino de dança, totalmente gratuito'
        },
    ];

    $scope.adicionaItem = function () {

        $scope.projects.push({
            nome: $scope.project.nome,
            author: $scope.project.author,
            contact: $scope.project.contact,
            desc: $scope.project.desc,
        });
    };
}

$('button').click(function() {
  $('#myModal').trigger('reveal:close');
});

// Generated by CoffeeScript 1.6.2
(function() {
  var Kudoable,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Kudoable = (function() {
    function Kudoable(element) {
      this.element = element;
      this.unkudo = __bind(this.unkudo, this);
      this.complete = __bind(this.complete, this);
      this.end = __bind(this.end, this);
      this.start = __bind(this.start, this);
      this.bindEvents();
      this.counter = $('.count .num', this.element);
      this.element.data('kudoable', this);
    }

    Kudoable.prototype.bindEvents = function() {
      this.element.mouseenter(this.start);
      this.element.mouseleave(this.end);
      this.element.click(this.unkudo);
      $(this.element).on('touchstart', this.element, this.start);
      return $(this.element).on('touchend', this.element, this.end);
    };

    Kudoable.prototype.isKudoable = function() {
      return this.element.hasClass('kudoable');
    };

    Kudoable.prototype.isKudod = function() {
      return this.element.hasClass('complete');
    };

    Kudoable.prototype.start = function() {
      if (this.isKudoable() && !this.isKudod()) {
        this.element.trigger('kudo:active');
        this.element.addClass('active');
        return this.timer = setTimeout(this.complete, 700);
      }
    };

    Kudoable.prototype.end = function() {
      if (this.isKudoable() && !this.isKudod()) {
        this.element.trigger('kudo:inactive');
        this.element.removeClass('active');
        if (this.timer != null) {
          return clearTimeout(this.timer);
        }
      }
    };

    Kudoable.prototype.complete = function() {
      this.end();
      this.incrementCount();
      this.element.addClass('complete');
      return this.element.trigger('kudo:added');
    };

    Kudoable.prototype.unkudo = function(event) {
      event.preventDefault();
      if (this.isKudod()) {
        this.decrementCount();
        this.element.removeClass('complete');
        return this.element.trigger('kudo:removed');
      }
    };

    Kudoable.prototype.setCount = function(count) {
      return this.counter.html(count);
    };

    Kudoable.prototype.currentCount = function() {
      return parseInt(this.counter.html());
    };

    Kudoable.prototype.incrementCount = function() {
      return this.setCount(this.currentCount() + 1);
    };

    Kudoable.prototype.decrementCount = function() {
      return this.setCount(this.currentCount() - 1);
    };

    return Kudoable;

  })();

  jQuery(function($) {
    return $.fn.kudoable = function() {
      return this.each(function() {
        return new Kudoable($(this));
      });
    };
  });

}).call(this);


// KUDOS

// needs to be a string for jquery.cookie
      var postId = '1'; 

      $(function()
      {
        // initialize kudos
        $("figure.kudoable").kudoable();

        // check to see if user has already kudod
        // fyi cookies do not work when you are viewing this as a file
        if($.cookie(postId) == 'true') {
          // make kudo already kudod
          $("figure.kudoable").removeClass("animate").addClass("complete");

          // your server would take care of the proper kudos count, but because this is a
          // static page, we need to set it here so it doesn't become -1 when you remove
          // the kudos after a reload
          $(".num").html(1);
        } 

        // when kudoing
        $("figure.kudo").bind("kudo:active", function(e)
        {
          console.log("kudoing active");
        });

        // when not kudoing
        $("figure.kudo").bind("kudo:inactive", function(e)
        {
          console.log("kudoing inactive");
        });

        // after kudo'd
        $("figure.kudo").bind("kudo:added", function(e)
        {
          var element = $(this);
          // ajax'y stuff or whatever you want
          console.log("Kodo'd:", element.data('id'), ":)");

          // set cookie so user cannot kudo again for 7 days
          $.cookie(postId, 'true', { expires: 7 });
        });

        // after removing a kudo
        $("figure.kudo").bind("kudo:removed", function(e)
        {
          var element = $(this);
          // ajax'y stuff or whatever you want
          console.log("Un-Kudo'd:", element.data('id'), ":(");

          // remove cookie
          $.removeCookie(postId);
        });
      });

      $('.play').click(function() {
                $('.play').hide();
                $('#video').append('<iframe width="1280" height="720" class="iframe" src="http://www.youtube.com/embed/QNstSOucpBU?autoplay=1" frameborder="0" allowfullscreen></iframe>');
//       });
// // CHARDIN JS

// // Generated by CoffeeScript 1.6.2
// (function() {
//   var __slice = [].slice;

//   (function($, window) {
//     var chardinJs;

//     chardinJs = (function() {
//       function chardinJs(el) {
//         var _this = this;

//         this.$el = $(el);
//         $(window).resize(function() {
//           return _this.refresh();
//         });
//       }

//       chardinJs.prototype.start = function() {
//         var el, _i, _len, _ref;

//         if (this._overlay_visible()) {
//           return false;
//         }
//         this._add_overlay_layer();
//         _ref = this.$el.find('*[data-intro]');
//         for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//           el = _ref[_i];
//           this._show_element(el);
//         }
//         return this.$el.trigger('chardinJs:start');
//       };

//       chardinJs.prototype.toggle = function() {
//         if (!this._overlay_visible()) {
//           return this.start();
//         } else {
//           return this.stop();
//         }
//       };

//       chardinJs.prototype.refresh = function() {
//         var el, _i, _len, _ref, _results;

//         if (this._overlay_visible()) {
//           _ref = this.$el.find('*[data-intro]');
//           _results = [];
//           for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//             el = _ref[_i];
//             _results.push(this._position_helper_layer(el));
//           }
//           return _results;
//         } else {
//           return this;
//         }
//       };

//       chardinJs.prototype.stop = function() {
//         this.$el.find(".chardinjs-overlay").fadeOut(function() {
//           return $(this).remove();
//         });
//         this.$el.find('.chardinjs-helper-layer').remove();
//         this.$el.find('.chardinjs-show-element').removeClass('chardinjs-show-element');
//         this.$el.find('.chardinjs-relative-position').removeClass('chardinjs-relative-position');
//         if (window.removeEventListener) {
//           window.removeEventListener("keydown", this._onKeyDown, true);
//         } else {
//           if (document.detachEvent) {
//             document.detachEvent("onkeydown", this._onKeyDown);
//           }
//         }
//         return this.$el.trigger('chardinJs:stop');
//       };

//       chardinJs.prototype._overlay_visible = function() {
//         return this.$el.find('.chardinjs-overlay').length !== 0;
//       };

//       chardinJs.prototype._add_overlay_layer = function() {
//         var element_position, overlay_layer, styleText,
//           _this = this;

//         if (this._overlay_visible()) {
//           return false;
//         }
//         overlay_layer = document.createElement("div");
//         styleText = "";
//         overlay_layer.className = "chardinjs-overlay";
//         if (this.$el.prop('tagName') === "BODY") {
//           styleText += "top: 0;bottom: 0; left: 0;right: 0;position: fixed;";
//           overlay_layer.setAttribute("style", styleText);
//         } else {
//           element_position = this._get_offset(this.$el.get()[0]);
//           if (element_position) {
//             styleText += "width: " + element_position.width + "px; height:" + element_position.height + "px; top:" + element_position.top + "px;left: " + element_position.left + "px;";
//             overlay_layer.setAttribute("style", styleText);
//           }
//         }
//         this.$el.get()[0].appendChild(overlay_layer);
//         overlay_layer.onclick = function() {
//           return _this.stop();
//         };
//         return setTimeout(function() {
//           styleText += "opacity: .8;";
//           return overlay_layer.setAttribute("style", styleText);
//         }, 10);
//       };

//       chardinJs.prototype._get_position = function(element) {
//         return element.getAttribute('data-position') || 'bottom';
//       };

//       chardinJs.prototype._place_tooltip = function(element) {
//         var my_height, my_width, target_element_position, target_height, target_width, tooltip_layer, tooltip_layer_position;

//         tooltip_layer = $(element).data('tooltip_layer');
//         tooltip_layer_position = this._get_offset(tooltip_layer);
//         tooltip_layer.style.top = null;
//         tooltip_layer.style.right = null;
//         tooltip_layer.style.bottom = null;
//         tooltip_layer.style.left = null;
//         switch (this._get_position(element)) {
//           case "top":
//           case "bottom":
//             target_element_position = this._get_offset(element);
//             target_width = target_element_position.width;
//             my_width = $(tooltip_layer).width();
//             tooltip_layer.style.left = "" + ((target_width / 2) - (tooltip_layer_position.width / 2)) + "px";
//             break;
//           case "left":
//           case "right":
//             target_element_position = this._get_offset(element);
//             target_height = target_element_position.height;
//             my_height = $(tooltip_layer).height();
//             tooltip_layer.style.top = "" + ((target_height / 2) - (tooltip_layer_position.height / 2)) + "px";
//         }
//         switch (this._get_position(element)) {
//           case "left":
//             return tooltip_layer.style.left = "-" + (tooltip_layer_position.width - 34) + "px";
//           case "right":
//             return tooltip_layer.style.right = "-" + (tooltip_layer_position.width - 34) + "px";
//           case "bottom":
//             return tooltip_layer.style.bottom = "-" + tooltip_layer_position.height + "px";
//           case "top":
//             return tooltip_layer.style.top = "-" + tooltip_layer_position.height + "px";
//         }
//       };

//       chardinJs.prototype._position_helper_layer = function(element) {
//         var element_position, helper_layer;

//         helper_layer = $(element).data('helper_layer');
//         element_position = this._get_offset(element);
//         return helper_layer.setAttribute("style", "width: " + element_position.width + "px; height:" + element_position.height + "px; top:" + element_position.top + "px; left: " + element_position.left + "px;");
//       };

//       chardinJs.prototype._show_element = function(element) {
//         var current_element_position, element_position, helper_layer, tooltip_layer;

//         element_position = this._get_offset(element);
//         helper_layer = document.createElement("div");
//         tooltip_layer = document.createElement("div");
//         $(element).data('helper_layer', helper_layer).data('tooltip_layer', tooltip_layer);
//         if (element.id) {
//           helper_layer.setAttribute("data-id", element.id);
//         }
//         helper_layer.className = "chardinjs-helper-layer chardinjs-" + (this._get_position(element));
//         this._position_helper_layer(element);
//         this.$el.get()[0].appendChild(helper_layer);
//         tooltip_layer.className = "chardinjs-tooltip chardinjs-" + (this._get_position(element));
//         tooltip_layer.innerHTML = "<div class='chardinjs-tooltiptext'>" + (element.getAttribute('data-intro')) + "</div>";
//         helper_layer.appendChild(tooltip_layer);
//         this._place_tooltip(element);
//         element.className += " chardinjs-show-element";
//         current_element_position = "";
//         if (element.currentStyle) {
//           current_element_position = element.currentStyle["position"];
//         } else {
//           if (document.defaultView && document.defaultView.getComputedStyle) {
//             current_element_position = document.defaultView.getComputedStyle(element, null).getPropertyValue("position");
//           }
//         }
//         current_element_position = current_element_position.toLowerCase();
//         if (current_element_position !== "absolute" && current_element_position !== "relative") {
//           return element.className += " chardinjs-relative-position";
//         }
//       };

//       chardinJs.prototype._get_offset = function(element) {
//         var element_position, _x, _y;

//         element_position = {
//           width: element.offsetWidth,
//           height: element.offsetHeight
//         };
//         _x = 0;
//         _y = 0;
//         while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
//           _x += element.offsetLeft;
//           _y += element.offsetTop;
//           element = element.offsetParent;
//         }
//         element_position.top = _y;
//         element_position.left = _x;
//         return element_position;
//       };

//       return chardinJs;

//     })();
//     return $.fn.extend({
//       chardinJs: function() {
//         var $this, args, data, option;

//         option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
//         $this = $(this[0]);
//         data = $this.data('chardinJs');
//         if (!data) {
//           $this.data('chardinJs', (data = new chardinJs(this, option)));
//         }
//         if (typeof option === 'string') {
//           data[option].apply(data, args);
//         }
//         return data;
//       }
//     });
//   })(window.jQuery, window);

// }).call(this);

