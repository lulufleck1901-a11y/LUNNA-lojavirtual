
// LUNNA — funcionalidades da loja virtual

// LISTA DE PRODUTOS
const produtos = [
    {
        id: 1,
        nome: "Vestido Midi Lunna",
        categoria: "Roupas",
        preco: 129.90,
        cor: "Rosa",
        tamanho: "P, M, G",
        imagem: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85",
        descricao: "Vestido midi delicado, com modelagem confortável e caimento leve. Perfeito para diferentes ocasiões.",
        popularidade: 10
    },
    {
        id: 2,
        nome: "Blusa Cropped",
        categoria: "Roupas",
        preco: 79.90,
        cor: "Branco",
        tamanho: "P, M, G",
        imagem: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=700&q=85",
        descricao: "Blusa versátil para compor looks casuais e modernos.",
        popularidade: 9
    },
    {
        id: 3,
        nome: "Bolsa Tiracolo",
        categoria: "Acessórios",
        preco: 159.90,
        cor: "Rosa",
        tamanho: "Único",
        imagem: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85",
        descricao: "Bolsa compacta e prática para acompanhar sua rotina.",
        popularidade: 8
    },
    {
        id: 4,
        nome: "Gloss Labial",
        categoria: "Beleza",
        preco: 49.90,
        cor: "Rosa",
        tamanho: "Único",
        imagem: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&w=700&q=85",
        descricao: "Gloss com acabamento luminoso para completar sua produção.",
        popularidade: 9
    },
    {
        id: 5,
        nome: "Calçado Casual",
        categoria: "Calçados",
        preco: 119.90,
        cor: "Bege",
        tamanho: "34 ao 39",
        imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=85",
        descricao: "Calçado confortável e versátil para o dia a dia.",
        popularidade: 7
    },
    {
        id: 6,
        nome: "Jaqueta Jeans",
        categoria: "Roupas",
        preco: 189.90,
        cor: "Azul",
        tamanho: "P, M, G",
        imagem: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=700&q=85",
        descricao: "Jaqueta jeans para criar combinações despojadas.",
        popularidade: 6
    },
    {
        id: 7,
        nome: "Colar Delicado",
        categoria: "Acessórios",
        preco: 59.90,
        cor: "Bege",
        tamanho: "Único",
        imagem: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=85",
        descricao: "Acessório delicado para complementar diferentes estilos.",
        popularidade: 8
    },
    {
        id: 8,
        nome: "Hidratante Corporal",
        categoria: "Beleza",
        preco: 69.90,
        cor: "Branco",
        tamanho: "Único",
        imagem: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85",
        descricao: "Produto demonstrativo para sua rotina de autocuidado.",
        popularidade: 5
    }
];

// VARIÁVEIS DO SITE
let categoriaAtual = "Todos";
let termoAtual = "";
let produtoAtual = null;

// RECUPERAR DADOS SALVOS
function recuperarDados(chave) {
    try {
        return JSON.parse(localStorage.getItem(chave)) || [];
    } catch {
        return [];
    }
}

let carrinho = recuperarDados("lunnaCarrinho");
let favoritos = recuperarDados("lunnaFavoritos");

// GARANTIR QUE OS DADOS SEJAM VÁLIDOS
if (!Array.isArray(carrinho)) carrinho = [];
if (!Array.isArray(favoritos)) favoritos = [];

// FORMATAÇÃO DE PREÇOS
function moeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// NOTIFICAÇÕES PERSONALIZADAS
function mostrarNotificacao(mensagem, tipo = "sucesso") {
    const container = document.getElementById("toastContainer");

    if (!container) return;

    const notificacao = document.createElement("div");
    notificacao.className = "toast";

    const icone = tipo === "erro" ? "!" : "✓";

    notificacao.innerHTML = `
        <span class="toast-icon">${icone}</span>
        <span>${mensagem}</span>
    `;

    container.appendChild(notificacao);

    setTimeout(() => {
        notificacao.classList.add("saindo");

        setTimeout(() => {
            notificacao.remove();
        }, 250);

    }, 3000);
}

