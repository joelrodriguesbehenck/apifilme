// Integração Frontend com a API ASP.NET Core e SQLite (AP2)
document.addEventListener("DOMContentLoaded", () => {
    const listaFilmesContainer = document.getElementById("lista-filmes");
    const totalFilmesBadge = document.getElementById("total-filmes");
    const filmeForm = document.getElementById("filme-form");
    const feedbackMessage = document.getElementById("feedback-message");
    const filmeIdInput = document.getElementById("filme-id");
    const formTitle = document.getElementById("form-title");
    const formDesc = document.getElementById("form-desc");
    const badgeModo = document.getElementById("badge-modo");
    const btnSubmit = document.getElementById("btn-submit");
    const btnCancelar = document.getElementById("btn-cancelar");

    // 1. Busca todos os filmes reais da API (/api/filmes)
    async function buscarFilmes() {
        try {
            const resposta = await fetch("/api/filmes");

            if (!resposta.ok) {
                throw new Error(`Erro na requisição: ${resposta.status}`);
            }

            const filmes = await resposta.json();
            renderizarFilmes(filmes);
        } catch (erro) {
            console.error("Erro ao buscar filmes:", erro);
            exibirMensagem("Erro ao carregar os filmes do banco de dados.", "error");
        }
    }

    // 2. Renderiza a lista de filmes na tela com ações de Editar e Excluir
    function renderizarFilmes(filmes) {
        listaFilmesContainer.innerHTML = "";

        if (!filmes || filmes.length === 0) {
            listaFilmesContainer.innerHTML = `
                <p style="color: var(--text-muted); font-size: 0.95rem; text-align: center; padding: 2rem 0;">
                    Nenhum filme cadastrado no banco SQLite no momento.
                </p>
            `;
            totalFilmesBadge.textContent = "0 filmes";
            return;
        }

        totalFilmesBadge.textContent = `${filmes.length} filme${filmes.length !== 1 ? "s" : ""}`;

        filmes.forEach((filme) => {
            const card = document.createElement("article");
            card.className = "filme-card";

            card.innerHTML = `
                <div class="filme-main">
                    <div class="filme-info">
                        <h3>
                            ${escaparHTML(filme.titulo)}
                            <span class="filme-id-badge" title="ID gravado no SQLite">ID: ${filme.id}</span>
                        </h3>
                        <div class="filme-meta">
                            <span><strong>Gênero:</strong> ${escaparHTML(filme.genero)}</span>
                            <span>•</span>
                            <span><strong>Ano:</strong> ${filme.ano}</span>
                        </div>
                    </div>
                    <div class="filme-nota" title="Nota do filme">
                        ⭐ ${Number(filme.nota).toFixed(1)}
                    </div>
                </div>
                <div class="filme-card-actions">
                    <button type="button" class="btn-card btn-edit" data-id="${filme.id}">
                        ✏️ Editar
                    </button>
                    <button type="button" class="btn-card btn-delete" data-id="${filme.id}" data-titulo="${escaparHTML(filme.titulo)}">
                        🗑️ Excluir
                    </button>
                </div>
            `;

            // Evento para Editar
            const btnEdit = card.querySelector(".btn-edit");
            btnEdit.addEventListener("click", () => iniciarEdicao(filme));

            // Evento para Excluir
            const btnDelete = card.querySelector(".btn-delete");
            btnDelete.addEventListener("click", () => excluirFilme(filme.id, filme.titulo));

            listaFilmesContainer.appendChild(card);
        });
    }

    // 3. Prepara o formulário para edição de um filme
    function iniciarEdicao(filme) {
        filmeIdInput.value = filme.id;
        document.getElementById("titulo").value = filme.titulo;
        document.getElementById("genero").value = filme.genero;
        document.getElementById("ano").value = filme.ano;
        document.getElementById("nota").value = filme.nota;

        formTitle.textContent = `Editar Filme #${filme.id}`;
        formDesc.textContent = "Modifique os campos e clique em 'Salvar Alterações'.";
        badgeModo.textContent = "Edição";
        badgeModo.className = "mode-badge edit";
        btnSubmit.textContent = "Salvar Alterações";
        btnCancelar.hidden = false;

        document.getElementById("titulo").focus();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // 4. Cancela a edição e restaura o formulário para cadastro
    function cancelarEdicao() {
        filmeIdInput.value = "";
        filmeForm.reset();

        formTitle.textContent = "Cadastrar Novo Filme";
        formDesc.textContent = "Preencha os campos abaixo para cadastrar um filme no banco de dados.";
        badgeModo.textContent = "Novo";
        badgeModo.className = "mode-badge";
        btnSubmit.textContent = "Cadastrar Filme";
        btnCancelar.hidden = true;
    }

    btnCancelar.addEventListener("click", cancelarEdicao);

    // 5. Excluir filme na API (DELETE /api/filmes/{id})
    async function excluirFilme(id, titulo) {
        const confirmacao = window.confirm(`Tem certeza que deseja excluir o filme "${titulo}" (ID: ${id}) do banco de dados?`);
        if (!confirmacao) return;

        try {
            const resposta = await fetch(`/api/filmes/${id}`, {
                method: "DELETE"
            });

            if (resposta.status === 204 || resposta.ok) {
                exibirMensagem(`Filme "${titulo}" (ID: ${id}) excluído com sucesso do SQLite!`, "success");

                // Se o filme excluído estava sendo editado, limpa o formulário
                if (filmeIdInput.value === String(id)) {
                    cancelarEdicao();
                }

                await buscarFilmes();
            } else if (resposta.status === 404) {
                exibirMensagem("O filme não foi encontrado no banco de dados.", "error");
                await buscarFilmes();
            } else {
                throw new Error(`Erro ao excluir: ${resposta.status}`);
            }
        } catch (erro) {
            console.error("Erro ao excluir filme:", erro);
            exibirMensagem("Não foi possível excluir o filme na API.", "error");
        }
    }

    // 6. Submissão do Formulário (POST para novo cadastro ou PUT para atualização)
    filmeForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const id = filmeIdInput.value;
        const titulo = document.getElementById("titulo").value.trim();
        const genero = document.getElementById("genero").value;
        const ano = parseInt(document.getElementById("ano").value, 10);
        const nota = parseFloat(document.getElementById("nota").value);

        // Validação
        if (!titulo || !genero || isNaN(ano) || isNaN(nota)) {
            exibirMensagem("Por favor, preencha todos os campos obrigatórios.", "error");
            return;
        }

        if (nota < 0 || nota > 10) {
            exibirMensagem("A nota deve ser um valor entre 0 e 10.", "error");
            return;
        }

        const dadosFilme = {
            titulo: titulo,
            genero: genero,
            ano: ano,
            nota: nota
        };

        const isEdicao = Boolean(id);
        const url = isEdicao ? `/api/filmes/${id}` : "/api/filmes";
        const metodo = isEdicao ? "PUT" : "POST";

        try {
            const resposta = await fetch(url, {
                method: metodo,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosFilme)
            });

            if (isEdicao) {
                // Atualização (PUT) - espera 200 OK
                if (resposta.ok) {
                    exibirMensagem(`Filme "${titulo}" atualizado com sucesso no SQLite!`, "success");
                    cancelarEdicao();
                    await buscarFilmes();
                } else if (resposta.status === 404) {
                    exibirMensagem("Filme não encontrado para atualização.", "error");
                } else {
                    throw new Error(`Erro na atualização: ${resposta.status}`);
                }
            } else {
                // Cadastro (POST) - espera 201 Created
                if (resposta.status === 201 || resposta.ok) {
                    const novoFilme = await resposta.json();
                    exibirMensagem(`Filme "${novoFilme.titulo}" cadastrado com sucesso com ID ${novoFilme.id}!`, "success");
                    cancelarEdicao();
                    await buscarFilmes();
                } else {
                    throw new Error(`Erro no cadastro: ${resposta.status}`);
                }
            }
        } catch (erro) {
            console.error("Erro na operação:", erro);
            exibirMensagem(`Falha ao comunicar com a API: ${erro.message}`, "error");
        }
    });

    // Função utilitária para sanitização simples de texto
    function escaparHTML(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Exibição de mensagens de feedback
    function exibirMensagem(texto, tipo) {
        feedbackMessage.textContent = texto;
        feedbackMessage.className = `feedback-message ${tipo}`;
        feedbackMessage.hidden = false;

        setTimeout(() => {
            feedbackMessage.hidden = true;
        }, 5000);
    }

    // Carga inicial
    buscarFilmes();
});
