document.addEventListener("DOMContentLoaded", () => {
    const votos = JSON.parse(localStorage.getItem('votos'));
    const vencedorDiv = document.getElementById("vencedor");
    const imagemVencedorDiv = document.getElementById("imagemVencedor");

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
                backgroundColor: ['#FF5733', '#3498DB', '#2ECC71'], // Cores vibrantes
                borderColor: '#111111', 
                borderWidth: 2,
                borderRadius: 5, // Cantos arredondados nas barras
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }, // Remove legenda redundante
                tooltip: { enabled: true } // Mantém os tooltips ativos
            },
            scales: {
                x: {
                    ticks: { color: '#333', font: { size: 14 } }, // Personaliza rótulos do eixo X
                },
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1, color: '#333', font: { size: 14 } },
                    grid: { color: "rgba(0, 0, 0, 0.1)" } // Suaviza as linhas do gráfico
                }
            },
            animation: {
                duration: 1000, // Animação mais fluida
                easing: 'easeInOutQuad'
            }
        }
    });
}

const votos = JSON.parse(localStorage.getItem('votos')) || {};
const votantes = JSON.parse(localStorage.getItem('votantes')) || [];
document.getElementById("listaVotantes").innerHTML = votantes.map(nome => `<li>${nome} ✔️</li>`).join("");
