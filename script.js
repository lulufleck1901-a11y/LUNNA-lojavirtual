
let carrinho = [];
let favoritos = [];
let corSelecionada = "Rosa";
let tamanhoSelecionado = "M";
let quantidade = 1;
let termoPesquisa = "";

// TROCAR DE TELA
function mostrarTela(tela) {
    document.querySelectorAll(".tela").forEach(function (pagina) {
        pagina.classList.add("escondida");
    });

    let pagina = document.getElementById("tela-" + tela);

    if (pagina) {
        pagina.classList.remove("escondida");
    }

    window.scrollTo(0, 0);
}

// PESQUISAR PRODUTOS
function pesquisarProduto() {
    termoPesquisa = document.getElementById("pesquisa").value
        .toLowerCase()
        .trim();

    mostrarTela("categoria");
    aplicarFiltros();
}

// FILTRAR POR CATEGORIA
function filtrarCategoria(categoria) {
    termoPesquisa = "";

    document.getElementById("pesquisa").value = "";

    document.querySelectorAll(".filtro-categoria").forEach(function (filtro) {
        filtro.checked = filtro.value === categoria;
    });

    if (categoria === "todos") {
        document.querySelectorAll(".filtro-categoria").forEach(function (filtro) {
            filtro.checked = false;
        });
    }

    mostrarTela("categoria");
    aplicarFiltros();
}

// APLICAR OS FILTROS
function aplicarFiltros() {
    let produtos = document.querySelectorAll("#grade-resultados .resultado");

    let categorias = [];

    document.querySelectorAll(".filtro-categoria:checked").forEach(function (filtro) {
        categorias.push(filtro.value);
    });

    let precoBaixo = document.getElementById("preco-baixo").checked;
    let encontrados = 0;

    produtos.forEach(function (produto) {
        let nome = produto.dataset.nome.toLowerCase();
        let categoria = produto.dataset.categoria;
        let preco = Number(produto.dataset.preco);

        let correspondeNome = nome.includes(termoPesquisa);
        let correspondeCategoria =
            categorias.length === 0 || categorias.includes(categoria);
        let correspondePreco = !precoBaixo || preco <= 100;

        if (correspondeNome && correspondeCategoria && correspondePreco) {
            produto.style.display = "";
            encontrados++;
        } else {
            produto.style.display = "none";
        }
    });

    document.getElementById("total-resultados").textContent =
        encontrados + " produto(s) encontrado(s)";

    ordenarProdutos();
}

// ORDENAR POR PREÇO
function ordenarProdutos() {
    let grade = document.getElementById("grade-resultados");
    let produtos = Array.from(grade.querySelectorAll(".resultado"));
    let ordem = document.getElementById("ordenar").value;

    if (ordem === "menor") {
        produtos.sort(function (a, b) {
            return Number(a.dataset.preco) - Number(b.dataset.preco);
        });
    } else if (ordem === "maior") {
        produtos.sort(function (a, b) {
            return Number(b.dataset.preco) - Number(a.dataset.preco);
        });
    }

    produtos.forEach(function (produto) {
        grade.appendChild(produto);
    });
}

// ABRIR DETALHES DO VESTIDO
function abrirProduto() {
    mostrarTela("produto");
}

// TROCAR A FOTO PRINCIPAL
function trocarFoto(imagem) {
    document.getElementById("foto-principal").src = imagem.src;
}

// ESCOLHER A COR
function selecionarCor(botao, cor) {
    corSelecionada = cor;

    document.querySelectorAll(".cor-opcao").forEach(function (opcao) {
        opcao.classList.remove("selecionada");
    });

    botao.classList.add("selecionada");

    document.getElementById("cor-escolhida").textContent = cor;
}

// ESCOLHER O TAMANHO
function selecionarTamanho(botao, tamanho) {
    tamanhoSelecionado = tamanho;

    document.querySelectorAll(".opcoes-tamanho button").forEach(function (opcao) {
        opcao.classList.remove("selecionado");
    });

    botao.classList.add("selecionado");

    document.getElementById("tamanho-escolhido").textContent = tamanho;
}

