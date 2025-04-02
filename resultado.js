document.addEventListener("DOMContentLoaded", () => {
    const votos = JSON.parse(localStorage.getItem('votos'));
    const vencedorDiv = document.getElementById("vencedor");

    // Verifica se existem votos armazenados
    if (!votos || Object.values(votos).every(v => v === 0)) {
        vencedorDiv.innerHTML = "<h2>❌ Nenhum voto registrado.</h2>";
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
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
                borderColor: '#ffffff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    stepSize: 1
                }
            }
        }
    });
}
