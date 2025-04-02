document.addEventListener("DOMContentLoaded", () => {
    const votos = JSON.parse(localStorage.getItem('votos')) || {};
    const vencedores = JSON.parse(localStorage.getItem('vencedor')) || [];
    const resultadoDiv = document.getElementById("resultado");

    if (vencedores.length > 0) {
        resultadoDiv.innerHTML = `<h2>🎉 Vencedores: ${vencedores.join(", ")}</h2>`;
        startFireworks();
        renderChart(votos);
    } else {
        resultadoDiv.innerHTML = "<h2>❌ Nenhum vencedor definido.</h2>";
    }

    let votosHTML = "<h3>📊 Total de votos:</h3><ul>";
    for (let chapa in votos) {
        votosHTML += `<li><strong>${chapa}:</strong> ${votos[chapa]} votos</li>`;
    }
    votosHTML += "</ul>";
    resultadoDiv.innerHTML += votosHTML;
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
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
                borderColor: '#ffffff',
                borderWidth: 1
            }]
        },
        options: { responsive: true }
    });
}

function startFireworks() {
    document.body.innerHTML += `<div class="fireworks">🎆🎇✨</div>`;
}
