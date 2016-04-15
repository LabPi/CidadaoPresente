services.factory('Sincronizador', function($q, API, Banco){

    return {
        download : function(){

            var q = $q.defer();

            API.listar().then(function(resultado){

                if(resultado.status == "ok"){

                    var usuarios = resultado.usuarios;
                    var dados    = [];

                    Banco.ultimoID().then(function(ultimo_id){

                        var ultimo_id = ultimo_id.rows.item(0);
                        if(ultimo_id && ultimo_id.id){

                            var id = ultimo_id.id;

                            for(var temp in usuarios){
                                if(usuarios[temp].id == id)
                                    break;
                                else
                                    dados.push(usuarios[temp]);
                            }

                        }
                        else
                            dados = usuarios;

                        Banco.inserirVarios(dados).then(q.resolve, q.reject);

                    }, q.reject);

                }

            }, q.reject);

            return q.promise;

        },
        upload : function(){

            var q = $q.defer();

            Banco.itensNaoSincronizados().then(function(resultado){

                if(resultado.rows && resultado.rows.length > 0){

                    var promessas = {};
                    for(var i = 0; i < resultado.rows.length; i++){

                        var item = resultado.rows.item(i);

                        var dados = {'Nome' : item.nome, 'Senha' : item.senha, 'Email' : item.email, 'Foto' : item.foto};

                        promessas[item.id] = API.salvar(dados);

                    }

                    $q.all(promessas).then(function(retorno){

                        //Coletor de erros
                        var errors = [];
                        for(var id in retorno){
                            if(retorno[id].status != "ok")
                                errors.push({'id' : id, 'erroWS' : retorno[id].error});
                        }

                        //Não encontrou erros?
                        if(errors.length == 0){

                            var sincronizados = [];
                            for(var id in retorno){
                                sincronizados.push(Banco.setaSincronizacao(retorno[id].id, retorno[id].imagem, id));
                            }

                            $q.all(sincronizados).then(q.resolve, q.reject);

                        }
                        else
                            q.reject(errors)

                    })

                }
                else
                    q.resolve(true);

            })

            return q.promise;

        }
    }

})