// ALTERAR A QUANTIDADE
function alterarQuantidade(valor) {
    quantidade += valor;

    if (quantidade < 1) {
        quantidade = 1;
    }

    document.getElementById("quantidade-produto").textContent = quantidade;
}

// ADICIONAR UM PRODUTO AO CARRINHO
function adicionarCarrinho(nome, preco, qtd, cor, tamanho) {
    let produto = {
        nome: nome,
        preco: preco,
        quantidade: qtd || 1,
        cor: cor || "",
        tamanho: tamanho || ""
    };

    carrinho.push(produto);

    atualizarCarrinho();

    document.getElementById("mensagem").textContent =
        nome + " foi adicionado ao carrinho!";

    alert(nome + " foi adicionado ao carrinho!");
}

// ADICIONAR O VESTIDO
function adicionarVestido() {
    adicionarCarrinho(
        "Vestido Midi Lunna",
        129.90,
        quantidade,
        corSelecionada,
        tamanhoSelecionado
    );
}

// ATUALIZAR O NÚMERO DO CARRINHO
function atualizarCarrinho() {
    let total = 0;

    carrinho.forEach(function (produto) {
        total += produto.quantidade;
    });

    document.getElementById("quantidade-carrinho").textContent = total;
}

// MOSTRAR O CARRINHO
function mostrarCarrinho() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "SEU CARRINHO\n\n";
    let total = 0;

    carrinho.forEach(function (produto, indice) {
        let subtotal = produto.preco * produto.quantidade;

        mensagem += (indice + 1) + ". " + produto.nome + "\n";
        mensagem += "Quantidade: " + produto.quantidade + "\n";

        if (produto.cor) {
            mensagem += "Cor: " + produto.cor + "\n";
        }

        if (produto.tamanho) {
            mensagem += "Tamanho: " + produto.tamanho + "\n";
        }

        mensagem += "Subtotal: R$ " +
            subtotal.toFixed(2).replace(".", ",") + "\n\n";

        total += subtotal;
    });

    mensagem += "Total: R$ " + total.toFixed(2).replace(".", ",");

    alert(mensagem);
}

// COMPRAR AGORA
function comprarAgora() {
    adicionarVestido();
    mostrarCarrinho();
}

// FAVORITAR PRODUTOS
function favoritar(botao, nome) {
    if (favoritos.includes(nome)) {
        favoritos = favoritos.filter(function (produto) {
            return produto !== nome;
        });

        botao.textContent = "♡";
    } else {
        favoritos.push(nome);
        botao.textContent = "♥";
    }

    botao.style.color = "#D982A0";
}

// MOSTRAR OS FAVORITOS
function mostrarFavoritos() {
    if (favoritos.length === 0) {
        alert("Ainda não tens produtos favoritos.");
        return;
    }

    alert("TEUS FAVORITOS\n\n" + favoritos.join("\n"));
}

// CADASTRO DEMONSTRATIVO DA NEWSLETTER
function inscreverNewsletter() {
    let email = document.getElementById("email-newsletter").value.trim();

    if (email === "") {
        alert("Digite teu e-mail.");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Digite um e-mail válido.");
        return;
    }

    alert("Cadastro demonstrativo realizado!");
    document.getElementById("email-newsletter").value = "";
}

// ATIVAR OS FILTROS E A ORDENAÇÃO
document.querySelectorAll(".filtro-categoria").forEach(function (filtro) {
    filtro.addEventListener("change", aplicarFiltros);
});

document.getElementById("preco-baixo").addEventListener("change", aplicarFiltros);

document.getElementById("ordenar").addEventListener("change", ordenarProdutos);

// PESQUISAR AO PRESSIONAR ENTER
document.getElementById("pesquisa").addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        pesquisarProduto();
    }
});
