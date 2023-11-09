let dadosOrdemServico;
fetchOrdemServico()
.then((res) => {
    dadosOrdemServico = res;
    mostrarTabelaOrdemServico(dadosOrdemServico.ordemServico);
}); 

const addOrdemServicoFormBtn = document.getElementById("add-table-row-ordem-servico");
const cancelarCriacaoOrdemServicoBtn = document.getElementById("cancel-btn-ordem-servico");
addOrdemServicoFormBtn.addEventListener("click", mostrarFormCriacaoOrdemServico);
cancelarCriacaoOrdemServicoBtn.addEventListener("click", mostrarFormCriacaoOrdemServico);

const cancelarEdicaoOrdemServicoBtn = document.getElementById("cancel-btn-edit-ordem-servico");
cancelarEdicaoOrdemServicoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarFormEdicaoOrdemServico(null);
});

const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("keyup", () => {
    const serv = procurarItemOrdemServico(searchBar.value.trim(), dadosOrdemServico.ordemServico);
    mostrarTabelaEstoque(serv);
});

const confirmarCriacaoOrdemServicoBtn = document.getElementById("confirm-btn-ordem-servico");
confirmarCriacaoOrdemServicoBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const dataEmissaoTextbox = document.getElementById("add-data-emissao-ordem-servico");
    const codCliTextbox = document.getElementById("add-codigo-cliente-ordem-servico");
    const pedidoTextbox = document.getElementById("add-pedido-ordem-servico");
    const concluidaTextbox = document.getElementById("add-concluida-ordem-servico");

    await criarOrdemServico(
        Number(dataEmissaoTextbox.value.trim()),
        Number(codCliTextbox.value.trim()),
        String(pedidoTextbox.value.trim()),
        Boolean(concluidaTextbox.value.trim())
    );

    window.location.reload();
});

const confirmarAtualizacaoOrdemServicoBtn = document.getElementById("update-btn-ordem-servico");
confirmarAtualizacaoOrdemServicoBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const dataEmissaoTextbox = document.getElementById("edit-data-emissao-ordem-servico");
    const codCliTextbox = document.getElementById("edit-codigo-cliente-ordem-servico");
    const pedidoTextbox = document.getElementById("edit-pedido-ordem-servico");
    const concluidaTextbox = document.getElementById("edit-concluida-ordem-servico");

    await atualizarOrdemServico(
        Number(dataEmissaoTextbox.value.trim()),
        Number(codCliTextbox.value.trim()),
        String(pedidoTextbox.value.trim()),
        Boolean(concluidaTextbox.value.trim())
    );

    window.location.reload();
});

/**
 * Mostra tabela de ordem de serviços com seus devidos dados.
 * @param {Array} dadosTabela - Lista de serviços a serem mostrados.
 */
async function mostrarTabelaOrdemServico(dadosTabela) {
    const tbody = document.getElementById("tbody-ordem-servico");
    tbody.innerHTML = "";

    if (dadosTabela.length === 0) {
        tbody.innerHTML = `
            <h2 class="texto-404"> Nenhuma ordem de serviço encontrada. </h2>`;
    }

    for (const serv of dadosTabela) {
        const coluna = document.createElement("tr");
        coluna.innerHTML = `
        <td> ${serv.dataEmissao} </td>
        <td> ${serv.codCli} </td>
        <td> ${serv.pedido} </td>
        <td> ${serv.concluida} </td>
        `;

        const acoesCell = document.createElement("td");

        // Botão de inativação 
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("delete-btn");
        btnDelete.addEventListener("click", () => {
            if(confirmarExclusaoOrdemServico())
                excluirOrdemServico(serv.codOS);
        });
        btnDelete.innerHTML = '<i class="fa-solid fa-ban"> </i>';

        // Botão de edição 
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("update-btn-icon");
        btnEdit.addEventListener("click", (event) => {
            event.preventDefault();
            mostrarFormEdicaoOrdemServico(serv);
        });
        btnEdit.innerHTML = '<i class="fa-solid fa-pen-to-square"> </i>';

        acoesCell.appendChild(btnDelete);
        acoesCell.appendChild(btnEdit);

        coluna.appendChild(acoesCell);

        tbody.appendChild(coluna);
    }
}


/**
 * Pega todos os item cadastrados na ordem de serviços pela API e
 * os insere na tabela.
 * @returns {object} - Resposta da API ou Objeto de erro.
 * @throws Retorna erro em caso de falha de conexão com a 
 * API ou servidor.
 */
async function fetchOrdemServico() {
    return await fetch("/ordem-servico")
    .then((res) => res.json())
    .then((res) => {
        if (res == null) 
            return null

        if (res.error) {
            mostrarMensagemErro(res.error);
            return new Error(res.error);
        }

        return res;
    })
    .catch((err) => {
        mostrarMensagemErro("Erro ao conectar com o servidor. Tente novamente mais tarde.");
        return new Error(err);
    });
}

