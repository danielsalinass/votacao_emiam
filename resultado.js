document.addEventListener("DOMContentLoaded", () => {
    const vencedor = JSON.parse(localStorage.getItem('vencedor'));
    const votos = JSON.parse(localStorage.getItem('votos'));
    const vencedorDiv = document.getElementById("vencedor");

    if (vencedor && vencedor.length > 0) {
        vencedorDiv.innerHTML = `
            <h2>🎉 O vencedor ${vencedor.length > 1 ? "foram" : "foi"} ${vencedor.join(" e ")}!</h2>
        `;
        startFireworks();
        renderChart(votos);
    } else {
        vencedorDiv.innerHTML = `<p>A votação ainda não foi encerrada.</p>`;
    }
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
    const fireworks = document.getElementById('fireworks');
    fireworks.innerHTML = "🔥✨💥";
}
