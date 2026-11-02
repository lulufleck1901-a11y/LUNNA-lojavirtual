/* =========================================================
   LUNNA – JavaScript
   Organização:
   1. Dados (produtos, cores, cupons)
   2. Variáveis e funções de apoio
   3. Navegação entre telas
   4. Produtos (cards, filtros, pesquisa, detalhe)
   5. Favoritos
   6. Carrinho e checkout
   7. Formulários e notificações
   ========================================================= */


/* =========================================================
   1. DADOS
   Para trocar uma foto, mude o caminho em "imagem".
   ========================================================= */
const produtos = [
  {
    id: 1, nome: "Vestido Midi Lunna", categoria: "roupas", tipo: "Vestidos",
    preco: 129.90, precoAntigo: null, popularidade: 100, novidade: true,
    descricao: "Vestido midi de tecido leve, com modelagem confortável e alça fina. Perfeito para diversas ocasiões.",
    caracteristicas: "Tecido leve de viscose, forro interno, fecho de zíper nas costas e comprimento midi.",
    cores: ["Rosa", "Vinho", "Bege"], tamanhos: ["PP", "P", "M", "G", "GG"],
    imagem: "imagens/vestido-midi.jpg"
  },
  {
    id: 2, nome: "Blusa Cropped", categoria: "roupas", tipo: "Blusas",
    preco: 79.90, precoAntigo: null, popularidade: 90, novidade: true,
    descricao: "Blusa cropped básica de algodão, ideal para combinar com calças e saias.",
    caracteristicas: "100% algodão, gola redonda e manga curta.",
    cores: ["Branco", "Rosa"], tamanhos: ["PP", "P", "M", "G"],
    imagem: "imagens/blusa-cropped.jpg"
  },
  {
    id: 3, nome: "Calça Wide Leg", categoria: "roupas", tipo: "Calças",
    preco: 99.90, precoAntigo: null, popularidade: 70, novidade: false,
    descricao: "Calça de pernas largas com cintura alta e caimento fluido.",
    caracteristicas: "Cintura alta, bolsos laterais e tecido de alfaiataria leve.",
    cores: ["Bege", "Preto"], tamanhos: ["P", "M", "G", "GG"],
    imagem: "imagens/calca-wide-leg.jpg"
  },
  {
    id: 4, nome: "Jaqueta Jeans", categoria: "roupas", tipo: "Jaquetas",
    preco: 158.90, precoAntigo: null, popularidade: 60, novidade: false,
    descricao: "Jaqueta jeans clássica, com lavagem clara e bolsos frontais.",
    caracteristicas: "Jeans com elastano, botões metálicos e dois bolsos.",
    cores: ["Azul"], tamanhos: ["P", "M", "G"],
    imagem: "imagens/jaqueta-jeans.jpg"
  },
  {
    id: 5, nome: "Saia Plissada", categoria: "roupas", tipo: "Saias",
    preco: 89.90, precoAntigo: 109.90, popularidade: 80, novidade: false,
    descricao: "Saia plissada midi com cós elástico e movimento delicado.",
    caracteristicas: "Poliéster plissado, cós elástico e comprimento midi.",
    cores: ["Rosa", "Bege"], tamanhos: ["PP", "P", "M", "G"],
    imagem: "imagens/saia-plissada.jpg"
  },
  {
    id: 6, nome: "Macacão Preto", categoria: "roupas", tipo: "Macacões",
    preco: 139.90, precoAntigo: null, popularidade: 50, novidade: false,
    descricao: "Macacão pantalona preto, elegante e confortável para o dia a dia.",
    caracteristicas: "Alças ajustáveis, cintura marcada e tecido de crepe.",
    cores: ["Preto"], tamanhos: ["P", "M", "G"],
    imagem: "imagens/macacao.jpg"
  },
  {
    id: 7, nome: "Sandália Salto Bloco", categoria: "calcados", tipo: "Sandálias",
    preco: 119.90, precoAntigo: null, popularidade: 65, novidade: true,
    descricao: "Sandália com salto bloco baixo, muito confortável para usar o dia todo.",
    caracteristicas: "Salto de 5 cm, tira ajustável no tornozelo e solado antiderrapante.",
    cores: ["Rosa", "Bege"], tamanhos: ["36", "37", "38", "39"],
    imagem: "imagens/sandalia.jpg"
  },
  {
    id: 8, nome: "Tênis Casual Branco", categoria: "calcados", tipo: "Tênis",
    preco: 189.90, precoAntigo: 229.90, popularidade: 75, novidade: false,
    descricao: "Tênis branco casual, combina com qualquer look.",
    caracteristicas: "Cabedal sintético, palmilha macia e solado de borracha.",
    cores: ["Branco"], tamanhos: ["36", "37", "38", "39"],
    imagem: "imagens/tenis.jpg"
  },
  {
    id: 9, nome: "Bolsa Tracada", categoria: "acessorios", tipo: "Bolsas",
    preco: 99.90, precoAntigo: null, popularidade: 85, novidade: true,
    descricao: "Bolsa estruturada com alça de mão e alça transversal removível.",
    caracteristicas: "Material sintético, fecho com zíper, 24 cm de largura.",
    cores: ["Vinho", "Rosa"], tamanhos: ["Único"],
    imagem: "imagens/bolsa-tracada.jpg"
  },
  {
    id: 10, nome: "Brinco Lua", categoria: "acessorios", tipo: "Joias",
    preco: 39.90, precoAntigo: null, popularidade: 55, novidade: false,
    descricao: "Brinco delicado em formato de lua, inspirado na identidade da LUNNA.",
    caracteristicas: "Banhado a ouro, hipoalergênico e fecho tipo tarraxa.",
    cores: ["Rosa"], tamanhos: ["Único"],
    imagem: "imagens/brinco-lua.jpg"
  },
  {
    id: 11, nome: "Gloss Labial", categoria: "beleza", tipo: "Maquiagem",
    preco: 49.90, precoAntigo: null, popularidade: 95, novidade: true,
    descricao: "Gloss com brilho intenso e toque hidratante, não é pegajoso.",
    caracteristicas: "Contém 6 ml, fórmula vegana e fragrância suave.",
    cores: ["Rosa"], tamanhos: ["Único"],
    imagem: "imagens/gloss-labial.jpg"
  },
  {
    id: 12, nome: "Hidratante Facial", categoria: "beleza", tipo: "Skincare",
    preco: 69.90, precoAntigo: 84.90, popularidade: 45, novidade: false,
    descricao: "Hidratante facial leve, de absorção rápida, para o uso diário.",
    caracteristicas: "Contém 50 g, com ácido hialurônico e fator de proteção 15.",
    cores: ["Branco"], tamanhos: ["Único"],
    imagem: "imagens/hidratante.jpg"
  }
];

