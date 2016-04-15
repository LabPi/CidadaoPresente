providers.provider('NomeBanco', function(){

    var banco = null;

    this.setBanco = function(nome){
        banco = nome;
    }

    this.$get = function(){
        return banco;
    }

});