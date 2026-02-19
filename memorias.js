document.addEventListener("DOMContentLoaded", () => {
      const input = document.getElementById ("textoPonto");
      const botao = document.getElementById ("botao-salvar");
      const display = document.getElementById ("pontoSalvo");
      
      botao.addEventListener ('click', () => {
        const texto = input.value;

        if (texto.trim() === "") {
          console.warn ("input vazio");
          return;
        }
        localStorage.setItem("determination", texto);
        display.textContent = texto;

        console.log("Salvo no LocalStorage", texto);

      });
      const savedText = localStorage.getItem("determination");
      if (savedText) {
        display.textContent = savedText;
         document.getElementById("meuFormulario").style.display = "block";
         if (savedText) {
  display.textContent = savedText;
  input.value = savedText;
}
}
    });

    memorias.forEach((memoria, index) => {

    const div = document.createElement("div");
    div.classList.add("memoria-retro");

    div.innerHTML = `
        <div>
            <h4>${memoria.titulo}</h4>
            <span>${memoria.data}</span>
        </div>

        <div>
            <button onclick="verMemoria(${index})">Ver</button>
            <button onclick="excluirMemoria(${index})" class="btn-excluir">Excluir</button>
        </div>
    `;

    lista.appendChild(div);
});

function excluirMemoria(index) {

    let memorias = JSON.parse(localStorage.getItem("memorias")) || [];

    const confirmar = confirm("Tem certeza que deseja excluir esta memória?");

    if (!confirmar) return;

    memorias.splice(index, 1);

    localStorage.setItem("memorias", JSON.stringify(memorias));

    atualizarListaMemorias(); // ou sua função que recarrega a lista
}
