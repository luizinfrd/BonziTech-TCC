const urlParams = new URLSearchParams(window.location.search);
const tabelaSelecionada = urlParams.get("tabela");

mostrarTituloTabela(tabelaSelecionada);
mostrarTabelaDashboard(tabelaSelecionada);

const profileBtn = document.getElementById("profile");
const profileMenu = document.getElementById("profile-menu");
profileBtn.addEventListener("click", mostrarMenuPerfilUsuario);
document.addEventListener("click", (event) => {
    // Fecha o menu de perfil quando a página é clicada
    if (!profileMenu.contains(event.target) && event.target !== profileBtn)
        profileMenu.style.display = "none";
});


/**
 * Muda h1 (título) da tabela de forma dinâmica.
 * @param {string} nomeTabela - Nome da tabela selecionada
 * pelo usuário.
 */
function mostrarTituloTabela(nomeTabela) {
    const titulosTabelas = new Map();

    titulosTabelas.set("clientes", "Clientes");
    titulosTabelas.set("componentes", "Componentes");
    titulosTabelas.set("entradas", "Entradas");
    titulosTabelas.set("estoque", "Estoque");
    titulosTabelas.set("fabricantes", "Fabricantes");
    titulosTabelas.set("funcionarios", "Funcionários");
    titulosTabelas.set("saidas", "Saídas");

    if (titulosTabelas.get(nomeTabela)) {
        const tituloTabelaH1 = document.getElementById("titulo-tabela");
        tituloTabelaH1.textContent = titulosTabelas.get(nomeTabela);
    }
}

/**
 * Verifica a partir dos parâmetros da URL qual tabela
 * da dashboard deve ser mostrada e a expõe ao usuário.
 * @param {string} nomeTabela - Nome da tabela selecionada
 * pelo usuário.
 */
function mostrarTabelaDashboard(nomeTabela) {
    let section;
    const script = document.createElement("script");

    if (nomeTabela) {
        section = document.getElementById(nomeTabela);
        script.src = `/JS/dashboard/${nomeTabela}.js`;
    } else {
        section = document.getElementById("visao-geral");
        script.src = "/JS/dashboard/visaoGeral.js";
    }

    section.style.display = "block";
    document.querySelector("head").appendChild(script);
}

/**
 * Mostra o menu (dropdown) ao clicar na imagem do
 * perfil do usuário na navbar.
 */
function mostrarMenuPerfilUsuario() {
    if (profileMenu.style.display === "block") {
        profileMenu.style.display = "none";
    } else {
        profileMenu.style.display = "block";
    }
}

/**
 * Mostra uma mensagem de erro ao usuário.
 * @param {string} erro - Erro a ser mostrado
 */
function mostrarMensagemErro(erro) {
    alert(erro);
}