// SALVAR DADOS
function salvarDados() {
    localStorage.setItem("lunnaCarrinho", JSON.stringify(carrinho));
    localStorage.setItem("lunnaFavoritos", JSON.stringify(favoritos));

    atualizarContador();
}

// ATUALIZAR CONTADOR DO CARRINHO
function atualizarContador() {
    const contador = document.getElementById("contadorCarrinho");

    const total = carrinho.reduce(
        (soma, item) => soma + item.quantidade,
        0
    );

    contador.textContent = total;
    contador.setAttribute("aria-label", `${total} produtos no carrinho`);
}

// TROCAR DE PÁGINA
function mostrarTela(id) {
    document.querySelectorAll(".tela").forEach(tela => {
        tela.classList.remove("ativa");
    });

    const tela = document.getElementById(id);

    if (tela) {
        tela.classList.add("ativa");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (id === "todosProdutos") renderizarCatalogo();
    if (id === "favoritos") renderizarFavoritos();
    if (id === "carrinho") renderizarCarrinho();
    if (id === "checkout") renderizarResumoCheckout();
}

// IR PARA PRODUTOS
function irParaProdutos() {
    categoriaAtual = "Todos";
    termoAtual = "";

    document.getElementById("campoPesquisa").value = "";
    document.getElementById("filtroCategoria").value = "Todos";

    mostrarTela("todosProdutos");
}

// FILTRAR CATEGORIAS
function filtrarCategoria(categoria) {
    categoriaAtual = categoria;
    termoAtual = "";

    document.getElementById("campoPesquisa").value = "";
    document.getElementById("filtroCategoria").value = categoria;

    mostrarTela("todosProdutos");
}

// CRIAR CARD DOS PRODUTOS
function criarCard(produto) {
    const favoritado = favoritos.includes(produto.id);

    return `
        <article class="product-card">

            <button
                class="favorite-button ${favoritado ? "active" : ""}"
                onclick="alternarFavorito(${produto.id})"
                aria-label="${favoritado ? "Remover dos favoritos" : "Adicionar aos favoritos"}">

                ${favoritado ? "♥" : "♡"}

            </button>

            <button
                class="product-image-button"
                onclick="abrirProduto(${produto.id})"
                aria-label="Ver ${produto.nome}">

                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                    loading="lazy">

            </button>

            <button
                class="product-name"
                onclick="abrirProduto(${produto.id})">

                ${produto.nome}

            </button>

            <div class="product-price">
                ${moeda(produto.preco)}
            </div>

            <button
                class="quick-add"
                onclick="adicionarCarrinho(${produto.id})">

                + Adicionar ao carrinho

            </button>

        </article>
    `;
}

// MOSTRAR PRODUTOS NA PÁGINA INICIAL
function renderizarInicio() {
    document.getElementById("gradeInicio").innerHTML =
        produtos.slice(0, 4).map(criarCard).join("");
}

// MOSTRAR CATÁLOGO
function renderizarCatalogo() {
    const categoria = document.getElementById("filtroCategoria").value;
    const precoMax = Number(document.getElementById("filtroPreco").value);
    const cor = document.getElementById("filtroCor").value;
    const ordenacao = document.getElementById("ordenacao").value;

    let lista = produtos.filter(p =>
        (categoria === "Todos" || p.categoria === categoria) &&
        (categoriaAtual === "Todos" || p.categoria === categoriaAtual) &&
        p.preco <= precoMax &&
        (cor === "Todas" || p.cor === cor) &&
        p.nome.toLowerCase().includes(termoAtual.toLowerCase())
    );

    if (ordenacao === "menor") {
        lista.sort((a, b) => a.preco - b.preco);
    }

    if (ordenacao === "maior") {
        lista.sort((a, b) => b.preco - a.preco);
    }

    if (ordenacao === "popular") {
        lista.sort((a, b) => b.popularidade - a.popularidade);
    }

    if (ordenacao === "recentes") {
        lista.sort((a, b) => b.id - a.id);
    }

    document.getElementById("tituloResultados").textContent =
        termoAtual
            ? `Resultados para "${termoAtual}"`
            : categoria !== "Todos"
                ? categoria
                : categoriaAtual !== "Todos"
                    ? categoriaAtual
                    : "Todos os produtos";

    document.getElementById("quantidadeResultados").textContent =
        `${lista.length} produto(s) encontrado(s)`;

    document.getElementById("gradeCatalogo").innerHTML =
        lista.map(criarCard).join("");

    document.getElementById("semResultados")
        .classList.toggle("hidden", lista.length !== 0);

    document.getElementById("valorPreco").textContent =
        `Até ${moeda(precoMax)}`;
}

// ABRIR PRODUTO
function abrirProduto(id) {
    produtoAtual = produtos.find(p => p.id === id);

    if (!produtoAtual) return;

    const p = produtoAtual;

    document.getElementById("detalheProduto").innerHTML = `
        <div class="product-detail">

            <div>
                <img
                    class="detail-main-image"
                    src="${p.imagem}"
                    alt="${p.nome}">

                <div class="detail-thumbnails">
                    <button>
                        <img src="${p.imagem}" alt="Visualização do produto">
                    </button>
                </div>
            </div>

            <div class="detail-info">

                <div class="breadcrumb">
                    Início › ${p.categoria} › ${p.nome}
                </div>

                <h1>${p.nome}</h1>

                <div class="rating">
                    ★★★★★
                    <span class="muted">
                        (avaliações demonstrativas)
                    </span>
                </div>

                <div class="detail-price">
                    ${moeda(p.preco)}
                </div>

                <p class="detail-description">
                    ${p.descricao}
                </p>

                <div class="option-group">
                    <strong>Cor: ${p.cor}</strong>
                    <button class="option-chip selected">${p.cor}</button>
                </div>

                <div class="option-group">
                    <strong>Tamanho: ${p.tamanho}</strong>

                    ${p.tamanho.split(", ").map(t => `
                        <button
                            class="option-chip"
                            onclick="selecionarOpcao(this)">
                            ${t}
                        </button>
                    `).join("")}
                </div>

                <div class="quantity-control">
                    <strong>Quantidade:</strong>

                    <input
                        id="quantidadeProduto"
                        type="number"
                        min="1"
                        max="20"
                        value="1">
                </div>

                <div class="detail-actions">
                    <button
                        class="primary-button"
                        onclick="adicionarCarrinho(
                            ${p.id},
                            Number(document.getElementById('quantidadeProduto').value)
                        )">
                        Adicionar ao carrinho
                    </button>

                    <button
                        class="outline-button"
                        onclick="comprarAgora(${p.id})">
                        Comprar agora
                    </button>
                </div>

                <p class="muted small">
                    ♡ Compra demonstrativa · Troca ilustrativa · Navegação segura
                </p>

                <details class="accordion" open>
                    <summary>Descrição</summary>
                    <p>${p.descricao}</p>
                </details>

                <details class="accordion">
                    <summary>Características</summary>
                    <p>
                        Categoria: ${p.categoria}<br>
                        Cor: ${p.cor}<br>
                        Tamanho disponível: ${p.tamanho}
                    </p>
                </details>

                <details class="accordion">
                    <summary>Avaliações (0)</summary>
                    <p>
                        As avaliações exibidas neste projeto
                        são apenas ilustrativas.
                    </p>
                </details>

            </div>
        </div>
    `;

    mostrarTela("produto");
}

// SELECIONAR TAMANHO
function selecionarOpcao(botao) {
    botao.parentElement
        .querySelectorAll(".option-chip")
        .forEach(b => b.classList.remove("selected"));

    botao.classList.add("selected");
}

// ADICIONAR AO CARRINHO
function adicionarCarrinho(id, quantidade = 1) {
    const p = produtos.find(item => item.id === id);

    if (!p) return;

    quantidade = Math.max(1, Math.min(20, Number(quantidade) || 1));

    const existente = carrinho.find(item => item.id === id);

    if (existente) {
        existente.quantidade = Math.min(
            20,
            existente.quantidade + quantidade
        );
    } else {
        carrinho.push({
            id,
            quantidade
        });
    }

    salvarDados();

    mostrarNotificacao(`${p.nome} adicionado ao carrinho!`);
}

// COMPRAR AGORA
function comprarAgora(id) {
    adicionarCarrinho(id, 1);
    mostrarTela("carrinho");
}

// ALTERAR QUANTIDADE
function alterarQuantidade(id, valor) {
    const item = carrinho.find(p => p.id === id);

    if (!item) return;

    item.quantidade = Math.max(1, Math.min(20, Number(valor) || 1));

    salvarDados();
    renderizarCarrinho();
}

// REMOVER PRODUTO DO CARRINHO
function removerCarrinho(id) {
    const item = produtos.find(p => p.id === id);

    carrinho = carrinho.filter(p => p.id !== id);

    salvarDados();
    renderizarCarrinho();

    if (item) {
        mostrarNotificacao(`${item.nome} removido do carrinho.`);
    }
}

// FAVORITOS
function alternarFavorito(id) {
    const p = produtos.find(item => item.id === id);

    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(item => item !== id);
        mostrarNotificacao(`${p.nome} removido dos favoritos.`);
    } else {
        favoritos.push(id);
        mostrarNotificacao(`${p.nome} adicionado aos favoritos!`);
    }

    salvarDados();
    renderizarInicio();

    if (document.getElementById("todosProdutos").classList.contains("ativa")) {
        renderizarCatalogo();
    }

    if (document.getElementById("favoritos").classList.contains("ativa")) {
        renderizarFavoritos();
    }
}

