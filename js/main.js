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
  center: new google.maps.LatLng(-23.668978,-46.702259),
  zoom: 13,
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
        tagName: 'favela',
        clientId: 'f5fdd1f6668d47c9801fe2127e8ef36a',
        limit: '23'
    });
    feed.run();

//Angular.js

function ProjectsController($scope) {
    $scope.projects = [
        
        // {nome: 'Projeto Balé', author: 'Joildo Santos', contact: '(11) 9999-9999', desc: '100 crianças na faixa etária de 9 a 12 anos, moradoras de Paraisópolis (São Paulo - SP), aprenderão balé clássico na própria comunidade. O projeto de ensino de dança, totalmente gratuito'},
        // {nome: 'Projeto Zica', author: 'Joildo Santos', contact: '(11) 9999-9999', desc: '100 crianças na faixa etária de 9 a 12 anos, moradoras de Paraisópolis (São Paulo - SP), aprenderão balé clássico na própria comunidade. O projeto de ensino de dança, totalmente gratuito'},
        // {nome: 'Projeto Dahr', author: 'Joildo Santos', contact: '(11) 9999-9999', desc: '100 crianças na faixa etária de 9 a 12 anos, moradoras de Paraisópolis (São Paulo - SP), aprenderão balé clássico na própria comunidade. O projeto de ensino de dança, totalmente gratuito'}

    ];

    $scope.adicionaItem = function () {

        $scope.projects.push({
            img: $scope.project.img,
            nome: $scope.project.nome,
            author: $scope.project.author,
            contact: $scope.project.contact,
            desc: $scope.project.desc,
        });
    };
}

$('button').click(function() {
  $('#myModal').trigger('reveal:close');
})