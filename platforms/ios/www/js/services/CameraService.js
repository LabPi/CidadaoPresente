services.factory('CameraService', function($q){

    return {
        buscarFoto : function(){

            var q = $q.defer();

            var opcoes = {
                quality : 80,
                saveToPhotoAlbum : true,
                destinationType : Camera.DestinationType.DATA_URL
            }

            navigator.camera.getPicture(q.resolve, 
                q.reject, 
                opcoes
            );

            return q.promise;

        }
    }

})