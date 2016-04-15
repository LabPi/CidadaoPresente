//var meuServico = angular.module('CidadaoVigilante.services', []);

//services.module('CidadaoVigilante.services', []);

services.factory('RegioesService', function () {
	// body...

	var regioes = [{
		// Norte
		nome : 'Norte'
	},
	{
		// Nordeste
		nome : 'Nordeste'
	}];


	return {
		getAll : function () {
			return regioes;
		}
	}
});

services.factory('EstadosService', function() {
	var estados = [
			    {
			        "uf": "MT",
			        "nome": " Mato Grosso",
			        "regiao": ""
			    },
			    {
			        "uf": "RO",
			        "nome": " Rondônia",
			        "regiao": ""
			    },
			    {
			        "uf": "AC",
			        "nome": " Acre",
			        "regiao": ""
			    },
			    {
			        "uf": "AM",
			        "nome": " Amazonas",
			        "regiao": ""
			    },
			    {
			        "uf": "RR",
			        "nome": " Roraima",
			        "regiao": ""
			    },
			    {
			        "uf": "PA",
			        "nome": " Pará",
			        "regiao": ""
			    },
			    {
			        "uf": "AP",
			        "nome": " Amapá",
			        "regiao": ""
			    },
			    {
			        "uf": "TO",
			        "nome": " Tocantins",
			        "regiao": ""
			    },
			    {
			        "uf": "MA",
			        "nome": " Maranhão",
			        "regiao": ""
			    },
			    {
			        "uf": "PI",
			        "nome": " Piauí",
			        "regiao": ""
			    },
			    {
			        "uf": "CE",
			        "nome": " Ceará",
			        "regiao": ""
			    },
			    {
			        "uf": "RN",
			        "nome": " Rio Grande do Norte",
			        "regiao": ""
			    },
			    {
			        "uf": "PB",
			        "nome": " Paraíba",
			        "regiao": ""
			    },
			    {
			        "uf": "PE",
			        "nome": " Pernambuco",
			        "regiao": ""
			    },
			    {
			        "uf": "AL",
			        "nome": " Alagoas",
			        "regiao": ""
			    },
			    {
			        "uf": "SE",
			        "nome": " Sergipe",
			        "regiao": ""
			    },
			    {
			        "uf": "BA",
			        "nome": " Bahia",
			        "regiao": ""
			    },
			    {
			        "uf": "MG",
			        "nome": " Minas Gerais",
			        "regiao": ""
			    },
			    {
			        "uf": "ES",
			        "nome": " Espírito Santo",
			        "regiao": ""
			    },
			    {
			        "uf": "RJ",
			        "nome": " Rio de Janeiro",
			        "regiao": ""
			    },
			    {
			        "uf": "SP",
			        "nome": " São Paulo",
			        "regiao": ""
			    },
			    {
			        "uf": "PR",
			        "nome": " Paraná",
			        "regiao": ""
			    },
			    {
			        "uf": "SC",
			        "nome": " Santa Catarina",
			        "regiao": ""
			    },
			    {
			        "uf": "RS",
			        "nome": " Rio Grande do Sul",
			        "regiao": ""
			    },
			    {
			        "uf": "MS",
			        "nome": " Mato Grosso do Sul",
			        "regiao": ""
			    },
			    {
			        "uf": "GO",
			        "nome": " Goiás",
			        "regiao": ""
			    },
			    {
			        "uf": "DF",
			        "nome": " Distrito Federal",
			        "regiao": ""
			    }
			];
	return {
		todos : function() {
			// Ordena pelo nome
			estados.keySort('nome');
			return estados;
		},
		byUf : function(uf) {
			estados.keySort('uf');

			for (var i = 0; i < estados.length; i++) {
				if (estados[i].uf == uf) {
					return estados[i];
				}
			}
		}
	}
});

services.factory('DenunciaServices', function () {
	var dados = localStorage.getItem("dados");

	if (!dados) {
		dados = [];
	} else {
		dados = angular.fromJson(dados);
	}

	var setData = function(dados) {
		localStorage.setItem("dados", angular.toJson(dados, true));
	}

	return {
		todos : function() {
			return dados;
		},
		salvar : function(Denuncia) {
			dados.push(Denuncia);
			setData(dados);
		},
		apagar : function(indice) {
			dados.splice(indice, 1);
			setData(dados);
		},
		buscaPorIndice : function(indice) {
			return dados[indice];
		}
	}
});
