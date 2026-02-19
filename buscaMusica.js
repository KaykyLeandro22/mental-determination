function carregarMusica() {
    const input = document.getElementById('inputMusica');
    const player = document.getElementById('player');

    if (input.files && input.files[0]) {
        const arquivo = input.files[0];
        const urlMusica = URL.createObjectURL(arquivo);
        player.src = urlMusica;
        player.play(); 
        console.log("Música carregada: " + arquivo.name);
    } else {
        alert("Por favor, selecione um arquivo de áudio primeiro.");
    }
}