// Cor de cada nome (usada nas bolinhas de cor)
const coresHex = {
  Rosa: "#D982A0", Vinho: "#8E4A63", Bege: "#D8BFA8",
  Preto: "#2B2B2B", Branco: "#FFFFFF", Azul: "#7FA3B8"
};

const nomesCategorias = {
  roupas: "Roupas", calcados: "Calçados", acessorios: "Acessórios", beleza: "Beleza"
};

// Cupons: código e percentual de desconto
const cupons = { LUNNA10: 0.10, BEMVINDA: 0.05 };


/* =========================================================
   2. VARIÁVEIS E FUNÇÕES DE APOIO
   ========================================================= */
let carrinho = lerLocal("lunnaCarrinho");
let favoritos = lerLocal("lunnaFavoritos");
let cupomAtivo = "";

let categoriaAtual = "";
let textoBusca = "";
let somenteOfertas = false;

let produtoAtual = null;
let corEscolhida = "";
let tamanhoEscolhido = "";
let quantidadeEscolhida = 1;

// Lê uma lista salva no localStorage (se der erro, volta lista vazia)
function lerLocal(chave) {
  try {
    return JSON.parse(localStorage.getItem(chave)) || [];
  } catch (erro) {
    return [];
  }
}

function salvarLocal() {
  localStorage.setItem("lunnaCarrinho", JSON.stringify(carrinho));
  localStorage.setItem("lunnaFavoritos", JSON.stringify(favoritos));
}

function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

function buscarProduto(id) {
  return produtos.find(function (p) { return p.id === id; });
}