// MOSTRAR FAVORITOS
function renderizarFavoritos() {
    const lista = produtos.filter(p => favoritos.includes(p.id));

    document.getElementById("gradeFavoritos").innerHTML =
        lista.map(criarCard).join("");

    document.getElementById("favoritosVazios")
        .classList.toggle("hidden", lista.length > 0);
}

// MOSTRAR CARRINHO
function renderizarCarrinho() {
    const area = document.getElementById("conteudoCarrinho");

    if (carrinho.length === 0) {
        area.innerHTML = `
            <div class="empty-message">
                <h2>Seu carrinho está vazio</h2>
                <p>Que tal encontrar algo especial?</p>

                <button
                    class="primary-button"
                    onclick="mostrarTela('todosProdutos')">
                    Continuar comprando
                </button>
            </div>
        `;
        return;
    }

    const subtotal = carrinho.reduce((soma, item) => {
        const p = produtos.find(prod => prod.id === item.id);
        return soma + (p ? p.preco * item.quantidade : 0);
    }, 0);

    area.innerHTML = `
        <div class="cart-layout">

            <div>
                ${carrinho.map(item => {
                    const p = produtos.find(prod => prod.id === item.id);

                    if (!p) return "";

                    return `
                        <div class="cart-item">

                            <img src="${p.imagem}" alt="${p.nome}">

                            <div>
                                <h3>${p.nome}</h3>
                                <p>${moeda(p.preco)}</p>

                                <label class="small">
                                    Quantidade:
                                    <input
                                        type="number"
                                        min="1"
                                        max="20"
                                        value="${item.quantidade}"
                                        onchange="alterarQuantidade(${p.id}, this.value)">
                                </label>
                            </div>

                            <button
                                class="remove-button"
                                onclick="removerCarrinho(${p.id})">
                                Remover
                            </button>

                        </div>
                    `;
                }).join("")}
            </div>

            <aside class="cart-summary">
                <h2>Resumo da compra</h2>

                <div class="summary-line">
                    <span>Subtotal</span>
                    <strong>${moeda(subtotal)}</strong>
                </div>

                <div class="summary-line">
                    <span>Frete demonstrativo</span>
                    <strong>Grátis</strong>
                </div>

                <div class="summary-line summary-total">
                    <span>Total</span>
                    <strong>${moeda(subtotal)}</strong>
                </div>

                <button
                    class="primary-button full-button"
                    onclick="mostrarTela('checkout')">
                    Continuar compra
                </button>

                <button
                    class="text-button full-button"
                    onclick="mostrarTela('todosProdutos')">
                    Continuar comprando
                </button>
            </aside>

        </div>
    `;
}

