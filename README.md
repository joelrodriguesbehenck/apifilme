# API de Filmes

API REST desenvolvida em ASP.NET Core para gerenciar cadastro de filmes.

## Vídeo de demonstração 🎬

https://youtu.be/lezZF12CC34

### Conteúdo do vídeo:
- ✅ Apresentação do tema e recurso
- ✅ Repositório público e organização dos arquivos
- ✅ Execução da API com `dotnet run`
- ✅ Explicação: `record`, DTO de entrada, `List<T>` e rotas
- ✅ Testes no Bruno: GET (lista), GET (por ID), POST, PUT e DELETE
- ✅ Códigos de status: **200 OK**, **201 Created**, **204 No Content** e **404 Not Found**
- ✅ Fluxo completo: criação → atualização → exclusão do registro
## Tecnologias
- ASP.NET Core
- C#
- Bruno (testes de API)
﻿# api-filmes
# projeto--filme


API de Filme

AP2 — CRUD persistente com frontend integrado

Este projeto é a evolução da AP1, na qual foi implementado um CRUD completo com persistência dos dados em um banco de dados SQLite. Para isso, foram utilizados o Entity Framework Core (EF Core) e um frontend web integrado à AP1.
Tecnologias utilizadas
C# / .NET 10
## video de demonstração - AS
Vídeo de demonstração da avaliação, apresentando a organização do projeto, a estrutura do banco de dados, a execução da API, os testes no Bruno e a persistência dos dados após reiniciar a aplicação.
Link: (adicionar o link do novo vídeo)


# ap2 - crud persistente no frontend integrado
com esse projeto ele e a evolucao da ap1 onde e inplementado no crud completo com a persistencia em um banco de dados sqlite foram ultilizadas entity framework core (ef core) integrado a um frontend web.

## tecnologias ultilizadas
- c# / .net 10
- asp.net core minimal apis
- entity framework core 10
- sqlite
- html5 css3 e javaScript
- bruno / postman para testes de api

# funcionalidades
- listar filmes 
- cadastrar filmes
- buscar filmes por id
- atualizar filmes
- excluir filmes
- armazenar os dados no banco sqlite
- integrar o  frontend com os apis

## como execultar um projeto 
dotnet restore
ele ajuda a restaurar suas dependencias necessárias em um projeto

## dotnet build
bom ele copila o projeto e verifica se ha erros no codigo.

## dotnet run
ele execulta em uma aplicação asp.net core ele inicia em uma api localmente.
onde aparece as portas 5205

## banco de dados e persistencia
bom o projeto ela ultiliza meios como ultilizar SQlite quanto ele serve para armazenar fimes de forma persistente como por meio do entity framework core
o que acontece nessa jogada ele serve para os filmes ficarem salvos em um banco de dados enquanto api fica desligada.

## migrations
elas são ultilizadas para criar e atulizar uma estrutura em um banco de dados ele ajuda em meios de alteraçoes tais como é entidades onde envolvem projetos.
já o Entity Framework tipo ele se aplica como uma inicialização de aplicações por meios de comandos em que temos database.migrate(). 

## organizações de pastas
Models => ela contem uma entidade de filme.

Dtos => ela contém os tipos de filme de entrada, que ultiza para receber os dados dos filmes.

Data => ela contém imigrações em que o filmecontext ela é resposavel por ter o acesso aos banco de dados.

migrations => ela conten imigracões como entity framework core.

wwwroot => contém arquivos em que o front end se para como o html para um documento style.css para cores , botões  estilo, aparencia 
já o java script serve para  o comportamento de uma página adiciona uma interatividade e uma comunicação com a api.
bruno => contem requisições ultizadas nos testes de api como get , post , put , e delete.

quando entramos no visualstud code execultamos dotnet run e entao o net ele copila e inicia uma aplicação e então aparece htpp://locahost:5205

e entao abrimos o bruno e enviamos a requisições para fazer os testes do filme
e então colocamos htpp://localhost:5202/api/filmes.
apifilme/
|__Models/
|__filmeEntity.cs
dtos/
|__filmesEntrada.cs
data/
|__filmeContext.cs
|__migrations/
|__wwwroot/
|__bruno/
|__Program.cs
|__appsettings.json
|__apifilme.csproj
|__readme.md

## rotas do api

método http         rota                      função
get              /api/filmes          listar todos os  filmes
get             /api/fimes/{id}       buscar um filme pelo id
post            /api/filmes           cadastrar um filme
put             /api/filmes/{id}      atualizar um filme
delete          /api/filmes/{id}      excluir filmes

## exemplos de json

## cadastrar filme (post)
json
{
"titulo": "interestelar",
"genero": "ficção cientifica",
"ano": 2014,
"nota":9.0,
bom vamos entender json estamos representando os dados serão enviados pelo bruno onde colocamos em uma api e quando colocamos o post . onde o id não aprece tipo o banco de dados consiga gerar um valor 
}
## atualizar filme (put)
json
{
"titulo":"interestelar - edição especial",
"genero": "ficção cientifica",
"ano": "2014"
"nota": "9.5"
}
quando colocamos put ele envia novos dados de um filme e quando atualizamos um registro onde ele exista , onde ele fica indentificado como uma rota.

## excluir filme (delete)
quando excluimos um filme ele envia uma requisiçao ao dele em que é informado por um id de um registro de uma rota
exemplos:
delete/api/filmes/1
em um api ela retorna em um status de htpp 204 (no content) quando excluimos é realizado com sucesso.
e quando excluimos nós não precisamos colocar enviar titulo,genero,ano ou nota.

## testes da api com bruno

o bruno ele é ultilizado principalmente para realizar ou organizar aos testes de requisições em um http da api 
onde em collection ele serve para as seguintes requisições:
get => listar filmes
post => cadastrar filmes 
get => buscar filemes por id.
put => atualizar filmes 
delete => excluir filmes 

## pré-requisitos
quano execultamos a um projeto ele é necessário que esteja estalado net sdk 10.0 ,visual studio code ou outro editor de codigo eo bruno onde testamos as requisições de uma api.

### criação e atualizações de banco de dados
bom o banco de dados SQlite serve para armazenar vario registros de filmes quando iniciamos uma aplicação, o entity framework core execultamos database.migrate() onde verificamos ou se aplica em migrations pendentes para mantermos uma estrura de bancos bem atualizados.

