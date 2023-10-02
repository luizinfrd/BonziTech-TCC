const profileBtn = document.getElementById("profile");
const profileMenu = document.getElementById("profile-menu");
const addBtn = document.getElementById("add-table-row");
const updateBtn = document.getElementById("update-btn");
const editForm = document.getElementById("edit-form");
const closeEditForm = document.getElementById("close-form");
const cancelIcon = document.getElementById("cancel-icon");
const editCancelBtn = document.getElementById("edit-cancel-btn");
const cancelEditIcon = document.getElementById("cancel-edit-icon");
const addForm = document.getElementById("add-form");
const cancelBtn = document.getElementById("cancel-btn");
const confirmBtn = document.getElementById("confirm-btn");
const tableBody = document.querySelector("tbody");
const permissoesInput = document.getElementById("add-permission");
const nomeInput = document.getElementById("add-name");
const emailInput = document.getElementById("add-email");
const senhaInput = document.getElementById("add-password");
const funcDeleteBtn = document.getElementById("func-delete-btn");
const funcRow = document.createElement("td");
const codUsers = [];

profileBtn.addEventListener("click", () => {
  if (profileMenu.style.display === "block") {
    profileMenu.style.display = "none";
  } else {
    profileMenu.style.display = "block";
  }
});

document.addEventListener("click", (event) => {
  if (!profileMenu.contains(event.target) && event.target !== profileBtn) {
    profileMenu.style.display = "none";
  }
});

function mostrarSection(idSection, botaoOpcao) {
  var sections = document.querySelectorAll(".hero");
  sections.forEach(function (section) {
    if (section.id === idSection) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });

  var tituloDiv = document.querySelector(".top h1");
  tituloDiv.textContent = botaoOpcao.textContent;
}

document.getElementById("visao-geral").style.display = "block";

var profile = document.getElementById("profile");
profile.style.display = "block";

const botoesOpcao = document.querySelectorAll(".opcao-nav");
botoesOpcao.forEach(function (botao) {
  botao.addEventListener("click", function () {
    mostrarSection(this.reqBodyset.section, this);
  });
});

addBtn.addEventListener("click", () => {
  addForm.style.display = "block";
});

cancelBtn.addEventListener("click", () => {
  addForm.style.display = "none";
});

editCancelBtn.addEventListener("click", () => {
  addForm.style.display = "none";
});

cancelIcon.addEventListener("click", () => {
  addForm.style.display = "none";
});

cancelEditIcon.addEventListener("click", () => {
  editForm.style.display = "none";
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const reqBody = {
    permissoes: permissoesInput.value.trim(),
    nome: nomeInput.value.trim(),
    email: emailInput.value.trim(),
    senha: senhaInput.value.trim(),
  };

  fetch("https://bonzitech-tcc.onrender.com/api/usuarios", {
    method: "POST",
    headers: {
      "Content-type": "application/JSON",
    },
    body: JSON.stringify(reqBody),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error != null) {
        alert(res.error);
        return;
      }

      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
});

fetch("https://bonzitech-tcc.onrender.com/api/usuarios")
  .then((response) => response.json())
  .then((reqBody) => {
    if (typeof reqBody === "object" && reqBody !== null) {
      for (const user of reqBody.usuarios) {
        codUsers[user.nome] = user.codUsuario;
        const tabela = document.getElementById("tabela");
        const tbody = tabela.getElementsByTagName("tbody")[0];

        const row = document.createElement("tr");

        const nomeCell = document.createElement("td");
        nomeCell.textContent = user.nome;
        row.appendChild(nomeCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const acoesCell = document.createElement("td");

        const btnDelete = document.createElement("button");
        btnDelete.classList.add("delete-btn");
        btnDelete.addEventListener("click", () => {
          fetchDelete(user);
        });
        btnDelete.innerHTML = '<i class="fa-solid fa-ban"></i>';

        const btnEdit = document.createElement("button");
        btnEdit.classList.add("update-btn-icon");
        btnEdit.addEventListener("click", (e) => {
          e.preventDefault();
          puxarFormUpdate(user);
        });
        btnEdit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

        acoesCell.appendChild(btnDelete);
        acoesCell.appendChild(btnEdit);
        row.appendChild(acoesCell);

        row.addEventListener("click", () => {
          console.log("linha clicada");
        });

        tbody.appendChild(row);
      }
    } else {
      console.error("Os dados não são um objeto:", reqBody);
      alert("Os dados não são um objeto:", reqBody);
    }
  })
  .catch((error) => {
    console.error("Ocorreu um erro:", error);
  });

function puxarFormUpdate(user) {
  editForm.style.display = "block";

  const addpermission = document.getElementById("edit-permission");
  const addnome = document.getElementById("edit-name");
  const addemail = document.getElementById("edit-email");

  addpermission.value = user.permissoes;
  addnome.value = user.nome;
  addemail.value = user.email;

  updateBtn.replaceWith(updateBtn.cloneNode(true));
  updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetchUpdate(user);
  });
}

async function fetchDelete(user) {
  fetch("https://bonzitech-tcc.onrender.com/api/usuarios/" + user.codUsuario, {
    method: "DELETE",
    headers: {
      "Content-type": "Application/JSON",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.error != null) {
        alert(res.error);
        return;
      }

      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

async function fetchUpdate(user) {
  const permissoesInput = document.getElementById("edit-permission");
  const nomeInput = document.getElementById("edit-name");
  const emailInput = document.getElementById("edit-email");
  const senhaInput = document.getElementById("edit-password");

  fetch("https://bonzitech-tcc.onrender.com/api/usuarios/", {
    method: "PUT",
    headers: {
      "Content-type": "Application/JSON",
    },
    body: JSON.stringify({
      codUsuario: user.codUsuario,
      permissoes: permissoesInput.value.trim(),
      nome: nomeInput.value.trim(),
      email: emailInput.value.trim(),
      senha: senhaInput.value.trim(),
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.error) {
        alert(res.error);
        return;
      }

      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

profileBtn.addEventListener("click", () => {
  if (profileMenu.style.display === "block") {
  } else {
    profileMenu.style.display = "block";
  }
});

document.addEventListener("click", (event) => {
  if (!profileMenu.contains(event.target) && event.target !== profileBtn) {
    profileMenu.style.display = "none";
  }
});