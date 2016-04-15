//var meusControllers = angular.module('CidadaoVigilante.controllers', []);

controllers.controller('ListarRegioesController', function ($scope, $ionicLoading, EstadosService) {
	$scope.show = function() {
		$ionicLoading.show({
			template: 'Carregando...'
		});
	};

	$scope.registros = false;
    $scope.atualizar = function() {

        $scope.registros = EstadosService.todos();

        $scope.$broadcast('scroll.refreshComplete');
    }

    $scope.atualizar();
});

controllers.controller('PropostaController', function($scope, EstadosService, $stateParams){
    $scope.estado = EstadosService.byUf($stateParams.uf);
});

controllers.controller('DenunciaController', function($scope, $stateParams, DenunciaServices, CameraService){
    $scope.tirarFoto = function() {
        CameraService.buscarFoto().then(function(base64Foto){
            console.log(base64Foto);
            $scope.Denuncia.foto = base64Foto;
        }, function(erro){
            console.error(erro);
        })
    }

	$scope.Denuncia           = {};
    $scope.sucesso            = false;

    $scope.salvar = function(formulario) {
        if(formulario.$valid){

            DenunciaServices.salvar($scope.Denuncia);

            $scope.limpar(formulario);

            $scope.sucesso = true;
        }
    }

    $scope.limpar = function(formulario){
        $scope.sucesso = false;
        $scope.Denuncia = {};
        formulario.$setPristine();
    } 
});