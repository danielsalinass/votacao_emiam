const candidatos = [
    { nome: "Maria", imagem: "https://i.imgur.com/0y8Ftya.png" },
    { nome: "João", imagem: "https://i.imgur.com/kLZRM5C.png" },
    { nome: "Ana", imagem: "https://i.imgur.com/JkFfU1B.png" }
];

let votos = {};
const voteSound = document.getElementById("voteSound");
const music = document.getElementById("victoryMusic");
const listaCandidatos = document.getElementById("listaCandidatos");
const vencedorDiv = document.getElementById("vencedor");

candidatos.forEach((cand, index) => {
    votos[cand.nome] = 0;

    const div = document.createElement("div");
    div.className = "candidato";
    div.innerHTML = `
        <input type="radio" name="candidato" value="${cand.nome}" id="cand${index}">
        <label for="cand${index}">
            <img src="${cand.imagem}" alt="${cand.nome}">
            ${cand.nome}
        </label>
    `;
    listaCandidatos.appendChild(div);
});

function confirmVote() {
    const selected = document.querySelector('input[name="candidato"]:checked');
    if (selected) {
        let confirmation = confirm('Tem certeza que deseja votar em ' + selected.value + '?');
        if (confirmation) {
            votos[selected.value]++;
            voteSound.currentTime = 0;
            voteSound.play().catch(e => console.log("Erro ao tocar áudio:", e));
            alert('✅ Voto confirmado para ' + selected.value + '!');
        }
    } else {
        alert('Por favor, selecione um candidato antes de votar.');
    }
}

function showWinner() {
    let max = 0;
    let vencedor = "";
    let vencedorImg = "";
    const listaResultados = document.getElementById("listaResultados");
    listaResultados.innerHTML = "";

    for (let nome in votos) {
        if (votos[nome] > max) {
            max = votos[nome];
            vencedor = nome;
        }
    }

    candidatos.forEach(c => {
        if (c.nome === vencedor) {
            vencedorImg = c.imagem;
        }
    });

    for (let nome in votos) {
        const li = document.createElement("li");
        li.innerHTML = `${nome}: <span class="highlight">${votos[nome]}</span> voto(s)`;
        listaResultados.appendChild(li);
    }

    document.getElementById("resultados").style.display = "block";

    if (max > 0) {
        vencedorDiv.style.display = "block";
        vencedorDiv.innerHTML = `
            <img src="${vencedorImg}" alt="${vencedor}">
            <h2>🎉 Parabéns, ${vencedor}!</h2>
            <p>Você foi eleito(a) com <strong>${max}</strong> voto(s)!</p>
        `;
        startCelebration();
    } else {
        alert("Nenhum voto registrado ainda.");
    }
}

function startCelebration() {
    const fireworks = document.getElementById('fireworks');
    fireworks.innerHTML = "";

    for (let i = 0; i < 30; i++) {
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
