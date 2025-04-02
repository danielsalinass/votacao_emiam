const votos = JSON.parse(localStorage.getItem('votos')) || {};
const votantes = JSON.parse(localStorage.getItem('votantes')) || [];
const votacaoEncerrada = JSON.parse(localStorage.getItem('votacaoEncerrada')) || false;

const chapas = [
    { nome: "Chapa 1", representante: "Maria", vice: "Carlos" },
    { nome: "Chapa 2", representante: "João", vice: "Ana" },
    { nome: "Chapa 3", representante: "Pedro", vice: "Julia" }
];

// Gerar lista de chapas
const listaCandidatos = document.getElementById("listaCandidatos");
chapas.forEach(chapa => {
    if (!(chapa.nome in votos)) votos[chapa.nome] = 0;

    const div = document.createElement("div");
    div.className = "chapa-card";
    div.innerHTML = `
        <strong>${chapa.nome}</strong>
        <p>${chapa.representante} (Representante)</p>
        <p>${chapa.vice} (Vice)</p>
        <input type="radio" name="chapa" value="${chapa.nome}">
    `;
    listaCandidatos.appendChild(div);
});

function confirmVote() {
    if (votacaoEncerrada) {
        Swal.fire('⚠️ A votação foi encerrada.', '', 'warning');
        return;
    }

    const nomeEleitor = document.getElementById("voterName").value.trim();
    if (!nomeEleitor) {
        Swal.fire('⚠️ Insira seu nome antes de votar.', '', 'warning');
        return;
    }

    if (votantes.includes(nomeEleitor)) {
        Swal.fire('⚠️ Você já votou!', '', 'error');
        return;
    }

    const selected = document.querySelector('input[name="chapa"]:checked');
    if (selected) {
        votos[selected.value]++;
        votantes.push(nomeEleitor);

        localStorage.setItem('votos', JSON.stringify(votos));
        localStorage.setItem('votantes', JSON.stringify(votantes));

        Swal.fire('✅ Voto confirmado!', '', 'success');
    } else {
        Swal.fire('⚠️ Selecione uma chapa antes de votar.', '', 'warning');
    }
}

function verificarSenha(acao) {
    Swal.fire({
        title: '🔒 Acesso Restrito',
        input: 'password',
        inputAttributes: { autocapitalize: 'off' },
        showCancelButton: true,
        confirmButtonText: 'Acessar'
    }).then((result) => {
        if (result.value === "1234") {
            if (acao === "resultado") {
                window.location.href = "resultado.html";
            } else if (acao === "encerrar") {
                votacaoEncerrada = true;
                localStorage.setItem('votacaoEncerrada', JSON.stringify(true));
            } else if (acao === "reiniciar") {
                localStorage.clear();
                location.reload();
            }
        } else {
            Swal.fire('❌ Senha incorreta!', '', 'error');
        }
    });
}
