document.addEventListener("DOMContentLoaded", function () {

    let nomeSalvo = localStorage.getItem("nomeUsuario");

    if (!nomeSalvo || nomeSalvo.trim() === "") {
        let nome = prompt("Digite seu nome para começar:");

        if (!nome || nome.trim() === "") {
            nome = "Usuário";
        }

        localStorage.setItem("nomeUsuario", nome);
        nomeSalvo = nome;
    }

    atualizarSaudacao(nomeSalvo);
});

function atualizarSaudacao(nome) {
    const titulo = document.querySelector(".container h2");
    titulo.textContent = `Bem-vindo(a) de volta, ${nome}!`;
}

async function trocarNome() {

  const nomeAtual = localStorage.getItem("nomeUsuario") || "";

  let novoNome = await promptEstilizado("Digite seu novo nome:", nomeAtual);

  if (!novoNome) return;

  localStorage.setItem("nomeUsuario", novoNome);
  atualizarSaudacao(novoNome);
}

function mostrarQuantidade() {

    let totalPontos = memorias.length;
    let nivel = Math.floor(totalPontos / 10) + 1;
    let progresso = totalPontos % 10;

    let html = `
        <h2>Seus Pontos</h2>
        <p>Total: ${totalPontos}</p>
        <h3>LVL ${nivel}</h3>

        <div class="barra-container">
            <div class="barra-progresso" style="width:${progresso}%"></div>
        </div>

        <p>${progresso} / 10 para o próximo nível</p>
    `;

    abrirModalConteudo(html);
}


function mostrarPerfil() {

    const fotoSalva = localStorage.getItem("fotoPerfil") || "";

    let html = `
        <h2>Perfil</h2>

        <img id="fotoPreview" 
             src="${fotoSalva}" 
             style="width:120px;height:120px;border-radius:50%;border:3px solid #e6ff00;object-fit:cover;box-shadow:0 0 15px #e6ff00;margin-bottom:15px;">

        <br>
        <input type="file" id="inputFotoModal" accept="image/*">
    `;

    abrirModalConteudo(html);

    setTimeout(() => {
        document.getElementById("inputFotoModal").addEventListener("change", function () {

            const file = this.files[0];
            if (!file) return;

            const reader = new FileReader();

            reader.onload = function (e) {
                localStorage.setItem("fotoPerfil", e.target.result);

                document.getElementById("fotoPreview").src = e.target.result;

                const fotoTopo = document.getElementById("fotoPerfil");
                if (fotoTopo) {
                    fotoTopo.src = e.target.result;
                }
            };

            reader.readAsDataURL(file);
        });
    }, 100);
}


function sair() {

    const confirmar = confirm("Deseja realmente sair?");

    if (confirmar) {
        window.location.href = "about:blank";
    }
}

function promptEstilizado(mensagem, valorInicial = "") {
  return new Promise((resolve) => {

    const overlay = document.getElementById("modalOverlay");
    const mensagemEl = document.getElementById("modalMensagem");
    const input = document.getElementById("modalInput");
    const btnCancelar = document.getElementById("modalCancelar");
    const btnConfirmar = document.getElementById("modalConfirmar");

    mensagemEl.textContent = mensagem;
    input.value = valorInicial;

    overlay.classList.remove("hidden");
    input.focus();

    btnCancelar.onclick = () => {
      overlay.classList.add("hidden");
      resolve(null);
    };

    btnConfirmar.onclick = () => {
      overlay.classList.add("hidden");
      resolve(input.value.trim());
    };
  });
}

function atualizarNivel() {

    let totalPontos = memorias.length;

    let nivel = Math.floor(totalPontos / 10) + 1;
    let progressoNivel = totalPontos % 10;
    let porcentagem = progressoNivel;

    const nivelTitulo = document.getElementById("nivelTitulo");
    const barra = document.getElementById("barraProgresso");
    const texto = document.getElementById("textoProgresso");

    if (!barra) return;

    nivelTitulo.textContent = "LVL " + nivel;
    barra.style.width = porcentagem + "%";
    texto.textContent = progressoNivel + " / 10 pontos";
}

atualizarNivel();

function abrirModalConteudo(html) {
    const overlay = document.getElementById("modalConteudoOverlay");
    const conteudo = document.getElementById("modalConteudoInterno");

    conteudo.innerHTML = html;
    overlay.classList.remove("hidden");
}

function fecharModalConteudo() {
    document.getElementById("modalConteudoOverlay").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    const fotoSalva = localStorage.getItem("fotoPerfil");
    
    
    const fotoHeader = document.getElementById("fotoPerfilHeader"); 
    const fotoPreview = document.getElementById("fotoPreview"); 

    if (fotoSalva) {
        if (fotoHeader) fotoHeader.src = fotoSalva;
        if (fotoPreview) fotoPreview.src = fotoSalva;
    }
});