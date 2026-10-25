# Aula 14 Erros,Excecoes e Middleware
## 1.tratamento global de excecoes
foi implementado o middleware UseExceptionHandler no arquivo Program.cs , logo apos builder.build() . 
Esse middleware captura erros onde sao internos como aplicacao ela retorna uma resposta ao json onde a mensagem ela e generica ao cliente.

## 2. testes onde eu realizei no bruno
### testei o erro interno
-metodo: get
- rota:/api/teste-erro
- resultado http500
- o api ele retornou com uma mensagem em json,porem sem exibir detalhes ao internos de execao

## testes listagem
- metodo get
rota: /api/filmes
-resultado:com http 200
- com a api ela retornou a lista de filmes normalmente

## teste filme inesxistente
- metodo: get
- rota: /api/filmes/9999
- resultado foi http 404
- api do sistema  informou que o filme nao foi encontrado.

## 3 segurança em aplicação
não devemos enviar mensagens em exeções aos clientes pois pode revelar informacoes internas dos sistemas como caminhos arquoivos ou detalhes de bancos de dados ou informacoes tecnicas
enquanto a seguranca essa aplicacao pode retorna uma mensagem genetica ao usuario 
onde os erros devem ser analizados pelo desenvolvedor