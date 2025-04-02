const chapas = [
    { nome: "Chapa 1", representante: "Maria", vice: "Carlos", imagemRep: "maria.png", imagemVice: "carlos.png" },
    { nome: "Chapa 2", representante: "João", vice: "Ana", imagemRep: "joao.png", imagemVice: "ana.png" },
    { nome: "Chapa 3", representante: "Pedro", vice: "Julia", imagemRep: "pedro.png", imagemVice: "julia.png" }
];

// Carregar votos do localStorage
let votos = JSON.parse(localStorage.getItem('votos')) || {};
let votacaoEncerrada = JSON.parse(localStorage.getItem('votacaoEncerrada')) || false;

const listaCandidatos = document.getElementById("listaCandidatos");
const body = document.body;

// Caminho correto para os áudios hospedados no GitHub Pages
const voteSound = new Audio("https://danielsalinass.github.io/votacao_emiam/urna.mp3");
const errorSound = new Audio("https://danielsalinass.github.io/votacao_emiam/error.mp3");
const winnerSound = new Audio("https://danielsalinass.github.io/votacao_emiam/winner.mp3");

// Gerar lista de chapas dinamicamente
chapas.forEach(chapa => {
    if (!(chapa.nome in votos)) votos[chapa.nome] = 0;

    const div = document.createElement("div");
    div.className = "candidato";
    div.innerHTML = `
        <input type="radio" name="chapa" value="${chapa.nome}" id="${chapa.nome}" ${votacaoEncerrada ? "disabled" : ""}>
        <label for="${chapa.nome}">
            <div class="chapa-container">
                <div class="chapa-info">
                    <img src="${chapa.imagemRep}" alt="${chapa.representante}">
                    <p>${chapa.representante} (Representante)</p>
                </div>
                <div class="chapa-info">
                    <img src="${chapa.imagemVice}" alt="${chapa.vice}">
                    <p>${chapa.vice} (Vice)</p>
                </div>
            </div>
            <p><strong>${chapa.nome}</strong></p>
            <p class="contador-votos">Votos: <span id="contagem-${chapa.nome}">${votos[chapa.nome]}</span></p>
        </label>
    `;
    listaCandidatos.appendChild(div);
});

function confirmVote() {
    if (votacaoEncerrada) {
        alert('A votação foi encerrada.');
        return;
    }

    const selected = document.querySelector('input[name="chapa"]:checked');
    if (selected) {
        let confirmation = confirm(`Tem certeza que deseja votar na ${selected.value}?`);
        if (confirmation) {
            votos[selected.value]++;
            localStorage.setItem('votos', JSON.stringify(votos));
            document.getElementById(`contagem-${selected.value}`).innerText = votos[selected.value];

            // Efeito visual no contador de votos
            const contador = document.getElementById(`contagem-${selected.value}`);
            contador.style.transform = "scale(1.2)";
            setTimeout(() => {
                contador.style.transform = "scale(1)";
            }, 500);

            // **Tocar o som da urna eletrônica**
            voteSound.currentTime = 0;  // Reinicia o som caso já tenha sido tocado antes
            voteSound.play();

            alert(`✅ Voto confirmado para ${selected.value}!`);

            // **Remover seleção após votar**
            setTimeout(() => {
                selected.checked = false;
            }, 200);
        }
    } else {
        errorSound.play();
        alert('⚠️ Selecione uma chapa antes de votar.');
    }
}

function showWinner() {
    let maxVotos = Math.max(...Object.values(votos));
    let vencedores = Object.keys(votos).filter(chapa => votos[chapa] === maxVotos);
    localStorage.setItem('vencedor', JSON.stringify(vencedores));

    // **Tocar som ao exibir vencedor**
    winnerSound.play();

    window.location.href = "resultado.html";
}

function endVote() {
    votacaoEncerrada = true;
    localStorage.setItem('votacaoEncerrada', JSON.stringify(votacaoEncerrada));
    alert('🔒 A votação foi encerrada.');

    // **Ativar modo escuro ao encerrar a votação**
    body.style.background = "black";
    body.style.color = "cyan";
}

function resetVote() {
    localStorage.clear();
    location.reload();
}
