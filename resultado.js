document.addEventListener("DOMContentLoaded", () => {
    const votos = JSON.parse(localStorage.getItem('votos')) || {};
    const votantes = JSON.parse(localStorage.getItem('votantes')) || [];
    const vencedorDiv = document.getElementById("vencedor");
    const imagemVencedorDiv = document.getElementById("imagemVencedor");
    const listaVotantesTabela = document.getElementById("listaVotantes");

    // Dados das chapas com imagens
    const chapas = [
        { nome: "Chapa 1", imagem: "chapa1.png" },
        { nome: "Chapa 2", imagem: "chapa2.png" },
        { nome: "Chapa 3", imagem: "chapa3.png" }
    ];

    // Verifica se existem votos armazenados
    if (!votos || Object.values(votos).every(v => v === 0)) {
        vencedorDiv.innerHTML = "<h2>❌ Nenhum voto registrado.</h2>";
        imagemVencedorDiv.innerHTML = "";
        return;
    }

    // Determinar o(s) vencedor(es)
    const maxVotos = Math.max(...Object.values(votos));
    const vencedores = Object.keys(votos).filter(chapa => votos[chapa] === maxVotos);

    // Exibir resultado formatado corretamente com concordância
    if (vencedores.length === 1) {
        vencedorDiv.innerHTML = `<h2>🎉 A chapa vencedora é <strong>${vencedores[0]}</strong> com ${maxVotos} ${maxVotos === 1 ? "voto" : "votos"}!</h2>`;
    } else {
        vencedorDiv.innerHTML = `<h2>⚖️ Houve um empate entre as chapas <strong>${vencedores.join(" e ")}</strong> com ${maxVotos} ${maxVotos === 1 ? "voto" : "votos"} cada.</h2>`;
    }

    // Exibir imagens das chapas vencedoras
    imagemVencedorDiv.innerHTML = "";
    vencedores.forEach(chapaNome => {
        const chapa = chapas.find(c => c.nome === chapaNome);
        if (chapa) {
            const img = document.createElement("img");
            img.src = chapa.imagem;
            img.alt = `Imagem da ${chapaNome}`;
            img.classList.add("imagem-vencedor");
            imagemVencedorDiv.appendChild(img);
        }
    });

    // Exibir gráfico
    renderChart(votos);

    // Exibir tabela de votantes
    listaVotantesTabela.innerHTML = `
        <table class="tabela-votantes">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${votantes.map(nome => `
                    <tr>
                        <td>${nome}</td>
                        <td>✔️</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
});

function renderChart(votos) {
    const ctx = document.getElementById('graficoVotos').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(votos),
            datasets: [{
                label: 'Quantidade de Votos',
                data: Object.values(votos),
                backgroundColor: ['#FF5733', '#3498DB', '#2ECC71'], // 
                borderColor: '#111111',
                borderWidth: 2,
                borderRadius: 5, // 
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }, // 
                tooltip: { enabled: true } // 
            },
            scales: {
                x: {
                    ticks: { color: '#333', font: { size: 14 } }, 
                },
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1, color: '#333', font: { size: 14 } },
                    grid: { color: "rgba(0, 0, 0, 0.1)" } 
                }
            },
            animation: {
                duration: 1000, 
                easing: 'easeInOutQuad'
            }
        }
    });
}
