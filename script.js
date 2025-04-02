const candidatos = [
    { nome: "Maria", imagem: "https://i.imgur.com/0y8Ftya.png" },
    { nome: "João", imagem: "https://i.imgur.com/kLZRM5C.png" },
    { nome: "Ana", imagem: "https://i.imgur.com/JkFfU1B.png" }
];

let votos = JSON.parse(localStorage.getItem('votos')) || {};
let votaçãoEncerrada = false;
const voteSound = document.getElementById("voteSound");
const music = document.getElementById("victoryMusic");
const listaCandidatos = document.getElementById("listaCandidatos");
const vencedorDiv = document.getElementById("vencedor");

// Inicializa votos caso seja o primeiro acesso
candidatos.forEach(cand => {
    if (!(cand.nome in votos)) votos[cand.nome] = 0;
    
    const div = document.createElement("div");
    div.className = "candidato";
    div.innerHTML = `
        <input type="radio" name="candidato" value="${cand.nome}" id="${cand.nome}">
        <label for="${cand.nome}">
            <img src="${cand.imagem}" alt="${cand.nome}">
            ${cand.nome}
        </label>
    `;
    listaCandidatos.appendChild(div);
});

function confirmVote() {
    if (votaçãoEncerrada) {
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
    let vencedor = Object.keys(votos).reduce((a, b) => votos[a] > votos[b] ? a : b);
    let max = votos[vencedor];

    if (max === 0) {
        alert("Nenhum voto registrado ainda.");
        return;
    }

    localStorage.setItem('vencedor', vencedor);
    window.location.href = "resultado.html"; // Redireciona para a página de resultado
}

function endVote() {
    if (votaçãoEncerrada) {
        alert('A votação já foi encerrada.');
        return;
    }
    
    votaçãoEncerrada = true;
    alert('A votação foi encerrada. O resultado será mostrado em breve.');
    document.querySelectorAll("input[type='radio']").forEach(input => input.disabled = true);
    document.querySelector("button[onclick='confirmVote()']").disabled = true;
}

function startCelebration() {
    const fireworks = document.getElementById('fireworks');
    fireworks.innerHTML = "";

    for (let i = 0; i < 20; i++) {
        const emoji = document.createElement("div");
        emoji.className = "emoji";
        emoji.style.left = Math.random() * 100 + "vw";
        emoji.style.top = "-50px";
        emoji.textContent = ["🎉", "🎊", "👏", "🎈", "🥳"][Math.floor(Math.random() * 5)];
        emoji.style.fontSize = `${20 + Math.random() * 30}px`;
        emoji.style.animationDuration = `${2 + Math.random() * 3}s`;
        fireworks.appendChild(emoji);
    }

    music.currentTime = 0;
    music.play().catch(() => {});

    setTimeout(() => {
        fireworks.innerHTML = "";
        music.pause();
    }, 6000);
}

function resetVote() {
    localStorage.removeItem('votos');
    localStorage.removeItem('vencedor');
    location.reload();
}