// Tira acentos para a pesquisa achar "calca" e "calça"
function semAcento(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function atualizarContadores() {
  let totalItens = 0;
  carrinho.forEach(function (item) { totalItens += item.qtd; });
  document.getElementById("contador-carrinho").textContent = totalItens;
  document.getElementById("contador-favoritos").textContent = favoritos.length;
}


/* =========================================================
   3. NAVEGAÇÃO ENTRE TELAS
   ========================================================= */
function mostrarTela(nome) {
  document.querySelectorAll(".tela").forEach(function (tela) {
    tela.classList.remove("ativa");
  });
  document.getElementById("tela-" + nome).classList.add("ativa");

  // Cada tela é montada na hora em que é aberta
  if (nome === "inicio") montarInicio();
  if (nome === "carrinho") mostrarCarrinho();
  if (nome === "checkout") montarCheckout();
  if (nome === "favoritos") mostrarFavoritos();

  fecharMenus();
  window.scrollTo(0, 0);
}

function alternarMenu() {
  document.getElementById("menu").classList.toggle("aberto");
}

function alternarSubmenu() {
  document.getElementById("submenu").classList.toggle("aberto");
}

function fecharMenus() {
  document.getElementById("menu").classList.remove("aberto");
  document.getElementById("submenu").classList.remove("aberto");
}

function alternarFiltros() {
  document.getElementById("filtros").classList.toggle("aberto");
}

function montarInicio() {
  const novidades = produtos.filter(function (p) { return p.novidade; }).slice(0, 8);
  const ofertas = produtos.filter(function (p) { return p.precoAntigo; }).slice(0, 4);
  document.getElementById("lista-novidades").innerHTML = novidades.map(criarCard).join("");
  document.getElementById("lista-ofertas").innerHTML = ofertas.map(criarCard).join("");
}


/* =========================================================
   4. PRODUTOS
   ========================================================= */

// Monta o HTML de um card de produto
function criarCard(p) {
  let precoHtml = formatarPreco(p.preco);
  if (p.precoAntigo) {
    precoHtml += '<span class="preco-antigo">' + formatarPreco(p.precoAntigo) + "</span>";
  }
  return '<article class="card">' +
    '<button class="btn-fav" data-fav="' + p.id + '" onclick="alternarFavorito(' + p.id + ')" aria-label="Favoritar">♡</button>' +
    '<div class="card-img" onclick="abrirProduto(' + p.id + ')">' +
      '<img src="' + p.imagem + '" alt="' + p.nome + '" onerror="this.style.visibility=\'hidden\'">' +
    "</div>" +
    '<h3 onclick="abrirProduto(' + p.id + ')">' + p.nome + "</h3>" +
    '<p class="preco">' + precoHtml + "</p>" +
    '<button class="btn-pequeno" onclick="adicionarRapido(' + p.id + ')">Adicionar ao carrinho</button>' +
    "</article>";
}

// ---------- Categorias, ofertas e pesquisa ----------
function verCategoria(categoria) {
  categoriaAtual = categoria;
  textoBusca = "";
  somenteOfertas = false;
  document.getElementById("campo-busca").value = "";
  limparFiltros();
  mostrarTela("produtos");
  listarProdutos();
}

function verOfertas() {
  categoriaAtual = "";
  textoBusca = "";
  somenteOfertas = true;
  document.getElementById("campo-busca").value = "";
  limparFiltros();
  mostrarTela("produtos");
  listarProdutos();
}

function pesquisar(evento) {
  evento.preventDefault();
  categoriaAtual = "";
  somenteOfertas = false;
  textoBusca = document.getElementById("campo-busca").value.trim();
  limparFiltros();
  mostrarTela("produtos");
  listarProdutos();
}

// ---------- Filtros ----------
function valoresMarcados(nome) {
  const marcados = document.querySelectorAll('input[name="' + nome + '"]:checked');
  return Array.from(marcados).map(function (campo) { return campo.value; });
}

function limparFiltros() {
  document.querySelectorAll("#filtros input").forEach(function (campo) {
    campo.checked = false;
  });
  document.getElementById("ordenar").value = "popular";
}

// Retorna true se o produto deve aparecer na lista
function passaNosFiltros(p) {
  if (categoriaAtual && p.categoria !== categoriaAtual) return false;
  if (somenteOfertas && !p.precoAntigo) return false;

  if (textoBusca) {
    const texto = p.nome + " " + p.descricao + " " + p.tipo + " " + nomesCategorias[p.categoria];
    if (!semAcento(texto.toLowerCase()).includes(semAcento(textoBusca.toLowerCase()))) return false;
  }

  const tamanhos = valoresMarcados("tamanho");
  if (tamanhos.length > 0 && !p.tamanhos.some(function (t) { return tamanhos.includes(t); })) return false;

  const cores = valoresMarcados("cor");
  if (cores.length > 0 && !p.cores.some(function (c) { return cores.includes(c); })) return false;

  const tipos = valoresMarcados("tipo");
  if (tipos.length > 0 && !tipos.includes(p.tipo)) return false;

  const faixas = valoresMarcados("preco");
  if (faixas.length > 0) {
    let dentro = false;
    faixas.forEach(function (faixa) {
      const limites = faixa.split("-");
      if (p.preco >= Number(limites[0]) && p.preco <= Number(limites[1])) dentro = true;
    });
    if (!dentro) return false;
  }

  return true;
}

// ---------- Lista de produtos ----------
function listarProdutos() {
  const lista = produtos.filter(passaNosFiltros);

  // Ordenação
  const ordem = document.getElementById("ordenar").value;
  if (ordem === "popular") lista.sort(function (a, b) { return b.popularidade - a.popularidade; });
  if (ordem === "menor") lista.sort(function (a, b) { return a.preco - b.preco; });
  if (ordem === "maior") lista.sort(function (a, b) { return b.preco - a.preco; });
  if (ordem === "nome") lista.sort(function (a, b) { return a.nome.localeCompare(b.nome); });

  // Título da página
  let titulo = "Todos os produtos";
  if (textoBusca) titulo = 'Resultados para "' + textoBusca + '"';
  else if (somenteOfertas) titulo = "Ofertas";
  else if (categoriaAtual) titulo = nomesCategorias[categoriaAtual];

  document.getElementById("titulo-produtos").textContent = titulo;
  document.getElementById("contagem-produtos").textContent = lista.length + " produtos encontrados";

  const caixa = document.getElementById("lista-produtos");
  if (lista.length === 0) {
    caixa.innerHTML = '<p class="vazio">Nenhum produto encontrado. Tente mudar os filtros ou a pesquisa.</p>';
  } else {
    caixa.innerHTML = lista.map(criarCard).join("");
  }
  atualizarCoracoes();
}

// ---------- Página de um produto ----------
function abrirProduto(id) {
  produtoAtual = buscarProduto(id);
  corEscolhida = produtoAtual.cores[0];
  tamanhoEscolhido = produtoAtual.tamanhos[0];
  quantidadeEscolhida = 1;
  montarProduto();
  mostrarTela("produto");
}

function montarProduto() {
  const p = produtoAtual;

  let precoHtml = formatarPreco(p.preco);
  if (p.precoAntigo) {
    precoHtml += '<span class="preco-antigo">' + formatarPreco(p.precoAntigo) + "</span>";
  }

  let botoesCor = "";
  p.cores.forEach(function (cor) {
    const ativa = cor === corEscolhida ? " ativa" : "";
    botoesCor += '<button class="opcao-cor' + ativa + '" style="background:' + coresHex[cor] + '" title="' + cor + '" aria-label="' + cor + '" onclick="escolherCor(\'' + cor + '\')"></button>';
  });

  let botoesTamanho = "";
  p.tamanhos.forEach(function (tam) {
    const ativa = tam === tamanhoEscolhido ? " ativa" : "";
    botoesTamanho += '<button class="opcao-tamanho' + ativa + '" onclick="escolherTamanho(\'' + tam + '\')">' + tam + "</button>";
  });

  document.getElementById("conteudo-produto").innerHTML =
    '<p class="migalhas">' +
      '<button onclick="mostrarTela(\'inicio\')">Início</button> / ' +
      '<button onclick="verCategoria(\'' + p.categoria + '\')">' + nomesCategorias[p.categoria] + "</button> / " + p.nome +
    "</p>" +
    '<div class="detalhe">' +
      '<div class="detalhe-img"><img src="' + p.imagem + '" alt="' + p.nome + '" onerror="this.style.visibility=\'hidden\'"></div>' +
      '<div class="detalhe-info">' +
        "<h1>" + p.nome + "</h1>" +
        '<p class="estrelas">★★★★☆ (128 avaliações)</p>' +
        '<p class="detalhe-preco">' + precoHtml + "</p>" +
        "<p>" + p.descricao + "</p>" +
        '<div><p class="opcoes-titulo">Cor: ' + corEscolhida + '</p><div class="opcoes">' + botoesCor + "</div></div>" +
        '<div><p class="opcoes-titulo">Tamanho: ' + tamanhoEscolhido + '</p><div class="opcoes">' + botoesTamanho + "</div></div>" +
        '<div><p class="opcoes-titulo">Quantidade</p>' +
          '<div class="quantidade">' +
            '<button onclick="mudarQuantidadeProduto(-1)" aria-label="Diminuir">−</button>' +
            "<span>" + quantidadeEscolhida + "</span>" +
            '<button onclick="mudarQuantidadeProduto(1)" aria-label="Aumentar">+</button>' +
          "</div></div>" +
        '<button class="btn-principal" onclick="adicionarDaPagina()">Adicionar ao carrinho</button>' +
        '<button class="btn-contorno" onclick="comprarAgora()">Comprar agora</button>' +
        '<button class="btn-contorno" data-fav="' + p.id + '" onclick="alternarFavorito(' + p.id + ')">♡ Favoritar</button>' +
      "</div>" +
    "</div>" +
    '<div class="beneficios">' +
      "<div><strong>Frete grátis</strong>acima de R$ 199</div>" +
      "<div><strong>Troca fácil</strong>em até 30 dias</div>" +
      "<div><strong>Compra segura</strong>100% protegida</div>" +
    "</div>" +
    '<div class="acordeao">' +
      "<details open><summary>Descrição</summary><p>" + p.descricao + "</p></details>" +
      "<details><summary>Características</summary><p>" + p.caracteristicas + "</p></details>" +
      "<details><summary>Avaliações (128)</summary><p>★★★★★ “Amei a peça, chegou rápido e é igual às fotos!”</p></details>" +
    "</div>";

  atualizarCoracoes();
}

function escolherCor(cor) { corEscolhida = cor; montarProduto(); }
function escolherTamanho(tam) { tamanhoEscolhido = tam; montarProduto(); }

function mudarQuantidadeProduto(valor) {
  quantidadeEscolhida += valor;
  if (quantidadeEscolhida < 1) quantidadeEscolhida = 1;
  montarProduto();
}


/* =========================================================
   5. FAVORITOS
   ========================================================= */
function alternarFavorito(id) {
  const posicao = favoritos.indexOf(id);
  if (posicao === -1) {
    favoritos.push(id);
    mostrarAviso("Adicionado aos favoritos!");
  } else {
    favoritos.splice(posicao, 1);
    mostrarAviso("Removido dos favoritos.");
  }
  salvarLocal();
  atualizarContadores();
  atualizarCoracoes();
  // Se estiver na tela de favoritos, atualiza a lista
  if (document.getElementById("tela-favoritos").classList.contains("ativa")) mostrarFavoritos();
}

// Deixa o coração cheio (♥) nos favoritados e vazio (♡) nos demais
function atualizarCoracoes() {
  document.querySelectorAll("[data-fav]").forEach(function (botao) {
    const id = Number(botao.getAttribute("data-fav"));
    const favorito = favoritos.includes(id);
    const simbolo = favorito ? "♥" : "♡";
    if (botao.classList.contains("btn-fav")) {
      botao.textContent = simbolo;
    } else {
      botao.textContent = simbolo + (favorito ? " Favoritado" : " Favoritar");
    }
  });
}

function mostrarFavoritos() {
  const caixa = document.getElementById("lista-favoritos");
  if (favoritos.length === 0) {
    caixa.innerHTML = '<p class="vazio">Você ainda não tem favoritos. Toque no ♡ dos produtos para salvar aqui.</p>';
    return;
  }
  caixa.innerHTML = favoritos.map(function (id) { return criarCard(buscarProduto(id)); }).join("");
  atualizarCoracoes();
}


/* =========================================================
   6. CARRINHO E CHECKOUT
   ========================================================= */
function adicionarItem(id, cor, tamanho, quantidade) {
  // Se já existe o mesmo produto, com a mesma cor e tamanho, só soma a quantidade
  const existente = carrinho.find(function (item) {
    return item.id === id && item.cor === cor && item.tamanho === tamanho;
  });
  if (existente) {
    existente.qtd += quantidade;
  } else {
    carrinho.push({ id: id, cor: cor, tamanho: tamanho, qtd: quantidade });
  }
  salvarLocal();
  atualizarContadores();
}

// Botão do card: usa a primeira cor e o primeiro tamanho
function adicionarRapido(id) {
  const p = buscarProduto(id);
  adicionarItem(id, p.cores[0], p.tamanhos[0], 1);
  mostrarAviso(p.nome + " foi adicionado ao carrinho!");
}

function adicionarDaPagina() {
  adicionarItem(produtoAtual.id, corEscolhida, tamanhoEscolhido, quantidadeEscolhida);
  mostrarAviso(produtoAtual.nome + " foi adicionado ao carrinho!");
}

function comprarAgora() {
  adicionarItem(produtoAtual.id, corEscolhida, tamanhoEscolhido, quantidadeEscolhida);
  mostrarTela("checkout");
}

function alterarQuantidade(posicao, valor) {
  carrinho[posicao].qtd += valor;
  if (carrinho[posicao].qtd < 1) carrinho[posicao].qtd = 1;
  salvarLocal();
  atualizarContadores();
  mostrarCarrinho();
}

function removerItem(posicao) {
  carrinho.splice(posicao, 1);
  salvarLocal();
  atualizarContadores();
  mostrarCarrinho();
  mostrarAviso("Produto removido do carrinho.");
}

// Calcula subtotal, desconto, frete e total
function calcularTotais() {
  let subtotal = 0;
  carrinho.forEach(function (item) {
    subtotal += buscarProduto(item.id).preco * item.qtd;
  });
  const percentual = cupons[cupomAtivo] || 0;
  const desconto = subtotal * percentual;
  let frete = 15.90;
  if (subtotal === 0 || subtotal - desconto >= 199) frete = 0;
  return { subtotal: subtotal, desconto: desconto, frete: frete, total: subtotal - desconto + frete };
}

// Linhas de valores usadas no carrinho e no checkout
function criarLinhasResumo() {
  const t = calcularTotais();
  let html = '<div class="linha-resumo"><span>Subtotal</span><span>' + formatarPreco(t.subtotal) + "</span></div>";
  if (t.desconto > 0) {
    html += '<div class="linha-resumo"><span>Desconto (' + cupomAtivo + ')</span><span>− ' + formatarPreco(t.desconto) + "</span></div>";
  }
  html += '<div class="linha-resumo"><span>Frete</span><span>' + (t.frete === 0 ? "Grátis" : formatarPreco(t.frete)) + "</span></div>";
  html += '<div class="linha-resumo linha-total"><span>Total</span><span>' + formatarPreco(t.total) + "</span></div>";
  return html;
}

function mostrarCarrinho() {
  const caixa = document.getElementById("itens-carrinho");
  const resumo = document.getElementById("resumo-carrinho");

  if (carrinho.length === 0) {
    caixa.innerHTML = '<p class="vazio">Seu carrinho está vazio.</p>';
    resumo.innerHTML = '<button class="btn-principal" onclick="verCategoria(\'\')">Ver produtos</button>';
    return;
  }

  let html = "";
  carrinho.forEach(function (item, posicao) {
    const p = buscarProduto(item.id);
    html += '<div class="item-carrinho">' +
      '<div class="item-img"><img src="' + p.imagem + '" alt="' + p.nome + '" onerror="this.style.visibility=\'hidden\'"></div>' +
      '<div class="item-info"><h3>' + p.nome + "</h3>" +
        "<p>Cor: " + item.cor + " | Tamanho: " + item.tamanho + "</p>" +
        '<div class="quantidade">' +
          '<button onclick="alterarQuantidade(' + posicao + ', -1)" aria-label="Diminuir">−</button>' +
          "<span>" + item.qtd + "</span>" +
          '<button onclick="alterarQuantidade(' + posicao + ', 1)" aria-label="Aumentar">+</button>' +
        "</div></div>" +
      '<div class="item-direita"><p class="preco">' + formatarPreco(p.preco * item.qtd) + "</p>" +
        '<button class="btn-remover" onclick="removerItem(' + posicao + ')">Remover</button></div>' +
      "</div>";
  });
  caixa.innerHTML = html;

  resumo.innerHTML = "<h3>Resumo do pedido</h3>" + criarLinhasResumo() +
    '<div class="cupom"><input type="text" id="campo-cupom" placeholder="Cupom de desconto" aria-label="Cupom de desconto">' +
    '<button onclick="aplicarCupom()">Aplicar</button></div>' +
    '<button class="btn-principal" onclick="mostrarTela(\'checkout\')">Finalizar compra</button>';
}

function aplicarCupom() {
  const codigo = document.getElementById("campo-cupom").value.trim().toUpperCase();
  if (cupons[codigo]) {
    cupomAtivo = codigo;
    mostrarCarrinho();
    mostrarAviso("Cupom " + codigo + " aplicado!");
  } else {
    mostrarAviso("Cupom inválido. Veja os cupons disponíveis na página Cupons.", "erro");
  }
}

function montarCheckout() {
  let html = "<h3>Seu pedido</h3>";
  if (carrinho.length === 0) {
    html += "<p>Seu carrinho está vazio.</p>";
  }
  carrinho.forEach(function (item) {
    const p = buscarProduto(item.id);
    html += '<div class="linha-resumo"><span>' + item.qtd + "x " + p.nome + " (" + item.cor + ", " + item.tamanho + ")</span><span>" + formatarPreco(p.preco * item.qtd) + "</span></div>";
  });
  html += criarLinhasResumo();
  document.getElementById("resumo-checkout").innerHTML = html;
}

function finalizarPedido(evento) {
  evento.preventDefault();
  if (carrinho.length === 0) {
    mostrarAviso("Seu carrinho está vazio. Adicione produtos antes de finalizar.", "erro");
    return;
  }
  const nome = document.getElementById("ck-nome").value;
  const numero = Math.floor(Math.random() * 90000) + 10000;
  document.getElementById("texto-confirmacao").textContent =
    "Obrigada, " + nome + "! Seu pedido nº " + numero + " foi registrado (demonstração).";

  // Esvazia o carrinho
  carrinho = [];
  cupomAtivo = "";
  salvarLocal();
  atualizarContadores();
  evento.target.reset();
  mostrarTela("confirmacao");
}


/* =========================================================
   7. FORMULÁRIOS E NOTIFICAÇÕES
   ========================================================= */

// Mostra uma notificação dentro do site (no lugar do alert)
function mostrarAviso(mensagem, tipo) {
  const aviso = document.createElement("div");
  aviso.className = "aviso" + (tipo === "erro" ? " erro" : "");
  aviso.textContent = mensagem;
  document.getElementById("avisos").appendChild(aviso);
  setTimeout(function () { aviso.remove(); }, 3000);
}

function entrar(evento) {
  evento.preventDefault();
  mostrarAviso("Login demonstrativo realizado com sucesso!");
  evento.target.reset();
  mostrarTela("inicio");
}

function cadastrar(evento) {
  evento.preventDefault();
  const senha = document.getElementById("cad-senha").value;
  const senha2 = document.getElementById("cad-senha2").value;
  if (senha !== senha2) {
    mostrarAviso("As senhas não são iguais.", "erro");
    return;
  }
  mostrarAviso("Cadastro demonstrativo concluído!");
  evento.target.reset();
  mostrarTela("login");
}

function enviarContato(evento) {
  evento.preventDefault();
  mostrarAviso("Mensagem enviada! Obrigada pelo contato.");
  evento.target.reset();
}

function assinarNewsletter(evento) {
  evento.preventDefault();
  mostrarAviso("Pronto! Você vai receber as novidades da LUNNA.");
  evento.target.reset();
}


/* =========================================================
   INÍCIO DO SITE
   ========================================================= */
atualizarContadores();
montarInicio();
atualizarCoracoes();