// RESUMO DO CHECKOUT
function renderizarResumoCheckout() {
    const subtotal = carrinho.reduce((soma, item) => {
        const p = produtos.find(prod => prod.id === item.id);
        return soma + (p ? p.preco * item.quantidade : 0);
    }, 0);

    document.getElementById("resumoCheckout").innerHTML = `
        <div class="summary-line">
            <span>Itens</span>
            <strong>${carrinho.reduce((s, i) => s + i.quantidade, 0)}</strong>
        </div>

        <div class="summary-line">
            <span>Subtotal</span>
            <strong>${moeda(subtotal)}</strong>
        </div>

        <div class="summary-line">
            <span>Frete demonstrativo</span>
            <strong>Grátis</strong>
        </div>

        <div class="summary-line summary-total">
            <span>Total</span>
            <strong>${moeda(subtotal)}</strong>
        </div>
    `;
}

// PESQUISAR PRODUTOS
function pesquisar(evento) {
    evento.preventDefault();

    termoAtual = document.getElementById("campoPesquisa").value.trim();
    categoriaAtual = "Todos";

    document.getElementById("filtroCategoria").value = "Todos";

    mostrarTela("todosProdutos");
}

// FORMULÁRIO DE PESQUISA
document.getElementById("formPesquisa")
    .addEventListener("submit", pesquisar);

