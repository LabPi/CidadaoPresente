services.factory('API', function($q, $http, EnderecoAPI){

    function API(){
        var hash_listar = "ec28a389ac568b42541edc862e7175a8";
        var hash_salvar = "c18cb0b3ba476e5bc451c54ea2a9c251";

        this.listar = function(){
            return __chamaAPI('listar_usuarios', hash_listar);
        }

        this.buscar = function(id){
            return __chamaAPI('listar_usuarios/'+id, hash_listar);
        }

        this.salvar = function(Usuario){

            var dados = "Nome="+Usuario.Nome+"&Email="+Usuario.Email+"&Senha="+Usuario.Senha+"&Foto="+Usuario.Foto;

            return __chamaAPI('salva_usuario', hash_salvar, dados);
        }

        var __chamaAPI = function(metodo, hash, dados){
            var q = $q.defer();

            if(dados)
                dados += "&Hash="+hash;
            else
                dados = "Hash="+hash;

            var headers = {};
            headers["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
            headers["Hash"]         = hash;

            $http({
                url : EnderecoAPI.url + metodo,
                headers : headers,
                method : 'POST',
                data : dados
            }).then(function(retorno){
                if(retorno.data)
                    q.resolve(retorno.data);
                else
                    q.reject('Erro na requisição');
            }, q.reject);

            return q.promise;
        }
    }

    return new API();

})