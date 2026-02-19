// global //

let memorias = JSON.parse(localStorage.getItem("memorias")) || [];
let musicasSalvas = JSON.parse(localStorage.getItem("musicas")) || [];

// DOM //

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("botao-salvar")
        .addEventListener("click", salvarMemoria);

    mostrarUltimoPonto();
    mostrarMemorias();
    renderizarMusicas();
});

// formulário //

function toggleFormulario() {
    const form = document.getElementById("meuFormulario");

    form.style.display =
        (form.style.display === "block") ? "none" : "block";
}

// memória //

function salvarMemoria() {

    const titulo = document.getElementById("tituloPonto").value;
    const texto  = document.getElementById("textoPonto").value;
    const data   = new Date().toLocaleDateString();

    if (titulo.trim() === "" || texto.trim() === "") {
        alert("Preencha todos os campos.");
        return;
    }

    const novaMemoria = {
        titulo,
        texto,
        data,
        emocao: emocaoSelecionada
    };

    memorias.push(novaMemoria);
    localStorage.setItem("memorias", JSON.stringify(memorias));

    document.getElementById("tituloPonto").value = "";
    document.getElementById("textoPonto").value  = "";

    mostrarUltimoPonto();
    mostrarMemorias();
}


function mostrarUltimoPonto() {

    const ladoEsquerdo = document.getElementById("lado-esquerdo");

    if (memorias.length === 0) {
        ladoEsquerdo.innerHTML = `
            <h3>Último Ponto Salvo</h3>
            <p>Nenhum ponto salvo ainda.</p>
        `;
        return;
    }

    const indice = memorias.length - 1;
    const ultimo = memorias[indice];
    const cor    = obterCorEmocao(ultimo.emocao);

    ladoEsquerdo.innerHTML = `
        <h3>Último Ponto Salvo</h3>
        <div class="memoria-retro" style="border-left: 6px solid ${cor};">
            <div>
                <h4>${ultimo.titulo}</h4>
                <span>${ultimo.data}</span>
            </div>
            <div>
                <button onclick="verMemoria(${indice})">Ver</button>
                <button onclick="excluirMemoria(${indice})" class="btn-excluir">Excluir</button>
            </div>
        </div>
        <button class="btn-ver-todas" onclick="verTodasMemorias()">
            Ver Memórias
        </button>
    `;
}

function mostrarMemorias() {

    const ladoDireito = document.getElementById("lado-direito");
    ladoDireito.innerHTML = "<h3>Meus Pontos de Determinação</h3>";

    memorias
        .slice(-3)
        .reverse()
        .forEach((memoria, index) => {

            const indiceReal = memorias.length - 1 - index;
            const cor        = obterCorEmocao(memoria.emocao);

            ladoDireito.innerHTML += `
                <div class="memoria-retro" style="border-left: 6px solid ${cor};">
                    <div>
                        <h4>${memoria.titulo}</h4>
                        <span>${memoria.data}</span>
                    </div>
                    <div>
                        <button onclick="verMemoria(${indiceReal})">Ver</button>
                        <button onclick="excluirMemoria(${indiceReal})" class="btn-excluir">Excluir</button>
                    </div>
                </div>
            `;
        });
}

// modais //

function verMemoria(indice) {

    const memoria = memorias[indice];

    document.getElementById("modalTitulo").textContent = memoria.titulo;
    document.getElementById("modalData").textContent   = memoria.data;
    document.getElementById("modalTexto").textContent  = memoria.texto;
    document.getElementById("modalMemoria").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalMemoria").style.display = "none";
}

function verTodasMemorias() {

    const modal = document.getElementById("modal-memorias");
    const lista = document.getElementById("lista-memorias-modal");
    lista.innerHTML = "";
    memorias
        .slice()
        .reverse()
        .forEach((memoria, index) => {
            const indiceReal = memorias.length - 1 - index;
            const cor        = obterCorEmocao(memoria.emocao);
            lista.innerHTML += `
                <div class="memoria-retro">
                    <div>
                        <h4>${memoria.titulo}</h4>
                        <span>${memoria.data}</span>
                    </div>
                    <div>
                        <button onclick="verMemoria(${indiceReal})">Ver</button>
                        <button onclick="excluirMemoria(${indiceReal})" class="btn-excluir">Excluir</button>
                    </div>
                </div>
            `;
        });

    modal.style.display = "flex";
}

function fecharModalMemorias() {
    document.getElementById("modal-memorias").style.display = "none";
}

// para excluir a memória //

function excluirMemoria(indice) {

    const confirmar = confirm("Tem certeza que deseja excluir esta memória?");
    if (!confirmar) return;
    memorias.splice(indice, 1);
    localStorage.setItem("memorias", JSON.stringify(memorias));

    mostrarUltimoPonto();
    mostrarMemorias();
    fecharModal();
    fecharModalMemorias();
}

// service worker no navegador //

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("./sw.js")
        .then(() => console.log("Service Worker registrado"))
        .catch(err => console.log("Erro no SW:", err));
}

// emotion tracker //

let emocaoSelecionada = "felicidade";

document
    .querySelectorAll(".emotion")
    .forEach(bolinha => {
        bolinha.addEventListener("click", function () {
            document
                .querySelectorAll(".emotion")
                .forEach(e => e.classList.remove("selected"));
            this.classList.add("selected");
            emocaoSelecionada = this.dataset.emotion;
        });
    });

function obterCorEmocao(emocao) {

    switch (emocao) {
        case "raiva":      return "#ff2e2e";
        case "tristeza":   return "#2e6bff";
        case "felicidade": return "#e6ff00";
        case "nojo":       return "#00ff88";
        case "medo":       return "#a64dff";
        case "nao-sei":    return "#777";
        default:           return "#e6ff00";
    }
}