// FILTROS E ORDENAÇÃO
[
    "filtroCategoria",
    "filtroPreco",
    "filtroCor",
    "ordenacao"
].forEach(id => {
    document.getElementById(id).addEventListener("input", () => {
        categoriaAtual = "Todos";
        renderizarCatalogo();
    });
});

// LIMPAR FILTROS
document.getElementById("limparFiltros")
    .addEventListener("click", () => {
        document.getElementById("filtroCategoria").value = "Todos";
        document.getElementById("filtroPreco").value = 300;
        document.getElementById("filtroCor").value = "Todas";
        document.getElementById("ordenacao").value = "popular";

        categoriaAtual = "Todos";
        termoAtual = "";

        document.getElementById("campoPesquisa").value = "";

        renderizarCatalogo();
    });

// CADASTRO
document.getElementById("formCadastro")
    .addEventListener("submit", evento => {
        evento.preventDefault();

        const dados = new FormData(evento.target);
        const senha = dados.get("senha");
        const confirmar = dados.get("confirmar");

        const feedback = document.getElementById("feedbackCadastro");

        if (senha !== confirmar) {
            feedback.textContent = "As senhas não coincidem.";
            return;
        }

        feedback.textContent =
            "Cadastro demonstrativo validado! Você já pode acessar a tela de login.";

        evento.target.reset();
    });

// LOGIN
document.getElementById("formLogin")
    .addEventListener("submit", evento => {
        evento.preventDefault();

        document.getElementById("feedbackLogin").textContent =
            "Dados preenchidos. Esta é uma demonstração: não existe autenticação em servidor.";
    });

// FINALIZAR PEDIDO
document.getElementById("formCheckout")
    .addEventListener("submit", evento => {
        evento.preventDefault();

        if (carrinho.length === 0) {
            mostrarNotificacao("Adicione produtos ao carrinho antes de finalizar.", "erro");
            mostrarTela("todosProdutos");
            return;
        }

        const dados = new FormData(evento.target);
        const numero = "LN" + Math.floor(100000 + Math.random() * 900000);

        document.getElementById("mensagemPedido").textContent =
            `Pedido demonstrativo ${numero} registrado para ${dados.get("nome")}. Forma de pagamento selecionada: ${dados.get("pagamento")}.`;

        carrinho = [];

        salvarDados();
        evento.target.reset();

        mostrarTela("confirmacao");
    });

// NEWSLETTER
document.getElementById("formNewsletter")
    .addEventListener("submit", evento => {
        evento.preventDefault();

        document.getElementById("feedbackNewsletter").textContent =
            "Inscrição demonstrativa realizada!";

        evento.target.reset();
    });

// CONTATO
document.getElementById("formContato")
    .addEventListener("submit", evento => {
        evento.preventDefault();

        document.getElementById("feedbackContato").textContent =
            "Mensagem demonstrativa enviada com sucesso!";

        evento.target.reset();
    });

// INICIAR A LOJA
renderizarInicio();
atualizarContador();
