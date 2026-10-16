
let carrinho = [];

function adicionarCarrinho(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    document.getElementById("quantidade-carrinho").textContent =
        carrinho.length;

    document.getElementById("mensagem").textContent =
        nome + " foi adicionado ao carrinho!";
}

function mostrarCarrinho() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let total = 0;
    let lista = "Produtos no carrinho:\n\n";

    for (let i = 0; i < carrinho.length; i++) {
        lista += carrinho[i].nome + " - R$ " +
            carrinho[i].preco.toFixed(2).replace(".", ",") + "\n";

        total += carrinho[i].preco;
    }

    lista += "\nTotal: R$ " +
        total.toFixed(2).replace(".", ",");

    alert(lista);
}

document.getElementById("pesquisa").addEventListener("input", function() {
    let texto = this.value.toLowerCase();
    let produtos = document.querySelectorAll(".produto");

    for (let i = 0; i < produtos.length; i++) {
        let nome = produtos[i].querySelector("h3").textContent.toLowerCase();
        let categoria = produtos[i].querySelector(".categoria").textContent.toLowerCase();

        if (nome.includes(texto) || categoria.includes(texto)) {
            produtos[i].style.display = "block";
        } else {
            produtos[i].style.display = "none";
        }
    }
});

function favoritar(botao) {
    if (botao.textContent === "♡") {
        botao.textContent = "♥";
        botao.style.color = "#D982A0";
    } else {
        botao.textContent = "♡";
        botao.style.color = "#D982A0";
    }
}
