// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app         = angular.module('CidadaoVigilante', ['ionic', 'CidadaoVigilante.controllers', 'CidadaoVigilante.services', 'CidadaoVigilante.directives', 'CidadaoVigilante.providers']);
var controllers = angular.module('CidadaoVigilante.controllers', []);
var services    = angular.module('CidadaoVigilante.services', []);
var directives  = angular.module('CidadaoVigilante.directives', []);
var providers   = angular.module('CidadaoVigilante.providers', []);


//angular.module('CidadaoVigilante', ['ionic', 'CidadaoVigilante.controllers', 'CidadaoVigilante.services', 'ui.utils.masks'])

app.run(function($ionicPlatform, $rootScope) {

  $rootScope.titulo_app = "Cidadão Presente";
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $ionicConfigProvider, $urlRouterProvider) {
  // 
  //$ionicConfigProvider.tabs.position('bottom');

  $stateProvider.state('home', {
    url : '/home',
    views :{
      'view-home' : {
        templateUrl : 'views/home.html'    
      }
    }
  })
  .state('sobre', {
    url : '/sobre',
    views : {
      'view-home' : {
        templateUrl : 'views/sobre.html'  
      }
    }
  })
  .state('propostas', {
    url : '/propostas/:uf',
    views : {
      'view-home' : {
        controller : 'PropostaController',
        templateUrl : 'views/propostas-home.html'  
      }
    }
  })
  .state('proposta-detalhe', {
    url : '/proposta/detalhe',
    views : {
      'view-home' : {
        templateUrl : 'views/proposta-detalhe.html'  
      }
    }
  })
  .state('denuncia', {
    url : '/denuncia',
    views : {
      'view-home' : {
        controller : 'DenunciaController',
        templateUrl : 'views/denuncia.html'  
      }
    }
  })
  .state('listar-regioes', {
    url : '/listar-regioes',
    views : {
      'view-home' : {
        controller : 'ListarRegioesController',
        templateUrl : 'views/listar-regioes.html'  
      }
    }
  })

  $urlRouterProvider.otherwise('/home');
})
