const chapas = [
    { nome: "Chapa 1", representante: "Maria", vice: "Carlos", imagemRep: "maria.png", imagemVice: "carlos.png" },
    { nome: "Chapa 2", representante: "João", vice: "Ana", imagemRep: "joao.png", imagemVice: "ana.png" },
    { nome: "Chapa 3", representante: "Pedro", vice: "Julia", imagemRep: "pedro.png", imagemVice: "julia.png" }
];

let votos = JSON.parse(localStorage.getItem('votos')) || {};
let votacaoEncerrada = JSON.parse(localStorage.getItem('votacaoEncerrada')) || false;

const listaCandidatos = document.getElementById("listaCandidatos");
const voteSound = new Audio("urna.mp3");

// Gerar lista de chapas dinamicamente
chapas.forEach(chapa => {
    if (!(chapa.nome in votos)) votos[chapa.nome] = 0;

    const div = document.createElement("div");
    div.className = "chapa-card";
    div.innerHTML = `
        <div class="chapa-info">
            <img src="${chapa.imagemRep}" alt="${chapa.representante}">
            <p>${chapa.representante} (Representante)</p>
        </div>
        <div class="chapa-info">
            <img src="${chapa.imagemVice}" alt="${chapa.vice}">
            <p>${chapa.vice} (Vice)</p>
        </div>
        <div class="chapa-selecao">
            <input type="radio" name="chapa" value="${chapa.nome}" id="${chapa.nome}" ${votacaoEncerrada ? "disabled" : ""}>
            <label for="${chapa.nome}"><strong>${chapa.nome}</strong></label>
        </div>
    `;
    listaCandidatos.appendChild(div);
});

function confirmVote() {
    if (votacaoEncerrada) {
        alert('⚠️ A votação foi encerrada. Não é possível votar.');
        return;
    }

    const selected = document.querySelector('input[name="chapa"]:checked');
    if (selected) {
        let confirmation = confirm(`Tem certeza que deseja votar na ${selected.value}?`);
        if (confirmation) {
            votos[selected.value]++;
            localStorage.setItem('votos', JSON.stringify(votos));

            voteSound.play();
            alert(`✅ Voto confirmado para ${selected.value}!`);

            setTimeout(() => {
                selected.checked = false;
            }, 200);
        }
    } else {
        alert('⚠️ Selecione uma chapa antes de votar.');
    }
}

function endVote() {
    votacaoEncerrada = true;
    localStorage.setItem('votacaoEncerrada', JSON.stringify(true));
    alert("🔒 A votação foi encerrada! Nenhum novo voto será aceito.");
}

function resetVote() {
    localStorage.clear();
    alert("🔄 A votação foi reiniciada!");
    location.reload();
}
