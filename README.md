# 🎬 API de Filmes — AP2: CRUD Persistente com Frontend Integrado
https://youtu.be/lezZF12CC34
Este projeto é a evolução da **AP1**, implementando um CRUD completo com persistência em banco de dados **SQLite** utilizando o **Entity Framework Core (EF Core)** e integrado a um **frontend web** servido pela mesma origem da API ASP.NET Core.

---

## 📹 Vídeo de Demonstração — AP2

> **Link público do vídeo de demonstração:**  
> `[COLE_AQUI_O_LINK_DO_SEU_VIDEO_PUBLICO]`  
> *(Grave a demonstração e cole o link do YouTube, Google Drive público ou Loom)*

### Roteiro do Vídeo (Checklist de Gravação):
1. **Apresentação:** Mostre a estrutura de pastas do projeto no VS Code / editor (backend com `Program.cs`, `filmeContext.cs`, `filmeEntity.cs`, pasta `Migrations/`, pasta `wwwroot/` e pasta `bruno/`).
2. **Execução:** Inicie a aplicação com `dotnet run` no terminal e abra o navegador em `http://localhost:5205`.
3. **Testes no Bruno ou Postman:**
   - Execute o **POST** (`/api/filmes`) para cadastrar um filme e mostre a resposta `201 Created`.
   - Execute o **GET** (`/api/filmes`) da lista e mostre `200 OK` com o filme cadastrado.
   - Execute o **GET por ID** (`/api/filmes/{id}`) e mostre `200 OK`.
   - Execute o **PUT** (`/api/filmes/{id}`) para alterar dados e mostre `200 OK`.
   - Execute o **DELETE** (`/api/filmes/{id}`) e mostre `204 No Content`.
   - Execute o **GET por ID** com o ID recém-excluído ou inexistente (ex: `/api/filmes/999`) e mostre `404 Not Found`.
4. **Demonstração no Navegador (Frontend Integrado):**
   - Acesse `http://localhost:5205`.
   - Cadastre um novo filme pelo formulário.
   - Mostre que o card aparece na lista em tempo real com seu ID gerado pelo SQLite.
   - Clique em **Editar**, altere algum campo (ex: nota ou título) e salve.
   - Clique em **Excluir** e confirme a exclusão do registro.
   - *(Opcional)* Mostre a consulta no Bruno confirmando a alteração feita pelo frontend.
5. **Comprovação de Persistência:**
   - Cadastre um filme.
   - Encerre o servidor (`Ctrl + C` no terminal).
   - Inicie novamente com `dotnet run` e recarregue o navegador (F5): comprove que o filme cadastrado continua salvo no banco de dados SQLite!

---

## 🚀 Tecnologias Utilizadas

- **C# / .NET 10** (ASP.NET Core Minimal APIs)
- **Entity Framework Core 10** (`Microsoft.EntityFrameworkCore.Sqlite` e `Design`)
- **SQLite** (Banco de dados relacional em arquivo local)
- **Frontend Vanilla:** HTML5, CSS3 e JavaScript puro (sem frameworks, bibliotecas ou CDNs externas)
- **Bruno / Postman:** Testes de contrato de API

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- [.NET 10 SDK](https://dotnet.microsoft.com/download) instalado.

### 1. Clonar o Repositório
```bash
git clone https://github.com/SEU_USUARIO/Apifilme.git
cd Apifilme
```

### 2. Preparação do Banco de Dados
O projeto já está configurado para **aplicar as migrações automaticamente** na inicialização da aplicação (`db.Database.Migrate()`).

Caso prefira aplicar as migrações manualmente via CLI:
```bash
dotnet ef database update
```

### 3. Executar a Aplicação
```bash
dotnet run
```
A aplicação estará disponível em:
- **HTTP:** `http://localhost:5205`
- **HTTPS:** `https://localhost:7271`

Ao acessar a URL raiz no navegador, o frontend da aplicação (`wwwroot/index.html`) será carregado automaticamente pela mesma origem.

---

## 📡 Rotas da API (Contrato HTTP)

| Método | Rota | Descrição | Status de Sucesso | Status de Erro |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/filmes` | Retorna todos os filmes | `200 OK` | - |
| **GET** | `/api/filmes/{id}` | Retorna um filme específico por ID | `200 OK` | `404 Not Found` |
| **POST** | `/api/filmes` | Cadastra um novo filme no banco | `201 Created` | `400 Bad Request` |
| **PUT** | `/api/filmes/{id}` | Atualiza os dados de um filme existente | `200 OK` | `404 Not Found` |
| **DELETE** | `/api/filmes/{id}` | Exclui um filme do banco de dados | `204 No Content` | `404 Not Found` |

### Exemplo de Payload para Cadastro / Atualização (JSON):
```json
{
  "titulo": "Interestelar",
  "genero": "Ficção Científica",
  "ano": 2014,
  "nota": 8.6
}
```

---

## 🧪 Como Testar a API

### Opção 1: Bruno
Abra a pasta `bruno/apifilme` no aplicativo [Bruno](https://www.usebruno.com/). A collection já contém todas as requisições configuradas com a variável `{{baseUrl}}` apontando para `http://localhost:5205`:
1. `01 - Listar Filmes`
2. `02 - Cadastrar Filme`
3. `03 - Buscar Filme por ID`
4. `04 - Atualizar Filme`
5. `05 - Excluir Filme`
6. `06 - Buscar Filme Inexistente (404)`

### Opção 2: Postman
Importe o arquivo `Apifilme.postman_collection.json` localizado na raiz do projeto no Postman.

---

## 📂 Estrutura do Projeto

```text
Apifilme/
├── Migrations/                  # Migrações geradas pelo EF Core
├── Properties/
│   └── launchSettings.json      # Configuração de portas de execução
├── bruno/                       # Collection de testes do Bruno
│   └── apifilme/
├── wwwroot/                     # Frontend integrado
│   ├── index.html               # Interface semântica acessível
│   ├── style.css                # Estilos responsivos
│   └── app.js                   # Integração JavaScript com a API (fetch)
├── Apifilme.csproj              # Arquivo de projeto .NET
├── Apifilme.postman_collection.json # Collection do Postman
├── Program.cs                   # Configuração e endpoints da API
├── filmeContext.cs              # DbContext do Entity Framework
├── filmeEntity.cs               # Entidade Filme
├── appsettings.json             # Configuração da ConnectionString SQLite
└── README.md                    # Documentação do projeto
```
