const candidatos = [
    { nome: "Maria", imagem: "https://i.imgur.com/0y8Ftya.png" },
    { nome: "João", imagem: "https://i.imgur.com/kLZRM5C.png" },
    { nome: "Ana", imagem: "https://i.imgur.com/JkFfU1B.png" }
];

let votos = JSON.parse(localStorage.getItem('votos')) || {};
let votacaoEncerrada = JSON.parse(localStorage.getItem('votacaoEncerrada')) || false;
const voteSound = document.getElementById("voteSound");
const music = document.getElementById("victoryMusic");
const listaCandidatos = document.getElementById("listaCandidatos");

// Inicializa os votos caso seja o primeiro acesso
candidatos.forEach(cand => {
    if (!(cand.nome in votos)) votos[cand.nome] = 0;
    
    const div = document.createElement("div");
    div.className = "candidato";
    div.innerHTML = `
        <input type="radio" name="candidato" value="${cand.nome}" id="${cand.nome}" ${votacaoEncerrada ? "disabled" : ""}>
        <label for="${cand.nome}">
            <img src="${cand.imagem}" alt="${cand.nome}">
            ${cand.nome}
        </label>
    `;
    listaCandidatos.appendChild(div);
});

document.querySelector("button[onclick='confirmVote()']").disabled = votacaoEncerrada;

function confirmVote() {
    if (votacaoEncerrada) {
        alert('A votação foi encerrada, não é possível votar mais.');
        return;
    }
    
    const selected = document.querySelector('input[name="candidato"]:checked');
    if (selected) {
        let confirmation = confirm(`Tem certeza que deseja votar em ${selected.value}?`);
        if (confirmation) {
            votos[selected.value]++;
            localStorage.setItem('votos', JSON.stringify(votos));
            voteSound.currentTime = 0;
            voteSound.play().catch(e => console.log("Erro ao tocar áudio:", e));
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
    if (votacaoEncerrada) {
        alert('A votação já foi encerrada.');
        return;
    }
    
    votacaoEncerrada = true;
    localStorage.setItem('votacaoEncerrada', JSON.stringify(true));
    alert('A votação foi encerrada. O resultado será mostrado em breve.');
    document.querySelectorAll("input[type='radio']").forEach(input => input.disabled = true);
    document.querySelector("button[onclick='confirmVote()']").disabled = true;
}

function resetVote() {
    localStorage.removeItem('votos');
    localStorage.removeItem('votacaoEncerrada');
    localStorage.removeItem('vencedor');
    location.reload();
}
