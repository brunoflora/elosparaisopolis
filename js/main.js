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

var marker = new google.maps.Marker({
    position: map.getCenter(),
    map: map,
    icon: image,
    title: 'Click para dar zoom'
  });

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
        
        {nome: 'Projeto Balé', author: 'Joildo Santos', contact: '(11) 9999-9999', desc: '100 crianças na faixa etária de 9 a 12 anos, moradoras de Paraisópolis (São Paulo - SP), aprenderão balé clássico na própria comunidade. O projeto de ensino de dança, totalmente gratuito'},
        {nome: 'Projeto Zica', author: 'Joildo Santos', contact: '(11) 9999-9999', desc: '100 crianças na faixa etária de 9 a 12 anos, moradoras de Paraisópolis (São Paulo - SP), aprenderão balé clássico na própria comunidade. O projeto de ensino de dança, totalmente gratuito'},
        {nome: 'Projeto Dahr', author: 'Joildo Santos', contact: '(11) 9999-9999', desc: '100 crianças na faixa etária de 9 a 12 anos, moradoras de Paraisópolis (São Paulo - SP), aprenderão balé clássico na própria comunidade. O projeto de ensino de dança, totalmente gratuito'}

        {nome: 'Projeto Balé', author: 'Joildo Santos', contact: '(11) 9999-9999', desc: '100 crianças na faixa etária de 9 a 12 anos, moradoras de Paraisópolis (São Paulo - SP), aprenderão balé clássico na própria comunidade. O projeto de ensino de dança, totalmente gratuito'},

    ];

    $scope.adicionaItem = function () {

        $scope.projects.push({
            // img: $scope.project.img,
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
