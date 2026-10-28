
const produtos = [
    {
        id: 1,
        nome: "Vestido Midi Lunna",
        descricao: "Vestido versátil para diferentes ocasiões.",
        preco: 129.90,
        categoria: "Roupas",
        vendedor: "Lunna Fashion",
        imagemTexto: "VESTIDO"
    },
    {
        id: 2,
        nome: "Blusa Casual",
        descricao: "Blusa confortável para o dia a dia.",
        preco: 79.90,
        categoria: "Roupas",
        vendedor: "Estilo Rosa",
        imagemTexto: "BLUSA"
    },
    {
        id: 3,
        nome: "Bolsa Tiracolo",
        descricao: "Bolsa prática para completar seu visual.",
        preco: 159.90,
        categoria: "Acessórios",
        vendedor: "Acessórios Luna",
        imagemTexto: "BOLSAS"
    },
    {
        id: 4,
        nome: "Gloss Labial",
        descricao: "Gloss para dar brilho à sua maquiagem.",
        preco: 49.90,
        categoria: "Beleza",
        vendedor: "Beauty Pink",
        imagemTexto: "BELEZA"
    },
    {
        id: 5,
        nome: "Tênis Casual",
        descricao: "Tênis para combinar com vários estilos.",
        preco: 139.90,
        categoria: "Calçados",
        vendedor: "Passo Leve",
        imagemTexto: "CALÇADOS"
    },
    {
        id: 6,
        nome: "Colar Delicado",
        descricao: "Acessório delicado para completar o look.",
        preco: 39.90,
        categoria: "Acessórios",
        vendedor: "Acessórios Luna",
        imagemTexto: "COLARES"
    },
    {
        id: 7,
        nome: "Kit de Beleza",
        descricao: "Kit demonstrativo de produtos de beleza.",
        preco: 89.90,
        categoria: "Beleza",
        vendedor: "Beauty Pink",
        imagemTexto: "CUIDADOS"
    },
    {
        id: 8,
        nome: "Sandália Elegante",
        descricao: "Sandália para diferentes ocasiões.",
        preco: 99.90,
        categoria: "Calçados",
        vendedor: "Passo Leve",
        imagemTexto: "SANDÁLIAS"
    }
];

let carrinho = [];
let favoritos = [];
let categoriaAtual = "Todas";
let descontoAtual = 0;
let cupomAplicado = false;
let proximoPedido = 1001;

function moeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarTela(nome) {
    document.querySelectorAll(".tela").forEach(tela => {
        tela.classList.add("escondida");
    });

    const telaSelecionada = document.getElementById("tela-" + nome);

    if (telaSelecionada) {
        telaSelecionada.classList.remove("escondida");
    }

    if (nome === "inicio") {
        renderizarProdutos("lista-inicial", produtos.slice(0, 4));
    }

    if (nome === "produtos") {
        renderizarCatalogo();
    }

    if (nome === "carrinho") {
        renderizarCarrinho();
    }

    if (nome === "favoritos") {
        renderizarFavoritos();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderizarProdutos(elementoId, lista) {
    const elemento = document.getElementById(elementoId);

    if (!elemento) return;

    if (lista.length === 0) {
        elemento.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    elemento.innerHTML = lista.map(produto => `
        <article class="produto">
            <div class="produto-imagem">
                ${produto.imagemTexto}
            </div>

            <div class="produto-conteudo">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <p><small>Vendido por ${produto.vendedor}</small></p>
                <p class="preco">${moeda(produto.preco)}</p>

                <button onclick="verDetalhes(${produto.id})">
                    Ver detalhes
                </button>

                <button onclick="adicionarCarrinho(${produto.id})">
                    Adicionar ao carrinho
                </button>

                <button onclick="alternarFavorito(${produto.id})">
                    ${favoritos.includes(produto.id)
                        ? "Remover dos favoritos"
                        : "Adicionar aos favoritos"}
                </button>
            </div>
        </article>
    `).join("");
}

function renderizarCatalogo() {
    const pesquisa = document.getElementById("pesquisa")
        .value.trim().toLowerCase();

    const lista = produtos.filter(produto => {
        const correspondePesquisa =
            produto.nome.toLowerCase().includes(pesquisa) ||
            produto.descricao.toLowerCase().includes(pesquisa) ||
            produto.categoria.toLowerCase().includes(pesquisa);

        const correspondeCategoria =
            categoriaAtual === "Todas" ||
            produto.categoria === categoriaAtual;

        return correspondePesquisa && correspondeCategoria;
    });

    document.getElementById("titulo-produtos").textContent =
        categoriaAtual === "Todas"
            ? "Nossos produtos"
            : categoriaAtual;

    renderizarProdutos("lista-produtos", lista);

    document.getElementById("mensagem-produtos").textContent =
        lista.length === 0
            ? "Não encontramos produtos com esses critérios."
            : "";
}

function filtrarCategoria(categoria) {
    categoriaAtual = categoria;
    document.getElementById("pesquisa").value = "";
    mostrarTela("produtos");
}

function verDetalhes(id) {
    const produto = produtos.find(item => item.id === id);

    if (!produto) return;

    document.getElementById("detalhes-produto").innerHTML = `
        <div class="produto-imagem">
            ${produto.imagemTexto}
        </div>

        <div>
            <p>${produto.categoria}</p>
            <h2>${produto.nome}</h2>
            <p>${produto.descricao}</p>
            <p>Vendido por: ${produto.vendedor}</p>
            <p class="preco">${moeda(produto.preco)}</p>

            <button class="botao"
                onclick="adicionarCarrinho(${produto.id})">
                Adicionar ao carrinho
            </button>

            <button class="botao-secundario"
                onclick="alternarFavorito(${produto.id})">
                Adicionar ou remover favorito
            </button>
        </div>
    `;

    mostrarTela("detalhes");
}

function adicionarCarrinho(id) {
    const produto = produtos.find(item => item.id === id);

    if (!produto) return;

    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarQuantidade();
    alert("Produto adicionado ao carrinho.");
}

function atualizarQuantidade() {
    const quantidade = carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    document.getElementById("quantidade-carrinho").textContent =
        quantidade;
}

function mostrarCarrinho() {
    mostrarTela("carrinho");
}

function alterarQuantidade(id, variacao) {
    const item = carrinho.find(produto => produto.id === id);

    if (!item) return;

    item.quantidade += variacao;

    if (item.quantidade <= 0) {
        carrinho = carrinho.filter(produto => produto.id !== id);
    }

    atualizarQuantidade();
    renderizarCarrinho();
}

function removerItem(id) {
    carrinho = carrinho.filter(item => item.id !== id);

    atualizarQuantidade();
    renderizarCarrinho();
}

function calcularSubtotal() {
    return carrinho.reduce(
        (total, item) => total + item.preco * item.quantidade,
        0
    );
}

function calcularFrete() {
    return carrinho.length === 0 ? 0 : 12;
}

function calcularTotal() {
    return Math.max(
        0,
        calcularSubtotal() + calcularFrete() - descontoAtual
    );
}

function renderizarCarrinho() {
    const elemento = document.getElementById("itens-carrinho");

    if (carrinho.length === 0) {
        elemento.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
        elemento.innerHTML = carrinho.map(item => `
            <div class="item-carrinho">
                <div>
                    <h3>${item.nome}</h3>
                    <p>${moeda(item.preco)} cada</p>
                    <p>Quantidade: ${item.quantidade}</p>
                    <p>Subtotal: ${moeda(item.preco * item.quantidade)}</p>
                </div>

                <div>
                    <button onclick="alterarQuantidade(${item.id}, -1)">
                        Diminuir
                    </button>

                    <button onclick="alterarQuantidade(${item.id}, 1)">
                        Aumentar
                    </button>

                    <button onclick="removerItem(${item.id})">
                        Remover
                    </button>
                </div>
            </div>
        `).join("");
    }

    document.getElementById("subtotal").textContent =
        moeda(calcularSubtotal());

    document.getElementById("frete").textContent =
        moeda(calcularFrete());

    document.getElementById("desconto").textContent =
        moeda(descontoAtual);

    document.getElementById("total-compra").textContent =
        moeda(calcularTotal());
}

function aplicarCupom() {
    const codigo = document.getElementById("codigo-cupom")
        .value.trim().toUpperCase();

    const mensagem = document.getElementById("mensagem-cupom");

    if (carrinho.length === 0) {
        mensagem.textContent =
            "Adicione produtos antes de aplicar o cupom.";
        return;
    }

    if (codigo === "LUNNA10" && !cupomAplicado) {
        descontoAtual = calcularSubtotal() * 0.10;
        cupomAplicado = true;
        mensagem.textContent = "Cupom aplicado: 10% de desconto.";
    } else if (codigo === "LUNNA10" && cupomAplicado) {
        mensagem.textContent = "Este cupom já foi aplicado.";
    } else {
        mensagem.textContent = "Cupom inválido. Tente LUNNA10.";
    }

    renderizarCarrinho();
}

function abrirCheckout() {
    if (carrinho.length === 0) {
        alert("Adicione pelo menos um produto ao carrinho.");
        return;
    }

    document.getElementById("resumo-checkout").innerHTML = `
        <p>Subtotal: ${moeda(calcularSubtotal())}</p>
        <p>Frete demonstrativo: ${moeda(calcularFrete())}</p>
        <p>Desconto: ${moeda(descontoAtual)}</p>
        <h3>Total: ${moeda(calcularTotal())}</h3>
    `;

    atualizarFormaPagamento();
    mostrarTela("checkout");
}

function atualizarParcelas() {
    const pagamento = document.getElementById("pagamento").value;

    if (pagamento !== "credito") return;

    const quantidade = Number(
        document.getElementById("parcelas").value
    );

    const valor = calcularTotal() / quantidade;

    document.getElementById("valor-parcela").textContent =
        `Simulação: ${quantidade}x de ${moeda(valor)}, sem juros.`;
}

function atualizarFormaPagamento() {
    const pagamento = document.getElementById("pagamento").value;
    const campoParcelas = document.getElementById("campo-parcelas");
    const parcelas = document.getElementById("parcelas");

    if (pagamento === "credito") {
        campoParcelas.classList.remove("escondida");
        parcelas.required = true;
        atualizarParcelas();
    } else {
        campoParcelas.classList.add("escondida");
        parcelas.required = false;
        document.getElementById("valor-parcela").textContent = "";
    }
}

function alternarFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(item => item !== id);
    } else {
        favoritos.push(id);
    }

    renderizarProdutos("lista-inicial", produtos.slice(0, 4));
    renderizarCatalogo();
    renderizarFavoritos();

    const telaDetalhes = document.getElementById("tela-detalhes");

    if (!telaDetalhes.classList.contains("escondida")) {
        verDetalhes(id);
    }
}

function mostrarFavoritos() {
    mostrarTela("favoritos");
}

function renderizarFavoritos() {
    const lista = produtos.filter(
        produto => favoritos.includes(produto.id)
    );

    renderizarProdutos("lista-favoritos", lista);
}

document.getElementById("pesquisa").addEventListener("input", () => {
    categoriaAtual = "Todas";

    const telaProdutos = document.getElementById("tela-produtos");
    const telaVisivel = !telaProdutos.classList.contains("escondida");

    if (!telaVisivel) {
        mostrarTela("produtos");
    } else {
        renderizarCatalogo();
    }
});

document.getElementById("pagamento").addEventListener(
    "change",
    atualizarFormaPagamento
);

document.getElementById("parcelas").addEventListener(
    "change",
    atualizarParcelas
);

document.getElementById("form-checkout").addEventListener(
    "submit",
    evento => {
        evento.preventDefault();

        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio.");
            mostrarCarrinho();
            return;
        }

        const nome = document.getElementById("nome").value.trim();
        const pagamento = document.getElementById("pagamento").value;

        if (!nome || !pagamento) {
            alert("Preencha os campos obrigatórios.");
            return;
        }

        let forma = "Pix demonstrativo";

        if (pagamento === "debito") {
            forma = "Cartão de débito demonstrativo";
        }

        if (pagamento === "credito") {
            const quantidade = Number(
                document.getElementById("parcelas").value
            );

            forma = `Cartão de crédito demonstrativo em ${quantidade}x`;
        }

        const totalFinal = calcularTotal();

        document.getElementById("mensagem-confirmacao").textContent =
            `Obrigada, ${nome}! Pedido demonstrativo nº ${proximoPedido}. ` +
            `Total: ${moeda(totalFinal)}. Pagamento: ${forma}.`;

        proximoPedido++;

        carrinho = [];
        descontoAtual = 0;
        cupomAplicado = false;

        atualizarQuantidade();
        document.getElementById("form-checkout").reset();

        document.getElementById("campo-parcelas")
            .classList.add("escondida");

        mostrarTela("confirmacao");
    }
);

renderizarProdutos("lista-inicial", produtos.slice(0, 4));
atualizarQuantidade();
