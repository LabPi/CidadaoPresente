services.factory('Banco', function($q, $ionicPlatform, NomeBanco){

    function Banco(){

        var db;
        var nome = NomeBanco;

        $ionicPlatform.ready(function(){

            if(window.sqlitePlugin){
                db = window.sqlitePlugin.openDatabase({
                    name : nome,
                    bgType : 0 //criar em background?
                });
            }
            else {
                db = window.openDatabase(nome, '1', 'descricao',
                 1024*1024*1024);
            }

        });

        this.criarTabela = function(){

            var query  = "CREATE TABLE IF NOT EXISTS usuarios (";
                query += "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ";
                query += "nome TEXT NOT NULL, ";
                query += "senha TEXT NOT NULL, ";
                query += "foto TEXT NULL, ";
                query += "imagem TEXT NULL, ";
                query += "idWS INTEGER NULL, ";
                query += "email TEXT NOT NULL)";

            return __executaQuery(query);

        }

        this.login = function(email, senha){

            var q = $q.defer();

            var sql = "SELECT id, nome FROM usuarios "+
                    "WHERE email = ? AND senha = ?";

            __executaQuery(sql, [email, senha]).then(
                function(resultado){

                var total = resultado.rows.length;

                if(total > 0){
                    var retorno = [];

                    for(var i = 0; i < total; i++)
                        retorno.push(resultado.rows.item(i));

                    q.resolve(retorno);
                }
                else
                    q.resolve(false);

            })

            return q.promise;

        }

        this.salvar = function(Usuario){

            var binds = [
                Usuario.nome, Usuario.senha,
                Usuario.foto, Usuario.email
            ];

            var sql = "";
            if(Usuario.id){
                sql = "UPDATE usuarios SET nome = ?, senha = ?, "+
                      "foto = ?, email = ? WHERE id = ?";
                binds.push(Usuario.id);
            }
            else {
                sql = "INSERT INTO usuarios (nome, senha, foto, email) "+
                      "VALUES (?, ?, ?, ?)";
            }

            return __executaQuery(sql, binds);

        }

        this.buscar = function(id){

            var q = $q.defer();

            var sql = "SELECT id, nome, senha, foto, imagem, email "+
                      "FROM usuarios";

            if(id){
                sql += " WHERE id = ?";
                id  = [id];
            }

            __executaQuery(sql, id).then(function(resultado){
                var total = resultado.rows.length;

                if(total > 0){
                    var retorno = [];

                    for(var i = 0; i < total; i++)
                        retorno.push(resultado.rows.item(i));

                    q.resolve(retorno);
                }
                else
                    q.resolve(false);
            }, q.reject);

            return q.promise;

        }

        this.apagar = function(id){
            return __executaQuery("DELETE FROM usuarios WHERE id = ?", [id]);
        }

        this.itensNaoSincronizados = function(){
            return __executaQuery("SELECT id, nome, senha, foto, email "+
                "FROM usuarios WHERE idWS IS NULL");
        }

        this.setaSincronizacao = function(idWS,  imagem, id){
            return __executaQuery("UPDATE usuarios SET imagem = ?, "+
                "idWS = ? WHERE id = ?", [idWS, imagem, id]);
        }

        this.ultimoID = function(){
            return __executaQuery("SELECT MAX(idWS) AS id FROM usuarios");
        }

        this.inserirVarios = function(dados){

            var q = $q.defer();

            var sql = "INSERT INTO usuarios (nome, imagem, "+
            "senha, email, idWS) VALUES (?, ?, ?, ?, ?);"

            var promessas = [];
            for(var temp in dados){
                var item = dados[temp];
                var binds = [
                    item.Nome, item.Imagem, 'mudar123',
                    item.Email, item.id
                ];

                promessas.push(__executaQuery(sql, binds));
            }

            $q.all(promessas).then(q.resolve, q.reject);

            return q.promise;

        }

        var __executaQuery = function(sql, dados){

            var q = $q.defer();

            db.transaction(function(transacao){

                transacao.executeSql(sql, dados, 
                    function(transacao, resultado){
                        q.resolve(resultado);
                    }, function(transacao, erro){
                        q.reject(erro);
                    }
                );

            });

            return q.promise;

        }

    }

    return new Banco();

});