const candidatos = [
    { nome: "Maria", imagem: "https://i.imgur.com/0y8Ftya.png" },
    { nome: "João", imagem: "https://i.imgur.com/kLZRM5C.png" },
    { nome: "Ana", imagem: "https://i.imgur.com/JkFfU1B.png" }
];

let votos = JSON.parse(localStorage.getItem('votos')) || {};
let votaçãoEncerrada = JSON.parse(localStorage.getItem('votacaoEncerrada')) || false;
const voteSound = document.getElementById("voteSound");
const listaCandidatos = document.getElementById("listaCandidatos");

// Inicializa votos
candidatos.forEach(cand => {
    if (!(cand.nome in votos)) votos[cand.nome] = 0;

    const div = document.createElement("div");
    div.className = "candidato";
    div.innerHTML = `
        <input type="radio" name="candidato" value="${cand.nome}" id="${cand.nome}" ${votaçãoEncerrada ? "disabled" : ""}>
        <label for="${cand.nome}">
            <img src="${cand.imagem}" alt="${cand.nome}">
            ${cand.nome}
        </label>
    `;
    listaCandidatos.appendChild(div);
});

function confirmVote() {
    if (votaçãoEncerrada) {
        alert('A votação foi encerrada.');
        return;
    }

    const selected = document.querySelector('input[name="candidato"]:checked');
    if (selected) {
        if (confirm(`Tem certeza que deseja votar em ${selected.value}?`)) {
            votos[selected.value]++;
            localStorage.setItem('votos', JSON.stringify(votos));

            voteSound.currentTime = 0;
            voteSound.play().catch(() => {});

            alert(`✅ Voto confirmado para ${selected.value}!`);
        }
    } else {
        alert('Por favor, selecione um candidato antes de votar.');
    }
}

function showWinner() {
    if (Object.values(votos).every(v => v === 0)) {
        alert("Nenhum voto registrado ainda.");
        return;
    }

    let maxVotos = Math.max(...Object.values(votos));
    let vencedores = Object.keys(votos).filter(candidato => votos[candidato] === maxVotos);

    localStorage.setItem('vencedor', JSON.stringify(vencedores));
    localStorage.setItem('votos', JSON.stringify(votos));

    window.location.href = "resultado.html";
}

function endVote() {
    votaçãoEncerrada = true;
    localStorage.setItem('votacaoEncerrada', JSON.stringify(votaçãoEncerrada));
    alert('🔒 A votação foi encerrada.');
}

function resetVote() {
    localStorage.clear();
    location.reload();
}