/**
 * Envia dados de item da ordem de serviço para criação à API.
 * @param {Number} dataEmissao - Data de emissão.
 * @param {Number} codCli - Código de cliente.
 * @param {String} pedido- Pedido.
 * @param {Boolean} concluida - Conclusão.
 * @returns {object} - Mensagem de erro ou sucesso.
 * @throws Retorna erro em caso de falha de conexão com a API ou servidor.
 */
async function criarOrdemServico(dataEmissao, codCli, pedido, concluida) {
    return await fetch(`/ordem-servico`, {
        method: "POST",
        headers: {
            "Content-type": "Application/JSON"
        },
        body: JSON.stringify({
            dataEmissao,
            codCli,
            pedido,
            concluida
        })
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.error) {
            mostrarMensagemErro(res.error);
            return new Error(res.error);
        }

        return res;
    })
    .catch((err) => {
        mostrarMensagemErro("Erro ao conectar com o servidor. Tente novamente mais tarde.");
        return new Error(err);
    });
}

/**
 * Envia dados de item da ordem de serviço para criação à API.
 * @param {Number} codOS - Código da ordem de serviço
 * @param {Number} dataEmissao - Data de emissão.
 * @param {Number} codCli - Código de cliente.
 * @param {String} pedido- Pedido.
 * @param {Boolean} concluida - Conclusão.
 * @returns {object} - Mensagem de erro ou sucesso.
 * @throws Retorna erro em caso de falha de conexão com a API ou servidor.
 */
async function atualizarOrdemServico(codOS, dataEmissao, codCli, pedido, concluida) {
    return await fetch(`/ordem-servico`, {
        method: "PUT",
        headers: {
            "Content-type": "Application/JSON"
        },
        body: JSON.stringify({
            codOS,
            dataEmissao,
            codCli,
            pedido,
            concluida
        })
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.error) {
            mostrarMensagemErro(res.error);
            return new Error(res.error);
        }

        return res;
    })
    .catch((err) => {
        mostrarMensagemErro("Erro ao conectar com o servidor. Tente novamente mais tarde.");
        return new Error(err);
    });
}

/**
 * Remove item da ordem de serviço e mostra resposta.
 * @param {string} codOS - Código a ser 
 * removido da ordem de serviço.
 * @throws Retorna erro em caso de falha de conexão com a 
 * API ou servidor.
 */
async function excluirOrdemServico(codOS) {
    const res = await fetch(`/ordem-servico/${codOS}`, {
        method: "DELETE"
    });

    if (res.error) {
        mostrarMensagemErro(res.error);
        return new Error(res.error);
    }

    window.location.reload();
}

/**
 * Confirma se o usuário realmente deseja excluir a ordem de serviço.
 * @returns {boolean} - Retorna confirmação do usuário.
 */
function confirmarExclusaoOrdemServico() {
    return confirm(
        "Você tem certeza que deseja excluir este item da ordem de serviço? Esta função é " +
        "irreversível."
    );
}

/**
 * Mostra forms para cadastro de ordens de serviço.
 */
function mostrarFormCriacaoOrdemServico() {
    const addOrdemServicoForm = document.getElementById("add-form-ordem-servico");
    
    if (addOrdemServicoForm.style.display !== "block") {
        addOrdemServicoForm.style.display = "block";
    } else {
        addOrdemServicoForm.style.display = "none";
    }
}

/**
 * Mostra o forms para edição de dados da ordem de serviço.
 * @param {object} serv - Dados da ordem de serviço a ser alterado.
 */
function mostrarFormEdicaoOrdemServico(serv) {
    const editOrdemServicoForm = document.getElementById("edit-form-ordem-servico");
    
    if (editOrdemServicoForm.style.display !== "block") {
        editOrdemServicoForm.style.display = "block";

        const dataEmissaoTextbox = document.getElementById("edit-data-emissao-ordem-servico");
        const codCliTextbox = document.getElementById("edit-codigo-cliente-ordem-servico");
        const pedidoTextbox = document.getElementById("edit-pedido-ordem-servico");
        const concluidaTextbox = document.getElementById("edit-concluida-ordem-servico");

        dataEmissaoTextbox.value = serv.dataEmissao
        codCliTextbox.value = serv.codCli;
        pedidoTextbox.value = serv.pedido;
        concluidaTextbox.value = serv.concluida;
    } else {
        editOrdemServicoForm.style.display = "none";
    }
}

/**
 * @param {number} codOS - Código para busca.
 * @param {Array} serv - Array com todos os itens da ordem de serviço.
 */
function procurarItemOrdemServico(codOS, serv) {
    if (!codOS)
        return serv;

    const ordemServico = [];
    for (const item of serv) {
        if (item.codOS== codOS) 
            ordemServico.push(item);
    }

    return ordemServico;
}
